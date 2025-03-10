import React, { useState } from 'react';
import './styles.css';

export default function FormatJsonTool(): JSX.Element {
  return (
    <div className="format-json-container">
      <h2>JSON 格式化工具</h2>
      <p className="tool-description">
        JSON数据格式化和验证工具，帮助您快速整理和检查JSON数据。此功能正在开发中...
      </p>
      <div className="placeholder-content">
        <div className="coming-soon">
          功能即将上线
        </div>
      </div>
    </div>
  );
}
