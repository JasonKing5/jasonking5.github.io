import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { FaPlay, FaPlus, FaTrash, FaCog } from 'react-icons/fa';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import './api.css';
import ToolSidebar from '../../components/ToolSidebar';

interface ApiDefinition {
  id: string;
  code: string;
  format: 'curl' | 'fetch';
  expanded?: boolean;
  name?: string;
}

interface ApiResponse {
  id: string;
  status: number;
  data: any;
  error?: string;
}

interface GlobalVariable {
  key: string;
  value: string;
}

const parseCurl = (curlCommand: string): { method: string; path: string } => {
  // Extract the path from the first line of curl command
  const firstLine = curlCommand.split('\n')[0].trim();
  const methodMatch = firstLine.match(/-X\s+(\w+)/);
  const pathMatch = firstLine.match(/curl -X \w+ ["']?([^"'\s\\]+)["']?/);
  const method = methodMatch?.[1] || 'GET';
  const path = pathMatch?.[1] || '';
  
  // Return the path, ensuring it starts with a forward slash
  return {
    method,
    path: path.startsWith('/') ? path : `/${path}`
  };
};

const generateCode = (code: string, format: 'curl' | 'fetch'): string => {
  if (format === 'curl') {
    return code;
  }
    // Convert curl to fetch
    const method = code.match(/-X\s+(\w+)/)?.[1] || 'GET';
    const path = parseCurl(code).path;
    const headers = [...code.matchAll(/-H\s+["']([^"']+)["']/g)].map(m => m[1]);
    const bodyMatch = code.match(/-d\s+['"]({[^}]+})["']/);

    let fetchCode = `fetch('${path}', {
  method: '${method}',
  headers: {
${headers.map(h => `    '${h.split(': ')[0]}': '${h.split(': ')[1]}'`).join(',\n')}
  }`;

    if (bodyMatch) {
      fetchCode += `,\n  body: ${bodyMatch[1]}`;
    }

    fetchCode += `\n})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`;

    return fetchCode;
};

const DEFAULT_BASE_URL = 'http://localhost:4000/api';

