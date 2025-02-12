export type DataStructureType = 'array' | 'linkedList' | 'tree';

export type DataStructureState = {
  type: 'array';
  data: number[];
};

export type AnimationState = 'playing' | 'paused' | 'stopped';

export interface AnimationStep {
  array: number[];
  highlighted?: number[];
  visited?: number[];
  variables?: Record<string, any>;
  description: string;
  lineNumber: number;  // 使用 lineNumber 来标识代码行
  code: string;        // 用于显示当前执行的代码片段
}
