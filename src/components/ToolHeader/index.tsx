import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from '@docusaurus/router';
import Link from '@docusaurus/Link';
import { FaBars, FaHome, FaSearch } from 'react-icons/fa';
import './styles.css';

interface ToolHeaderProps {
  onToggleSidebar?: () => void;
  isSidebarExpanded?: boolean;
  onSearch?: (query: string) => void;
}

export default function ToolHeader({ 
  onToggleSidebar, 
  isSidebarExpanded = true,
  onSearch
}: ToolHeaderProps): JSX.Element {
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce search query
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300); // 300ms debounce time

    return () => {
      clearTimeout(timerId);
    };
  }, [searchQuery]);

  // Emit search event when debounced query changes
  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery, onSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Trigger immediate search on form submit
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleHomeClick = () => {
    history.push('/tool');
  };

  return (
    <div className="tool-header-container">
      <div className="tool-header-left">
        <button 
          className="header-button sidebar-toggle"
          onClick={onToggleSidebar}
          title={isSidebarExpanded ? "收起侧边栏" : "展开侧边栏"}
        >
          <FaBars />
        </button>
        
        <button 
          className="header-button home-button"
          onClick={handleHomeClick}
          title="返回工具首页"
        >
          <FaHome />
        </button>
        
        <div className="search-container">
          <form onSubmit={handleSearch} className="search-form">
            <FaSearch className="search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索工具..."
              className="search-input"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
