import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import { useLocation } from '@docusaurus/router';
import ToolSidebar, { tools } from '../../components/ToolSidebar';
import ApiPage from '../../components/Tools/api';
import PersonalInfoPage from '../../components/Tools/personal_info';
import './index.css';

export default function Tool(): JSX.Element {
  const location = useLocation();
  const [currentTool, setCurrentTool] = useState('');
  
  // Initialize currentTool based on URL hash
  useEffect(() => {
    const hash = location.hash ? location.hash.substring(1) : '';
    if (hash && tools.some(tool => tool.id === hash)) {
      setCurrentTool(hash);
    } else {
      setCurrentTool('');
    }
  }, [location.hash]);

  // Handle tool selection from sidebar
  const handleToolSelect = (toolId: string) => {
    setCurrentTool(toolId);
  };
  
  return (
    <Layout
      title="工具"
      description="常用工具"
    >
      <div className="tool-layout">
        <ToolSidebar onToolSelect={handleToolSelect} />
        <div className="tool-content">
          <div className="tool-welcome">
            {!currentTool && (
              <div className="welcome-header">
                <h1>欢迎使用工具集</h1>
                <p className="welcome-description">这里提供了一系列实用工具，帮助您提高工作效率</p>
              </div>
            )}
            
            {currentTool === 'api' && <ApiPage />}
            {currentTool === 'personal_info' && <PersonalInfoPage />}
            {currentTool === 'smart_finance' && <div className="tool-placeholder">智能财务工具正在开发中...</div>}
            {currentTool === 'format_json' && <div className="tool-placeholder">JSON 格式化工具正在开发中...</div>}
            
            {!currentTool && (
              <div className="tool-grid">
                {tools.map((tool) => (
                  <a
                    key={tool.id}
                    className="tool-card"
                    href={`/tool/#${tool.id}`}
                  >
                    <div className="tool-card-icon">{tool.icon}</div>
                    <div className="tool-card-content">
                      <h3>{tool.title}</h3>
                      <p>{tool.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
