import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from '@docusaurus/router';
import { FaCode, FaCalculator, FaChevronLeft, FaChevronRight, FaAddressCard, FaBars } from 'react-icons/fa';
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
  onToolSelect?: (toolId: string) => void;
}

export default function ToolSidebar({ className = '', onToolSelect }: ToolSidebarProps): JSX.Element {
  const location = useLocation();
  const history = useHistory();
  const [isMobile, setIsMobile] = useState(false);

  // Extract the current tool ID from the URL hash
  const hash = location.hash ? location.hash.substring(1) : '';
  const currentPath = location.pathname;
  const selectedTool = hash || tools.find(t => t.path === currentPath)?.id || '';
  
  // Check if the sidebar is collapsed based on the className prop
  const isExpanded = !className.includes('collapsed');

  // Check if screen is mobile
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleToolSelect = (toolId: string) => {
    if (onToolSelect) {
      onToolSelect(toolId);
    }
    
    // Update URL hash
    history.push(`/tool/#${toolId}`);
  };

  if (!isExpanded) {
    return <div className={`tool-sidebar ${className}`}></div>;
  }

  return (
    <div className={`tool-sidebar ${className}`}>
      <div className="sidebar-header">
        <h2>工具集</h2>
      </div>
      <div className="sidebar-menu">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className={`sidebar-item ${selectedTool === tool.id ? 'active' : ''}`}
            onClick={() => handleToolSelect(tool.id)}
          >
            <div className="sidebar-item-icon">{tool.icon}</div>
            <div className="sidebar-item-text">
              <div className="title">{tool.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
