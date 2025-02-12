import { AnimationStep } from '../types';

export function generateBubbleSortSteps(arr: number[]): AnimationStep[] {
  const steps: AnimationStep[] = [];
  const array = [...arr];
  let stepId = 0;

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      // 比较相邻元素
      steps.push({
        id: stepId++,
        description: `比较元素 ${array[j]} 和 ${array[j + 1]}`,
        code: `if (arr[j] > arr[j + 1])`,
        lineNumber: 9,
        dataSnapshot: [...array],
        compared: [j, j + 1],
        current: j,
      });

      if (array[j] > array[j + 1]) {
        // 交换元素
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        steps.push({
          id: stepId++,
          description: `交换元素 ${array[j]} 和 ${array[j + 1]}`,
          code: `[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]`,
          lineNumber: 12,
          dataSnapshot: [...array],
          swapped: [j, j + 1],
          current: j,
        });
      }
    }
    // 标记已排序的元素
    steps.push({
      id: stepId++,
      description: `元素 ${array[array.length - i - 1]} 已排序`,
      code: `// 内层循环结束，最大元素已到达正确位置`,
      lineNumber: 15,
      dataSnapshot: [...array],
      visited: [array.length - i - 1],
    });
  }

  return steps;
}

export const bubbleSortCode = `function bubbleSort(arr: number[]): number[] {
  const array = [...arr];
  
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      // 比较相邻元素
      if (array[j] > array[j + 1]) {
        // 交换元素
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  
  return array;
}`;
