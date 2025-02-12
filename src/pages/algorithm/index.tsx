import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import CodeEditor from '../../components/Algorithm/components/CodeEditor';
import Visualization from '../../components/Algorithm/components/Visualization';
import AnimationControls from '../../components/Algorithm/components/AnimationControls';
import TestCaseInput from '../../components/Algorithm/components/TestCaseInput';
import type { DataStructureState, AnimationStep, AnimationState } from '../../components/Algorithm/types';
import { algorithms } from '../../components/Algorithm/algorithms';
import './index.css';

const SUPPORTED_LANGUAGES = [
  { key: 'typescript', name: 'TypeScript' },
  { key: 'javascript', name: 'JavaScript' },
  { key: 'python', name: 'Python' },
  { key: 'java', name: 'Java' },
  { key: 'cpp', name: 'C++' },
  { key: 'go', name: 'Go' },
];

export default function AlgorithmVisualizer(): JSX.Element {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(algorithms[0].key);
  const [selectedLanguage, setSelectedLanguage] = useState(SUPPORTED_LANGUAGES[0].key);
  const [code, setCode] = useState(algorithms[0].code);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [steps, setSteps] = useState<AnimationStep[]>([]);
  const [animationState, setAnimationState] = useState<AnimationState>('stopped');
  const [speed, setSpeed] = useState<number>(3);
  const [autoPlayInterval, setAutoPlayInterval] = useState<NodeJS.Timeout | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getInitialData = (algorithmKey: string): DataStructureState => {
    const algorithm = algorithms.find(a => a.key === algorithmKey);
    switch (algorithm?.category) {
      case 'sorting':
        return {
          type: 'array',
          data: [64, 34, 25, 12, 22, 11, 90],
        };
      default:
        return {
          type: 'array',
          data: [64, 34, 25, 12, 22, 11, 90],
        };
    }
  };

  const [dataStructure, setDataStructure] = useState<DataStructureState>(
    getInitialData(selectedAlgorithm)
  );

  const handleAlgorithmSelect = (algorithmKey: string) => {
    const algorithm = algorithms.find(a => a.key === algorithmKey);
    if (algorithm) {
      setSelectedAlgorithm(algorithmKey);
      setCode(algorithm.code);
      setSteps([]);
      setCurrentStep(0);
      setAnimationState('stopped');
      setError(null);
      setDataStructure(getInitialData(algorithmKey));
    }
  };

  const handleExecute = async () => {
    setIsExecuting(true);
    setError(null);
    
    try {
      const algorithm = algorithms.find(a => a.key === selectedAlgorithm);
      if (!algorithm) throw new Error('算法未找到');

      const steps = algorithm.generateSteps(dataStructure.data);
      setSteps(steps);
      setCurrentStep(0);
      setAnimationState('stopped');
    } catch (err) {
      setError(err instanceof Error ? err.message : '执行出错');
    } finally {
      setIsExecuting(false);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnimationState('stopped');
    setSteps([]);
    handleExecute();
  };

  useEffect(() => {
    if (animationState === 'playing' && steps.length > 0) {
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= steps.length - 1) {
            setAnimationState('stopped');
            return prev;
          }
          return prev + 1;
        });
      }, (6 - speed) * 500);
      
      setAutoPlayInterval(interval);
    } else if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      setAutoPlayInterval(null);
    }

    return () => {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
      }
    };
  }, [animationState, speed, steps.length]);

  // 监听数据变化，自动更新可视化
  useEffect(() => {
    handleExecute();
  }, [dataStructure.data]);

  const handlePlay = () => setAnimationState('playing');
  const handlePause = () => setAnimationState('paused');
  const handleStop = () => {
    setAnimationState('stopped');
    setCurrentStep(0);
  };
  const handleStepForward = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  const handleStepBackward = () => setCurrentStep(prev => Math.max(prev - 1, 0));
  const handleSpeedChange = (newSpeed: number) => setSpeed(newSpeed);

  const handleCodeChange = (value: string) => {
    setCode(value || '');
  };

  return (
    <Layout
      title="算法可视化"
      description="通过动画可视化理解算法的执行过程"
    >
      <div className="algorithm-page">
        {/* 左侧菜单 */}
        <div className="algorithm-menu">
          <h2 className="algorithm-menu-title">数据结构和算法</h2>
          <ul className="algorithm-menu-list">
            {algorithms.map(algorithm => (
              <li key={algorithm.key} className="algorithm-menu-item">
                <button
                  onClick={() => handleAlgorithmSelect(algorithm.key)}
                  className={`algorithm-menu-button ${
                    selectedAlgorithm === algorithm.key ? 'active' : ''
                  }`}
                >
                  {algorithm.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* 主要内容区域 */}
        <div className="algorithm-content">
          {/* 代码和控制区域 */}
          <div className="code-control-section">
            {/* 语言选择 */}
            <div className="language-selector">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="language-select"
              >
                {SUPPORTED_LANGUAGES.map(lang => (
                  <option key={lang.key} value={lang.key}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 代码编辑器 */}
            <div className="code-editor-container">
              <CodeEditor
                code={code}
                language={selectedLanguage}
                onChange={handleCodeChange}
                currentStep={currentStep < steps.length ? steps[currentStep] : undefined}
              />
            </div>

            {/* 测试数据输入 */}
            <div className="test-case-input">
              <TestCaseInput
                value={dataStructure}
                onChange={setDataStructure}
              />
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
            
            <div className="animation-control-panel">
              <AnimationControls
                currentStep={currentStep}
                totalSteps={steps.length}
                animationState={animationState}
                speed={speed}
                onPlay={handlePlay}
                onPause={handlePause}
                onStop={handleStop}
                onStepForward={handleStepForward}
                onStepBackward={handleStepBackward}
                onSpeedChange={handleSpeedChange}
                onReset={handleReset}
              />
            </div>
          </div>

          {/* 可视化区域 */}
          <div className="visualization-section">
            <div className="visualization-container">
              <Visualization
                data={dataStructure}
                currentStep={currentStep < steps.length ? steps[currentStep] : undefined}
                isSorted={currentStep === steps.length - 1}
              />
            </div>

            {steps[currentStep] && (
              <div className="step-description">
                <h3 className="font-semibold mb-2">当前步骤</h3>
                <p>{steps[currentStep].description}</p>
                <pre className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded">
                  <code className="text-sm">{steps[currentStep].code}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
