import React, { useState } from 'react';
import { useLocation, useHistory } from '@docusaurus/router';
import { FaCode, FaCalculator, FaChevronLeft, FaChevronRight, FaAddressCard } from 'react-icons/fa';
import { MdApi } from 'react-icons/md';
import './styles.css';

export interface Tool {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  path: string;
}

export const tools: Tool[] = [
  {
    id: 'api',
    title: 'API 测试工具',
    description: '便捷的API测试工具，支持多种请求方式和参数配置',
    icon: <MdApi />,
    path: '/tool/api',
  },
  {
    id: 'personal_info',
    title: '个人信息管理',
    description: '管理个人信息，包括姓名、身份证号、手机号等',
    icon: <FaAddressCard />,
    path: '/tool/personal_info',
  },
  {
    id: 'smart_finance',
    title: '智能财务',
    description: '智能化的财务管理工具，帮助您更好地管理资金',
    icon: <FaCalculator />,
    path: '/tool/smart_finance',
  },
  {
    id: 'format_json',
    title: 'JSON 格式化',
    description: 'JSON数据格式化和验证工具',
    icon: <FaCode />,
    path: '/tool/format_json',
  },
];

interface ToolSidebarProps {
  className?: string;
}

export default function ToolSidebar({ className = '' }: ToolSidebarProps): JSX.Element {
  const location = useLocation();
  const history = useHistory();
  const [isExpanded, setIsExpanded] = useState(true);

  const currentPath = location.pathname;
  const selectedTool = tools.find(t => t.path === currentPath)?.id;

  const handleToolSelect = (toolId: string) => {
    const tool = tools.find(t => t.id === toolId);
    if (tool) {
      history.push(tool.path);
    }
  };

  return (
    <div className={`tool-sidebar ${isExpanded ? 'expanded' : 'collapsed'} ${className}`}>
      <div className="sidebar-header">
        <h2 style={{ display: isExpanded ? 'block' : 'none' }}>工具集</h2>
        <button
          className="toggle-button"
          onClick={() => setIsExpanded(!isExpanded)}
          title={isExpanded ? '收起侧边栏' : '展开侧边栏'}
        >
          {isExpanded ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      </div>
      <div className="sidebar-menu">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className={`sidebar-item ${selectedTool === tool.id ? 'active' : ''}`}
            onClick={() => handleToolSelect(tool.id)}
            title={!isExpanded ? `${tool.title} - ${tool.description}` : undefined}
          >
            <div className="sidebar-item-icon">{tool.icon}</div>
            {isExpanded && (
              <div className="sidebar-item-text">
                <div className="title">{tool.title}</div>
                <div className="description">{tool.description}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
