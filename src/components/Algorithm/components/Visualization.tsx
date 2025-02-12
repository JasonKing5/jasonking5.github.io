import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { DataStructureState, AnimationStep } from '../types';

interface VisualizationProps {
  data: DataStructureState;
  currentStep?: AnimationStep;
  isSorted: boolean;
}

const Visualization: React.FC<VisualizationProps> = ({ data, currentStep, isSorted }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [currentData, setCurrentData] = useState<number[]>([]);

  useEffect(() => {
    if (data.type === 'array') {
      setCurrentData(data.data as number[]);
    }
  }, [data]);

  useEffect(() => {
    if (currentStep && currentStep.array) {
      setCurrentData(currentStep.array);
    }
  }, [currentStep]);

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({
          width: Math.max(width - 40, 300),
          height: Math.max(height - 40, 200),
        });
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!svgRef.current || dimensions.width === 0 || !currentData.length) return;

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = dimensions.width - margin.left - margin.right;
    const innerHeight = dimensions.height - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', dimensions.width)
      .attr('height', dimensions.height);
    
    let g = svg.select<SVGGElement>('g');
    if (g.empty()) {
      g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
      
      g.append('g').attr('class', 'x-axis')
        .attr('transform', `translate(0,${innerHeight})`);
      g.append('g').attr('class', 'y-axis');
    } else {
      g.attr('transform', `translate(${margin.left},${margin.top})`);
      g.select('.x-axis').attr('transform', `translate(0,${innerHeight})`);
    }

    visualizeArray(g, currentData, innerWidth, innerHeight);
  }, [dimensions, currentData, currentStep, isSorted]);

  const visualizeArray = (
    g: d3.Selection<SVGGElement, unknown, null, undefined>,
    data: number[],
    width: number,
    height: number
  ) => {
    const maxValue = Math.max(...data);
    const duration = 500; // 动画持续时间
    
    const xScale = d3.scaleBand()
      .domain(data.map((_, i) => i.toString()))
      .range([0, width])
      .padding(data.length > 50 ? 0.1 : data.length > 30 ? 0.2 : 0.3);  // 根据数据量动态调整间距

    const yScale = d3.scaleLinear()
      .domain([0, maxValue])
      .range([height, 0])
      .nice();  // 使刻度更自然

    g.select<SVGGElement>('.x-axis')
      .attr('transform', `translate(0,${height})`)
      .transition()
      .duration(duration)
      .call(d3.axisBottom(xScale));

    g.select<SVGGElement>('.y-axis')
      .transition()
      .duration(duration)
      .call(d3.axisLeft(yScale));

    const bars = g.selectAll<SVGGElement, number>('.bar-group')
      .data(data, (_, i) => i.toString());

    bars.exit()
      .transition()
      .duration(duration)
      .attr('transform', (_, i) => `translate(${xScale(i.toString())},${height})`)
      .remove();

    const barsEnter = bars.enter()
      .append('g')
      .attr('class', 'bar-group')
      .attr('transform', (_, i) => `translate(${xScale(i.toString())},${height})`);

    barsEnter.append('rect')
      .attr('class', 'bar')
      .attr('width', xScale.bandwidth())
      .attr('y', height)
      .attr('height', 0);

    barsEnter.append('text')
      .attr('class', 'bar-value')
      .attr('text-anchor', 'middle')
      .attr('x', xScale.bandwidth() / 2)
      .attr('y', height)
      .attr('dy', '-0.5em')
      .text(d => d);

    const barsUpdate = bars.merge(barsEnter);

    // 检查是否有需要交换的元素
    const hasSwap = currentStep?.highlighted && currentStep.highlighted.length === 2;
    const [i1, i2] = hasSwap ? currentStep.highlighted : [-1, -1];

    // 确定是否需要交换位置（只有当是交换步骤时才交换位置）
    const shouldSwap = hasSwap && currentStep?.swapped;

    // 计算每个元素的目标位置
    const getTargetX = (index: number) => {
      if (!hasSwap) return xScale(index.toString());
      if (!shouldSwap) return xScale(index.toString());
      if (index === i1) return xScale(i2.toString());
      if (index === i2) return xScale(i1.toString());
      return xScale(index.toString());
    };

    // 获取元素的当前位置
    const getCurrentX = (element: d3.Selection<any, any, any, any>) => {
      const transform = element.attr('transform');
      if (!transform) return null;
      const match = transform.match(/translate\(([\d.]+)/);
      return match ? parseFloat(match[1]) : null;
    };

    // 设置所有元素的初始位置
    barsUpdate.each(function(_, i) {
      const element = d3.select(this);
      const currentX = getCurrentX(element);
      if (currentX === null) {
        element.attr('transform', `translate(${xScale(i.toString())},0)`);
      }
    });

    // 更新元素位置
    barsUpdate
      .transition()
      .duration(duration)
      .attr('transform', (_, i) => {
        const targetX = getTargetX(i);
        return `translate(${targetX},0)`;
      });

    // 更新柱子属性
    const barUpdate = barsUpdate.select('.bar')
      .attr('y', d => Math.max(yScale(d), 0))
      .attr('height', d => Math.max(0, height - yScale(d)))
      .attr('fill', (_, i) => {
        if (isSorted) return '#34D399';
        if (i >= data.length - (currentStep?.variables?.i || 0)) return '#34D399';
        if (currentStep?.highlighted?.includes(i)) return '#60A5FA';
        return '#6B7280';
      })
      .attr('class', (_, i) => {
        const isHighlighted = currentStep?.highlighted?.includes(i);
        const isSortedElement = isSorted || i >= data.length - (currentStep?.variables?.i || 0);
        return `bar ${isHighlighted ? 'highlighted' : ''} ${isSortedElement ? 'bar-sorted' : ''}`;
      });

    // 更新数值标签
    barsUpdate.select('.bar-value')
      .attr('y', d => Math.max(yScale(d) - 5, 0))
      .text(d => d);
  };

  return (
    <div 
      ref={containerRef} 
      style={{ width: '100%', height: '100%', padding: '20px' }}
    >
      <svg
        ref={svgRef}
        style={{ width: '100%', height: '100%' }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#6B7280" />
          </marker>
        </defs>
      </svg>
    </div>
  );
};

export default Visualization;
