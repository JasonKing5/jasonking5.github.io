import { bubbleSortCode, generateBubbleSortSteps } from './bubbleSort';

export interface Algorithm {
  key: string;
  name: string;
  category: string;
  description: string;
  code: string;
  generateSteps: (input: any) => any[];
}

export const algorithms: Algorithm[] = [
  {
    key: 'bubbleSort',
    name: '冒泡排序',
    category: 'sorting',
    description: '冒泡排序是一种简单的排序算法，它重复地遍历要排序的序列，依次比较两个相邻的元素，如果它们的顺序错误就把它们交换过来。',
    code: bubbleSortCode,
    generateSteps: generateBubbleSortSteps,
  },
];
