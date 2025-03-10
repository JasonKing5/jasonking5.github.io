import React, { useState, useEffect, useMemo } from 'react';
import Layout from '@theme/Layout';
import { useLocation, useHistory } from '@docusaurus/router';
import ToolSidebar, { tools } from '../../components/ToolSidebar';
import ToolHeader from '../../components/ToolHeader';
import ApiTool from '../../components/Tools/api';
import PersonalInfoTool from '../../components/Tools/personal_info';
import SmartFinanceTool from '../../components/Tools/smart_finance';
import FormatJsonTool from '../../components/Tools/format_json';
import './index.css';

function ToolPage(): JSX.Element {
  const location = useLocation();
  const history = useHistory();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Extract the current tool ID from the URL hash
  const hash = location.hash ? location.hash.substring(1) : '';
  const selectedToolId = hash || '';

  // Check if screen is mobile
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile && isSidebarExpanded) {
        setIsSidebarExpanded(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [isSidebarExpanded]);

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Filter tools based on search query
  const filteredTools = useMemo(() => {
    if (!searchQuery) return tools;
    
    return tools.filter(tool => 
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Render the selected tool
  const renderTool = () => {
    switch (selectedToolId) {
      case 'api':
        return <ApiTool />;
      case 'personal_info':
        return <PersonalInfoTool />;
      case 'smart_finance':
        return <SmartFinanceTool />;
      case 'format_json':
        return <FormatJsonTool />;
      default:
        return (
          <div className="tool-welcome">
            <div className="welcome-header">
              <h1>欢迎使用工具集</h1>
              <p className="welcome-description">
                这里提供了一系列实用工具，帮助您更高效地完成各种任务。
                点击左侧菜单选择您需要的工具开始使用。
              </p>
            </div>
            <div className="tool-grid">
              {filteredTools.length > 0 ? (
                filteredTools.map((tool) => (
                  <div
                    key={tool.id}
                    className="tool-card"
                    onClick={() => history.push(`/tool/#${tool.id}`)}
                  >
                    <div className="tool-card-icon">{tool.icon}</div>
                    <div className="tool-card-content">
                      <h3>{tool.title}</h3>
                      <p>{tool.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">
                  <p>没有找到匹配的工具，请尝试其他关键词</p>
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <Layout
      title="工具集"
      description="实用工具集合，提供各种便捷功能"
    >
      <div className="tool-layout">
        <ToolSidebar
          className={isSidebarExpanded ? '' : 'collapsed'}
          onToolSelect={(toolId) => history.push(`/tool/#${toolId}`)}
        />
        <div className="tool-content">
          <ToolHeader
            onToggleSidebar={toggleSidebar}
            isSidebarExpanded={isSidebarExpanded}
            onSearch={handleSearch}
          />
          {renderTool()}
        </div>
      </div>
    </Layout>
  );
}

export default ToolPage;
