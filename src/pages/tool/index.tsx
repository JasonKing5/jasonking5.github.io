import React from 'react';
import Layout from '@theme/Layout';
import ToolSidebar, { tools } from '../../components/ToolSidebar';
import './index.css';

export default function Tool(): JSX.Element {
  return (
    <Layout
      title="工具"
      description="常用工具"
    >
      <div className="tool-layout">
        <ToolSidebar />
        <div className="tool-content">
          <div className="tool-welcome">
            <div className="welcome-header">
              <h1>欢迎使用工具集</h1>
              <p className="welcome-description">这里提供了一系列实用工具，帮助您提高工作效率</p>
            </div>
            <div className="tool-grid">
              {tools.map((tool) => (
                <a
                  key={tool.id}
                  className="tool-card"
                  href={tool.path}
                >
                  <div className="tool-card-icon">{tool.icon}</div>
                  <div className="tool-card-content">
                    <h3>{tool.title}</h3>
                    <p>{tool.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
