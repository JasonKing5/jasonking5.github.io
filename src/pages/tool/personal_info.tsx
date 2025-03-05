import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaCopy, 
  FaSave, 
  FaTimes, 
  FaUser, 
  FaKey, 
  FaMapMarkerAlt, 
  FaInfoCircle,
  FaCheck,
  FaChevronDown,
  FaChevronUp,
  FaList,
  FaTh,
  FaDownload,
  FaUpload
} from 'react-icons/fa';
import './personal_info.css';
import ToolSidebar from '../../components/ToolSidebar';

// 定义个人信息类型
interface PersonalInfo {
  id: string;
  type: string;
  name: string;
  value: string;
  description?: string;
  createdAt: number;
  updatedAt: number;
}

// 定义信息类型选项
const infoTypes = [
  { value: 'person', label: '个人信息', icon: <FaUser /> },
  { value: 'account', label: '账号信息', icon: <FaKey /> },
  { value: 'address', label: '地址信息', icon: <FaMapMarkerAlt /> },
  { value: 'other', label: '其他信息', icon: <FaInfoCircle /> },
];

const PersonalInfoPage: React.FC = () => {
  const [personalInfos, setPersonalInfos] = useState<PersonalInfo[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentInfo, setCurrentInfo] = useState<PersonalInfo>({
    id: '',
    type: 'person',
    name: '',
    value: '',
    description: '',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [copyMessage, setCopyMessage] = useState('');
  const [copiedValue, setCopiedValue] = useState('');
  // 新增状态
  const [formCollapsed, setFormCollapsed] = useState(false);
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [importData, setImportData] = useState('');
  const [showImportForm, setShowImportForm] = useState(false);

  // 从 localStorage 加载数据
  useEffect(() => {
    const savedInfos = localStorage.getItem('personalInfos');
    if (savedInfos) {
      setPersonalInfos(JSON.parse(savedInfos));
    }
  }, []);

  // 保存数据到 localStorage
  useEffect(() => {
    localStorage.setItem('personalInfos', JSON.stringify(personalInfos));
  }, [personalInfos]);

  // 处理添加或更新信息
  const handleSaveInfo = () => {
    if (!currentInfo.name || !currentInfo.value) {
      alert('名称和值不能为空');
      return;
    }

    if (isEditing) {
      // 更新现有信息
      setPersonalInfos(
        personalInfos.map((info) =>
          info.id === currentInfo.id
            ? { ...currentInfo, updatedAt: Date.now() }
            : info
        )
      );
    } else {
      // 添加新信息
      setPersonalInfos([
        ...personalInfos,
        {
          ...currentInfo,
          id: Date.now().toString(),
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      ]);
    }

    // 重置表单
    resetForm();
  };

  // 处理编辑信息
  const handleEditInfo = (info: PersonalInfo) => {
    setCurrentInfo(info);
    setIsEditing(true);
    setFormCollapsed(false); // 展开表单
  };

  // 处理删除信息
  const handleDeleteInfo = (id: string) => {
    if (confirm('确定要删除这条信息吗？')) {
      setPersonalInfos(personalInfos.filter((info) => info.id !== id));
    }
  };

  // 处理复制信息
  const handleCopyInfo = (value: string, name: string) => {
    navigator.clipboard.writeText(value).then(
      () => {
        setCopiedValue(name);
        setCopyMessage(`已复制 ${name} 的值`);
        setTimeout(() => setCopyMessage(''), 2000);
      },
      () => {
        setCopyMessage('复制失败，请手动复制');
        setTimeout(() => setCopyMessage(''), 2000);
      }
    );
  };

  // 重置表单
  const resetForm = () => {
    setCurrentInfo({
      id: '',
      type: 'person',
      name: '',
      value: '',
      description: '',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    setIsEditing(false);
  };

  // 导出数据
  const handleExportData = () => {
    const jsonData = JSON.stringify(personalInfos, null, 2);
    navigator.clipboard.writeText(jsonData).then(
      () => {
        setCopyMessage('已成功导出数据并复制到剪贴板');
        setTimeout(() => setCopyMessage(''), 3000);
      },
      () => {
        setCopyMessage('导出失败，请手动复制');
        setTimeout(() => setCopyMessage(''), 3000);
      }
    );
  };

  // 导入数据
  const handleImportData = () => {
    try {
      const data = JSON.parse(importData);
      if (!Array.isArray(data)) {
        throw new Error('导入的数据必须是JSON数组');
      }
      
      // 验证数据格式
      const isValid = data.every(item => 
        typeof item === 'object' && 
        item.id && 
        item.type && 
        item.name && 
        item.value && 
        item.createdAt && 
        item.updatedAt
      );
      
      if (!isValid) {
        throw new Error('导入的数据格式不正确');
      }
      
      // 确认导入
      if (confirm(`确定要导入 ${data.length} 条信息吗？这将覆盖现有的重复项。`)) {
        // 合并数据，以新导入的为准
        const mergedData = [...personalInfos];
        data.forEach(newItem => {
          const existingIndex = mergedData.findIndex(item => item.id === newItem.id);
          if (existingIndex >= 0) {
            mergedData[existingIndex] = newItem;
          } else {
            mergedData.push(newItem);
          }
        });
        
        setPersonalInfos(mergedData);
        setImportData('');
        setShowImportForm(false);
        setCopyMessage(`成功导入 ${data.length} 条信息`);
        setTimeout(() => setCopyMessage(''), 3000);
      }
    } catch (error) {
      alert(`导入失败: ${error.message}`);
    }
  };

  // 过滤和搜索信息
  const filteredInfos = personalInfos.filter((info) => {
    const matchesSearch =
      info.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      info.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (info.description &&
        info.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = filterType === 'all' || info.type === filterType;
    
    return matchesSearch && matchesType;
  });

  // 获取类型图标
  const getTypeIcon = (type: string) => {
    const typeInfo = infoTypes.find(t => t.value === type);
    return typeInfo ? typeInfo.icon : <FaInfoCircle />;
  };

  return (
    <Layout
      title="个人信息管理"
      description="管理个人信息，包括姓名、身份证号、手机号等"
    >
      <div className="tool-layout">
        <ToolSidebar />
        <div className="personal-info-container">
          <div className="breadcrumbs">
            <Link to="/tool">工具</Link>
            <span>&gt;</span>
            <span>个人信息管理</span>
          </div>

          <h1>个人信息管理</h1>

          {/* 添加/编辑表单 */}
          <div className="info-form-container">
            <div className="section-header" onClick={() => setFormCollapsed(!formCollapsed)}>
              <h2>{isEditing ? '编辑信息' : '添加新信息'}</h2>
              <button className="collapse-button">
                {formCollapsed ? <FaChevronDown /> : <FaChevronUp />}
              </button>
            </div>
            
            {!formCollapsed && (
              <div className="info-form">
                <div className="form-group">
                  <label htmlFor="type">
                    <span className="form-icon">{getTypeIcon(currentInfo.type)}</span>
                    信息类型
                  </label>
                  <select
                    id="type"
                    value={currentInfo.type}
                    onChange={(e) =>
                      setCurrentInfo({ ...currentInfo, type: e.target.value })
                    }
                  >
                    {infoTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="name">
                    <span className="form-icon"><FaInfoCircle /></span>
                    名称
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={currentInfo.name}
                    onChange={(e) =>
                      setCurrentInfo({ ...currentInfo, name: e.target.value })
                    }
                    placeholder="例如：姓名、身份证号、账号等"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="value">
                    <span className="form-icon"><FaKey /></span>
                    值
                  </label>
                  <input
                    type="text"
                    id="value"
                    value={currentInfo.value}
                    onChange={(e) =>
                      setCurrentInfo({ ...currentInfo, value: e.target.value })
                    }
                    placeholder="对应的值"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">
                    <span className="form-icon"><FaInfoCircle /></span>
                    描述（可选）
                  </label>
                  <textarea
                    id="description"
                    value={currentInfo.description || ''}
                    onChange={(e) =>
                      setCurrentInfo({
                        ...currentInfo,
                        description: e.target.value,
                      })
                    }
                    placeholder="添加额外的备注信息"
                  />
                </div>

                <div className="form-actions">
                  <button
                    className="button button--primary"
                    onClick={handleSaveInfo}
                  >
                    <FaSave /> {isEditing ? '更新' : '保存'}
                  </button>
                  {isEditing && (
                    <button
                      className="button button--secondary"
                      onClick={resetForm}
                    >
                      <FaTimes /> 取消
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 搜索和过滤 */}
          <div className="search-filter-container">
            <div className="search-box">
              <input
                type="text"
                placeholder="搜索信息..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-box">
              <label htmlFor="filter-type">类型过滤：</label>
              <select
                id="filter-type"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">全部</option>
                {infoTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="view-actions">
              <button 
                className={`view-button ${viewMode === 'card' ? 'active' : ''}`}
                onClick={() => setViewMode('card')}
                title="卡片视图"
              >
                <FaTh />
              </button>
              <button 
                className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="列表视图"
              >
                <FaList />
              </button>
            </div>
            <div className="import-export-actions">
              <button 
                className="button button--secondary"
                onClick={handleExportData}
                title="导出数据"
              >
                <FaDownload /> 导出
              </button>
              <button 
                className="button button--secondary"
                onClick={() => setShowImportForm(!showImportForm)}
                title="导入数据"
              >
                <FaUpload /> 导入
              </button>
            </div>
          </div>

          {/* 导入表单 */}
          {showImportForm && (
            <div className="import-form-container">
              <h3>导入数据</h3>
              <p>请粘贴JSON格式的数据：</p>
              <textarea
                value={importData}
                onChange={(e) => setImportData(e.target.value)}
                placeholder="粘贴JSON数组数据..."
                rows={5}
              />
              <div className="import-actions">
                <button 
                  className="button button--primary"
                  onClick={handleImportData}
                  disabled={!importData}
                >
                  <FaCheck /> 确认导入
                </button>
                <button 
                  className="button button--secondary"
                  onClick={() => {
                    setImportData('');
                    setShowImportForm(false);
                  }}
                >
                  <FaTimes /> 取消
                </button>
              </div>
            </div>
          )}

          {/* 信息列表 */}
          <div className="info-list-container">
            <h2>信息列表 ({filteredInfos.length})</h2>
            {copyMessage && (
              <div className="copy-message">
                <FaCheck /> {copyMessage}
              </div>
            )}
            {filteredInfos.length === 0 ? (
              <div className="empty-list">
                <p>没有找到符合条件的信息</p>
              </div>
            ) : (
              <div className={`info-list ${viewMode === 'list' ? 'list-view' : 'card-view'}`}>
                {filteredInfos.map((info) => {
                  const typeLabel = infoTypes.find(
                    (t) => t.value === info.type
                  )?.label;
                  const typeIcon = getTypeIcon(info.type);
                  
                  return (
                    <div key={info.id} className={`info-item ${viewMode === 'list' ? 'info-row' : 'info-card'}`}>
                      {viewMode === 'card' ? (
                        // 卡片视图
                        <>
                          <div className="info-card-header">
                            <span className={`info-type ${info.type}`}>
                              {typeIcon} {typeLabel}
                            </span>
                            <div className="info-actions">
                              <button
                                className="action-button edit"
                                onClick={() => handleEditInfo(info)}
                                title="编辑"
                              >
                                <FaEdit /> <span className="action-text">编辑</span>
                              </button>
                              <button
                                className="action-button delete"
                                onClick={() => handleDeleteInfo(info.id)}
                                title="删除"
                              >
                                <FaTrash /> <span className="action-text">删除</span>
                              </button>
                            </div>
                          </div>
                          <div className="info-card-body">
                            <h3>{info.name}</h3>
                            <div className="info-value-container">
                              <p className="info-value">{info.value}</p>
                              <button
                                className="copy-button"
                                onClick={() => handleCopyInfo(info.value, info.name)}
                                title="复制"
                              >
                                <FaCopy /> <span className="copy-text">复制</span>
                              </button>
                            </div>
                            {info.description && (
                              <p className="info-description">{info.description}</p>
                            )}
                          </div>
                          <div className="info-card-footer">
                            <span className="info-date">
                              更新于：{new Date(info.updatedAt).toLocaleString()}
                            </span>
                          </div>
                        </>
                      ) : (
                        // 列表视图
                        <div className="info-row-content">
                          <div className="info-row-type">
                            {typeIcon} <span className="type-label">{typeLabel}</span>
                          </div>
                          <div className="info-row-name">{info.name}</div>
                          <div className="info-row-value">
                            <span>{info.value}</span>
                            <button
                              className="copy-button-small"
                              onClick={() => handleCopyInfo(info.value, info.name)}
                              title="复制"
                            >
                              <FaCopy />
                            </button>
                          </div>
                          <div className="info-row-actions">
                            <button
                              className="action-button-small edit"
                              onClick={() => handleEditInfo(info)}
                              title="编辑"
                            >
                              <FaEdit />
                            </button>
                            <button
                              className="action-button-small delete"
                              onClick={() => handleDeleteInfo(info.id)}
                              title="删除"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PersonalInfoPage;
