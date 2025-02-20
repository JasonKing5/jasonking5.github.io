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
            <h1>欢迎使用工具集</h1>
            <p>请选择要使用的工具</p>
            <div className="tool-grid">
              {tools.map((tool) => (
                <div
                  key={tool.id}
                  className="tool-card"
                  onClick={() => window.location.href === tool.path}
                  onKeyUp={(e) => e.preventDefault()}
                >
                  <div className="tool-card-icon">{tool.icon}</div>
                  <h3>{tool.title}</h3>
                  <p>{tool.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
