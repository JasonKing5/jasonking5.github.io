import { AnimationStep } from './types';

interface Algorithm {
  key: string;
  name: string;
  category: 'sorting' | 'searching' | 'graph';
  code: string;
  generateSteps: (data: number[]) => AnimationStep[];
}

const bubbleSortCode = `function bubbleSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // 比较相邻元素
      if (arr[j] > arr[j + 1]) {
        // 交换元素
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  
  return arr;
}`;

const generateBubbleSortSteps = (data: number[]): AnimationStep[] => {
  const steps: AnimationStep[] = [];
  const arr = [...data];
  const n = arr.length;

  // 代码行号映射
  const LINE_NUMBERS = {
    FUNCTION_START: 1,
    LENGTH_INIT: 2,
    OUTER_LOOP: 4,
    INNER_LOOP: 5,
    COMPARE: 7,
    SWAP: 9,
    RETURN: 14
  };

  steps.push({
    array: [...arr],
    description: '开始冒泡排序',
    lineNumber: LINE_NUMBERS.FUNCTION_START,
    code: 'function bubbleSort(arr) {',
  });

  steps.push({
    array: [...arr],
    description: '获取数组长度',
    lineNumber: LINE_NUMBERS.LENGTH_INIT,
    code: 'const n = arr.length;',
  });

  for (let i = 0; i < n - 1; i++) {
    steps.push({
      array: [...arr],
      description: `开始第 ${i + 1} 轮排序`,
      lineNumber: LINE_NUMBERS.OUTER_LOOP,
      code: 'for (let i = 0; i < n - 1; i++) {',
      variables: { i }
    });

    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        array: [...arr],
        highlighted: [j, j + 1],
        visited: Array.from({ length: n - i }, (_, idx) => idx),
        variables: { i, j },
        lineNumber: LINE_NUMBERS.COMPARE,
        description: `比较 arr[${j}]=${arr[j]} 和 arr[${j + 1}]=${arr[j + 1]}`,
        code: 'if (arr[j] > arr[j + 1]) {',
      });

      if (arr[j] > arr[j + 1]) {
        const oldValues = [...arr];
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        
        steps.push({
          array: [...arr],
          highlighted: [j, j + 1],
          visited: Array.from({ length: n - i }, (_, idx) => idx),
          variables: { i, j },
          lineNumber: LINE_NUMBERS.SWAP,
          description: `交换 arr[${j}]=${oldValues[j]} 和 arr[${j + 1}]=${oldValues[j + 1]}`,
          code: '[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];',
        });
      }
    }
  }

  steps.push({
    array: [...arr],
    description: '排序完成',
    lineNumber: LINE_NUMBERS.RETURN,
    code: 'return arr;',
    visited: Array.from({ length: arr.length }, (_, i) => i),  // 标记所有元素为已访问
  });

  return steps;
};

export const algorithms: Algorithm[] = [
  {
    key: 'bubbleSort',
    name: '冒泡排序',
    category: 'sorting',
    code: bubbleSortCode,
    generateSteps: generateBubbleSortSteps,
  },
];
