import React from 'react';
import { DataStructureState } from '../types';

interface TestCaseInputProps {
  value: DataStructureState;
  onChange: (value: DataStructureState) => void;
}

const TestCaseInput: React.FC<TestCaseInputProps> = ({ value, onChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const inputValue = e.target.value;
      // 移除所有空格并分割
      const numbers = inputValue.split(/[,，\s]+/).filter(Boolean).map(Number);
      
      // 检查是否所有值都是有效的数字
      if (numbers.some(isNaN)) {
        throw new Error('请输入有效的数字');
      }

      onChange({
        ...value,
        data: numbers,
      });
    } catch (error) {
      // 如果输入无效，保持原来的值不变
      console.error('Invalid input:', error);
    }
  };

  const handleRandomize = () => {
    const length = Math.floor(Math.random() * 5) + 5; // 5-10个数字
    const numbers = Array.from({ length }, () => Math.floor(Math.random() * 90) + 10); // 10-99的数字
    onChange({
      ...value,
      data: numbers,
    });
  };

  const handleClear = () => {
    onChange({
      ...value,
      data: [],
    });
  };

  return (
    <div className="test-case-input">
      <div className="test-case-input-header">
        <span className="test-case-input-title">测试数据</span>
        <div className="test-case-input-controls">
          <button
            onClick={handleRandomize}
            className="px-3 py-1 text-sm rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            title="生成随机数据"
          >
            随机
          </button>
          <button
            onClick={handleClear}
            className="px-3 py-1 text-sm rounded bg-gray-500 text-white hover:bg-gray-600 transition-colors"
            title="清空数据"
          >
            清空
          </button>
        </div>
      </div>
      <textarea
        value={value.data.join(', ')}
        // onChange={handleInputChange}
        placeholder="输入数字，用逗号或空格分隔（例如：64, 34, 25, 12, 22, 11, 90）"
        className="test-case-input-field"
      />
      <div className="mt-2 text-xs text-gray-500">
        提示：输入多个数字，用逗号或空格分隔。数字范围建议在 0-100 之间。
      </div>
    </div>
  );
};

export default TestCaseInput;
