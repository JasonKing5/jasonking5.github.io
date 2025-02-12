import React, { useRef } from 'react';
import { AnimationState } from '../types';

interface AnimationControlsProps {
  currentStep: number;
  totalSteps: number;
  animationState: AnimationState;
  speed: number;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onSpeedChange: (speed: number) => void;
  onReset: () => void;
  onSeek?: (step: number) => void;
}

const AnimationControls: React.FC<AnimationControlsProps> = ({
  currentStep,
  totalSteps,
  animationState,
  speed,
  onPlay,
  onPause,
  onStop,
  onStepForward,
  onStepBackward,
  onSpeedChange,
  onReset,
  onSeek,
}) => {
  const progressRef = useRef<HTMLDivElement>(null);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !onSeek) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const step = Math.round(percentage * (totalSteps - 1));
    onSeek(Math.max(0, Math.min(step, totalSteps - 1)));
  };

  const progressPercentage = totalSteps > 0 ? (currentStep / (totalSteps - 1)) * 100 : 0;

  return (
    <div className="animation-controls">
      <div className="animation-progress">
        <div className="animation-progress-bar-container">
          <div className="animation-progress-bar" onClick={handleProgressClick} ref={progressRef}>
            <div 
              className="animation-progress-fill"
              style={{ width: `${progressPercentage}%` }}
            />
            <div 
              className="animation-progress-handle"
              style={{ left: `${progressPercentage}%` }}
            />
          </div>
        </div>
        <div className="animation-progress-info">
          步骤: {currentStep + 1} / {totalSteps}
        </div>
      </div>

      <div className="animation-controls-buttons">
        <button
          onClick={onStepBackward}
          disabled={currentStep === 0}
          className="animation-control-button"
          title="上一步"
        >
          ⏮
        </button>
        
        {animationState === 'playing' ? (
          <button
            onClick={onPause}
            className="animation-control-button"
            title="暂停"
          >
            ⏸
          </button>
        ) : (
          <button
            onClick={onPlay}
            disabled={currentStep >= totalSteps - 1}
            className="animation-control-button"
            title="播放"
          >
            ▶
          </button>
        )}
        
        <button
          onClick={onStop}
          className="animation-control-button"
          title="停止"
        >
          ⏹
        </button>
        
        <button
          onClick={onStepForward}
          disabled={currentStep >= totalSteps - 1}
          className="animation-control-button"
          title="下一步"
        >
          ⏭
        </button>

        <button
          onClick={onReset}
          className="animation-control-button"
          title="重置"
        >
          🔄
        </button>

        <div className="animation-speed-control">
          <div className="animation-speed-label">
            速度
            <input
              type="range"
              min="1"
              max="5"
              value={speed}
              onChange={(e) => onSpeedChange(Number(e.target.value))}
              className="animation-speed-slider"
            />
            <span>{speed}x</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimationControls;