const executeApi = async (curlCommand: string, baseUrl: string = DEFAULT_BASE_URL): Promise<ApiResponse> => {
  try {
    const method = curlCommand.match(/-X\s+(\w+)/)?.[1] || 'GET';
    const path = parseCurl(curlCommand).path;
    const headers = [...curlCommand.matchAll(/-H\s+["']([^"']+)["']/g)]
      .map(m => m[1])
      .reduce((obj, header) => {
        const [key, value] = header.split(': ');
        obj[key] = value;
        return obj;
      }, {} as Record<string, string>);
    
    const bodyMatch = curlCommand.match(/-d\s+['"]({[^}]+})["']/);
    const body = bodyMatch ? JSON.parse(bodyMatch[1]) : undefined;

    const fullUrl = `${baseUrl}${path}`;

    const response = await fetch(fullUrl, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();
    return {
      id: Date.now().toString(),
      status: response.status,
      data,
    };
  } catch (error) {
    return {
      id: Date.now().toString(),
      status: 500,
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

const DEFAULT_API: ApiDefinition = {
  id: 'default',
  code: `curl -X POST /auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"username":"root","password":"root123"}'`,
  format: 'curl',
  expanded: true,
  name: '/auth/login'
};

const DEFAULT_NEW_API: ApiDefinition = {
  id: 'new',
  code: `curl -X GET /api/example \\
  -H "Content-Type: application/json"`,
  format: 'curl',
  expanded: true,
  name: '/api/example'
};

export default function ApiPage(): JSX.Element {
  const [apis, setApis] = useState<ApiDefinition[]>([]);
  const [selectedApiId, setSelectedApiId] = useState<string | null>(null);
  const [showNewApiModal, setShowNewApiModal] = useState(false);
  const [newApi, setNewApi] = useState<ApiDefinition>(DEFAULT_NEW_API);
  const [responses, setResponses] = useState<Record<string, ApiResponse>>({});
  const [globalVars, setGlobalVars] = useState<GlobalVariable[]>([
    { key: 'baseUrl', value: DEFAULT_BASE_URL },
    { key: 'token', value: '' }
  ]);
  const [showGlobalVarsModal, setShowGlobalVarsModal] = useState(false);

  // Load saved data from localStorage and initialize default API if needed
  useEffect(() => {
    const savedApis = localStorage.getItem('api_definitions');
    const savedGlobalVars = localStorage.getItem('api_global_vars');
    
    let initialApis: ApiDefinition[] = [];
    if (savedApis) {
      initialApis = JSON.parse(savedApis);
    }
    if (initialApis.length === 0) {
      initialApis = [DEFAULT_API];
    }
    
    setApis(initialApis);
    setSelectedApiId(initialApis[0].id);
    
    if (savedGlobalVars) {
      setGlobalVars(JSON.parse(savedGlobalVars));
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('api_definitions', JSON.stringify(apis));
    localStorage.setItem('api_global_vars', JSON.stringify(globalVars));
  }, [apis, globalVars]);

  const replaceVariables = (text: string): string => {
    let result = text;
   
    for (const variable of globalVars) {
      const regex = new RegExp(`<${variable.key}>`, 'g');
      result = result.replace(regex, variable.value);
    }
    return result;
  };

  const addGlobalVar = () => {
    setGlobalVars([...globalVars, { key: '', value: '' }]);
  };

  const updateGlobalVar = (index: number, key: string, value: string) => {
    const newVars = [...globalVars];
    newVars[index] = { key, value };
    setGlobalVars(newVars);
  };

  const deleteGlobalVar = (index: number) => {
    setGlobalVars(globalVars.filter((_, i) => i !== index));
  };

  const addNewApi = () => {
    const tempId = Date.now().toString();
    const newApiWithId = {
      ...DEFAULT_NEW_API,
      id: tempId,
    };
    setApis([...apis, newApiWithId]);
    setSelectedApiId(tempId);
    setShowNewApiModal(true);
  };

  const updateApiCode = (id: string, newCode: string) => {
    const { method, path } = parseCurl(newCode);
    setApis(apis.map(api => 
      api.id === id ? { 
        ...api, 
        code: newCode,
        name: path 
      } : api
    ));
  };

  const deleteApi = (id: string) => {
    setApis(apis.filter(api => api.id !== id));
    // Also remove the response
    const newResponses = { ...responses };
    delete newResponses[id];
    setResponses(newResponses);
    // Select another API if available
    if (apis.length > 1) {
      const index = apis.findIndex(api => api.id === id);
      const nextApi = apis[index + 1] || apis[index - 1];
      setSelectedApiId(nextApi.id);
    } else {
      setSelectedApiId(null);
    }
  };

  const handleExecute = async (api: ApiDefinition) => {
    const processedCommand = replaceVariables(api.code);
    const baseUrlVar = globalVars.find(v => v.key === 'baseUrl');
    const baseUrl = baseUrlVar?.value || DEFAULT_BASE_URL;
    const response = await executeApi(processedCommand, baseUrl);
    setResponses(prev => ({
      ...prev,
      [api.id]: response
    }));
  };

  const selectedApi = apis.find(api => api.id === selectedApiId);

  return (
    <Layout title="API 测试工具" description="API测试工具">
      <div className="tool-layout">
        <ToolSidebar />
        <div className="tool-content">
          <div className="tool-header">
            <div className="breadcrumbs">
              <Link to="/tool">工具集</Link>
              <span>/</span>
              <span>API 测试工具</span>
            </div>
          </div>
          
          <div className="tool-body">
            <div className="api-sidebar">
              <div className="api-sidebar-header">
                <div className="api-sidebar-actions">
                  <button
                    type="button"
                    className="button button-secondary"
                    onClick={() => setShowGlobalVarsModal(true)}
                  >
                    <FaCog /> 全局变量配置
                  </button>
                  <button
                    type="button"
                    className="button button-primary"
                    onClick={addNewApi}
                  >
                    <FaPlus /> 新增API
                  </button>
                </div>
              </div>
              {apis.map((api) => {
                const { method, path } = parseCurl(api.code);
                return (
                  <div
                    key={api.id}
                    className={`api-sidebar-item ${api.id === selectedApiId ? 'selected' : ''}`}
                    onClick={() => setSelectedApiId(api.id)}
                  >
                    <span className={`api-method ${method.toLowerCase()}`}>
                      {method}
                    </span>
                    <span className="api-path" title={api.name || path}>
                      {api.name || path}
                    </span>
                    <button
                      type="button"
                      className="api-execute-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExecute(api);
                      }}
                    >
                      <FaPlay />
                    </button>
                  </div>
                );
              })}
            </div>
            
            <div className="main-content">
              {selectedApi && (
                <div className="api-item">
                  <div className="api-header">
                    <div className="header-left">
                      <h4>API {parseCurl(selectedApi.code).path}</h4>
                    </div>
                    <div className="header-right">
                      <div className="format-toggle">
                        <button
                          type="button"
                          className={selectedApi.format === 'curl' ? 'active' : ''}
                          onClick={() => setApis(apis.map(a => 
                            a.id === selectedApi.id ? { ...a, format: 'curl' } : a
                          ))}
                        >
                          cURL
                        </button>
                        <button
                          type="button"
                          className={selectedApi.format === 'fetch' ? 'active' : ''}
                          onClick={() => setApis(apis.map(a => 
                            a.id === selectedApi.id ? { ...a, format: 'fetch' } : a
                          ))}
                        >
                          Fetch
                        </button>
                      </div>
                      <div className="button-group">
                        <button
                          type="button"
                          className="button button-primary"
                          onClick={() => handleExecute(selectedApi)}
                        >
                          <FaPlay /> 执行
                        </button>
                        <button
                          type="button"
                          className="button button-secondary"
                          onClick={() => deleteApi(selectedApi.id)}
                        >
                          <FaTrash /> 删除
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="code-editor">
                    <CodeMirror
                      value={selectedApi.format === 'curl' ? selectedApi.code : generateCode(selectedApi.code, 'fetch')}
                      height="200px"
                      extensions={[javascript()]}
                      readOnly={selectedApi.format === 'fetch'}
                      onChange={(value) => updateApiCode(selectedApi.id, value)}
                    />
                  </div>

                  {responses[selectedApi.id] && (
                    <div className="response-section">
                      <h4>Response {responses[selectedApi.id].error ? '(Error)' : `(${responses[selectedApi.id].status})`}</h4>
                      <CodeMirror
                        value={responses[selectedApi.id].error || JSON.stringify(responses[selectedApi.id].data, null, 2)}
                        height="300px"
                        extensions={[json()]}
                        readOnly
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showGlobalVarsModal && (
        <div className="modal-overlay" onClick={() => setShowGlobalVarsModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>全局变量配置</h3>
              <button
                type="button"
                className="button button-secondary"
                onClick={() => setShowGlobalVarsModal(false)}
              >
                关闭
              </button>
            </div>
            <div className="vars-list">
              <div className="var-item baseurl-item">
                <input
                  type="text"
                  value={globalVars.find(v => v.key === 'baseUrl')?.value || DEFAULT_BASE_URL}
                  onChange={(e) => {
                    const index = globalVars.findIndex(v => v.key === 'baseUrl');
                    if (index >= 0) {
                      updateGlobalVar(index, 'baseUrl', e.target.value);
                    } else {
                      setGlobalVars([...globalVars, { key: 'baseUrl', value: e.target.value }]);
                    }
                  }}
                  placeholder="API Base URL"
                />
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={() => {
                    const index = globalVars.findIndex(v => v.key === 'baseUrl');
                    if (index >= 0) {
                      updateGlobalVar(index, 'baseUrl', DEFAULT_BASE_URL);
                    }
                  }}
                >
                  重置
                </button>
              </div>
              {globalVars.filter(v => v.key !== 'baseUrl').map((variable, index) => (
                <div key={index} className="var-item">
                  <input
                    type="text"
                    value={variable.key}
                    onChange={(e) => updateGlobalVar(index + 1, e.target.value, variable.value)}
                    placeholder="变量名"
                  />
                  <input
                    type="text"
                    value={variable.value}
                    onChange={(e) => updateGlobalVar(index + 1, variable.key, e.target.value)}
                    placeholder="变量值"
                  />
                  <button
                    type="button"
                    className="button button-secondary"
                    onClick={() => deleteGlobalVar(index + 1)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="button button-secondary"
                onClick={addGlobalVar}
              >
                <FaPlus /> 添加变量
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
