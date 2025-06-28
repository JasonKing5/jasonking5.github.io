import React, { useState, useEffect, useRef } from 'react';
import './styles.css';
import { 
  FaPlus, FaDownload, FaUpload, FaEdit, FaTrash, FaTimes, 
  FaMoneyBillWave, FaUtensils, FaBus, FaHome, FaShoppingBag, 
  FaFilm, FaDumbbell, FaGift, FaQuestionCircle, FaEllipsisV, 
  FaEye, FaEyeSlash 
} from 'react-icons/fa';

type TransactionType = 'income' | 'expense';

interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  note: string;
  date: string;
}

const CATEGORIES = {
  income: [
    { id: 'salary', name: '工资', icon: <FaMoneyBillWave /> },
    { id: 'bonus', name: '奖金', icon: <FaMoneyBillWave /> },
    { id: 'investment', name: '投资收益', icon: <FaMoneyBillWave /> },
    { id: 'other_income', name: '其他收入', icon: <FaMoneyBillWave /> },
  ],
  expense: [
    { id: 'food', name: '餐饮', icon: <FaUtensils /> },
    { id: 'transportation', name: '交通', icon: <FaBus /> },
    { id: 'shopping', name: '购物', icon: <FaShoppingBag /> },
    { id: 'entertainment', name: '娱乐', icon: <FaFilm /> },
    { id: 'housing', name: '住房', icon: <FaHome /> },
    { id: 'health', name: '医疗健康', icon: <FaDumbbell /> },
    { id: 'gifts', name: '礼物', icon: <FaGift /> },
    { id: 'other', name: '其他', icon: <FaQuestionCircle /> },
  ]
};

type TimeRange = 'week' | 'month' | '3months' | '6months' | 'year' | 'lastYear' | 'all' | 'custom';

const STORAGE_KEY = 'smart_finance_transactions';

export default function SmartFinanceTool(): JSX.Element {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [timeRange, setTimeRange] = useState<TimeRange>('month');
  const [showSettings, setShowSettings] = useState(false);
  const [showAmount, setShowAmount] = useState(false);
  const [formData, setFormData] = useState<Omit<Transaction, 'id'>>({ 
    type: 'expense',
    amount: 0,
    category: 'food',
    note: '',
    date: new Date().toISOString().split('T')[0]
  });
  
  const settingsRef = useRef<HTMLDivElement>(null);
  
  // 点击外部关闭设置菜单
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettings(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 从本地存储加载数据
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // 确保日期格式正确
        const transactionsWithDate = parsed.map((t: any) => ({
          ...t,
          date: t.date || new Date().toISOString().split('T')[0]
        }));
        setTransactions(transactionsWithDate);
      } catch (e) {
        console.error('Failed to parse saved transactions', e);
      }
    }
  }, []);

  // 保存数据到本地存储
  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    }
  }, [transactions]);

  // 获取筛选后的交易
  const getFilteredTransactions = () => {
    const now = new Date();
    let startDate = new Date(0); // 默认最早时间
    
    switch (timeRange) {
      case 'week':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case '3months':
        startDate = new Date(now.getFullYear(), now.getMonth() - 2, 1);
        break;
      case '6months':
        startDate = new Date(now.getFullYear(), now.getMonth() - 5, 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      case 'lastYear':
        startDate = new Date(now.getFullYear() - 1, 0, 1);
        const endDate = new Date(now.getFullYear() - 1, 11, 31);
        return transactions.filter(t => {
          const txDate = new Date(t.date);
          return txDate >= startDate && txDate <= endDate;
        });
      case 'all':
        return [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      default:
        break;
    }
    
    return transactions.filter(t => new Date(t.date) >= startDate)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const filteredTransactions = getFilteredTransactions();

  // 计算统计信息
  const income = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const expense = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const stats = {
    income,
    expense,
    balance: income - expense
  };

  // 处理表单输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value
    }));
  };

  // 处理交易类型切换
  const handleTypeChange = (type: TransactionType) => {
    setFormData(prev => ({
      ...prev,
      type,
      category: type === 'income' ? 'salary' : 'food'
    }));
  };

  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 关闭键盘（针对移动端）
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    
    if (editingTransaction) {
      // 更新现有交易
      setTransactions(transactions.map(t => 
        t.id === editingTransaction.id ? { ...formData, id: editingTransaction.id } : t
      ));
    } else {
      // 添加新交易
      const newTransaction: Transaction = {
        ...formData,
        id: Date.now().toString()
      };
      setTransactions([newTransaction, ...transactions]);
    }
    
    // 重置表单
    setFormData({
      type: 'expense',
      amount: 0,
      category: 'food',
      note: '',
      date: new Date().toISOString().split('T')[0]
    });
    setEditingTransaction(null);
    setIsFormOpen(false);
  };

  // 编辑交易
  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setFormData({
      type: transaction.type,
      amount: transaction.amount,
      category: transaction.category,
      note: transaction.note,
      date: transaction.date
    });
    setIsFormOpen(true);
  };

  // 删除交易
  const handleDelete = (id: string) => {
    if (window.confirm('确定要删除这条记录吗？')) {
      setTransactions(transactions.filter(t => t.id !== id));
    }
  };

  // 导出数据
  const handleExport = () => {
    const dataStr = JSON.stringify(transactions, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `transactions-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // 导入数据
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target?.result as string);
        if (Array.isArray(importedData)) {
          setTransactions(importedData);
          alert('数据导入成功！');
        } else {
          alert('导入的文件格式不正确');
        }
      } catch (error) {
        console.error('导入失败:', error);
        alert('导入失败，请检查文件格式');
      }
    };
    reader.readAsText(file);
    // 重置input值，以便可以重复导入同一个文件
    e.target.value = '';
  };

  // 获取分类图标
  const getCategoryIcon = (type: TransactionType, category: string) => {
    const categories = type === 'income' ? CATEGORIES.income : CATEGORIES.expense;
    const found = categories.find(c => c.id === category);
    return found ? found.icon : <FaQuestionCircle />;
  };

  // 获取分类名称
  const getCategoryName = (type: TransactionType, category: string) => {
    const categories = type === 'income' ? CATEGORIES.income : CATEGORIES.expense;
    const found = categories.find(c => c.id === category);
    return found ? found.name : '其他';
  };

  return (
    <div className="smart-finance-container">
      <h2>智能财务工具</h2>
      <p className="tool-description">
        记录您的每一笔收支，帮助您更好地管理个人财务。
      </p>

      {/* 总资产 */}
      <div className="asset-card">
        <div className="asset-content">
          <span className="asset-label">总资产</span>
          <div className="asset-amount-container">
            <span className="asset-amount">
              {showAmount ? (
                transactions.reduce((total, t) => 
                  t.type === 'income' ? total + t.amount : total - t.amount, 0
                ).toFixed(2)
              ) : '******'}
            </span>
            <button 
              className="toggle-amount-btn" 
              onClick={() => setShowAmount(!showAmount)}
              aria-label={showAmount ? '隐藏金额' : '显示金额'}
            >
              {showAmount ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="stats-container">
        <div className="stat-card">
          <h3>总收入</h3>
          <div className="stat-amount income">{stats.income.toFixed(2)}</div>
        </div>
        <div className="stat-card">
          <h3>总支出</h3>
          <div className="stat-amount expense">{stats.expense.toFixed(2)}</div>
        </div>
        <div className="stat-card">
          <h3>结余</h3>
          <div className="stat-amount balance">{(stats.income - stats.expense).toFixed(2)}</div>
        </div>
      </div>

      {/* 时间筛选 */}
      <div className="filters">
        <button 
          className={`filter-btn ${timeRange === 'week' ? 'active' : ''}`}
          onClick={() => setTimeRange('week')}
        >
          本周
        </button>
        <button 
          className={`filter-btn ${timeRange === 'month' ? 'active' : ''}`}
          onClick={() => setTimeRange('month')}
        >
          本月
        </button>
        <button 
          className={`filter-btn ${timeRange === '3months' ? 'active' : ''}`}
          onClick={() => setTimeRange('3months')}
        >
          近三个月
        </button>
        <button 
          className={`filter-btn ${timeRange === '6months' ? 'active' : ''}`}
          onClick={() => setTimeRange('6months')}
        >
          近半年
        </button>
        <button 
          className={`filter-btn ${timeRange === 'year' ? 'active' : ''}`}
          onClick={() => setTimeRange('year')}
        >
          今年
        </button>
        <button 
          className={`filter-btn ${timeRange === 'lastYear' ? 'active' : ''}`}
          onClick={() => setTimeRange('lastYear')}
        >
          去年
        </button>
        <button 
          className={`filter-btn ${timeRange === 'all' ? 'active' : ''}`}
          onClick={() => setTimeRange('all')}
        >
          全部记录
        </button>
      </div>

      {/* 操作按钮 */}
      <div className="actions">
        <button 
          className="btn btn-primary"
          onClick={() => {
            setEditingTransaction(null);
            setFormData({
              type: 'expense',
              amount: 0,
              category: 'food',
              note: '',
              date: new Date().toISOString().split('T')[0]
            });
            setIsFormOpen(true);
          }}
        >
          <FaPlus /> 添加记录
        </button>
        
        <div className="action-buttons">
          <button 
            className="action-btn"
            onClick={handleExport}
            title="导出数据"
          >
            <FaDownload />
          </button>
          <label className="action-btn" title="导入数据">
            <FaUpload />
            <input 
              type="file" 
              accept=".json" 
              onChange={handleImport}
              style={{ display: 'none' }} 
            />
          </label>
        </div>
      </div>

      {/* 交易列表 */}
      <div className="transaction-list">
        {filteredTransactions.length === 0 ? (
          <div className="empty-state">
            <FaMoneyBillWave />
            <h3>暂无交易记录</h3>
            <p>点击"添加记录"开始记账</p>
          </div>
        ) : (
          filteredTransactions.map(transaction => (
            <div 
              key={transaction.id} 
              className="transaction-item"
              onClick={() => handleEdit(transaction)}
            >
              <div className="transaction-left">
                <div className={`transaction-amount ${transaction.type}`}>
                  {transaction.amount.toFixed(2)}
                </div>
                <div className="transaction-date">
                  {new Date(transaction.date).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}
                </div>
              </div>
              <div className="transaction-right">
                <div className="transaction-category">
                  {getCategoryIcon(transaction.type, transaction.category)}
                  <span>{getCategoryName(transaction.type, transaction.category)}</span>
                </div>
                {transaction.note && (
                  <div className="transaction-note" title={transaction.note}>
                    {transaction.note}
                  </div>
                )}
              </div>
              <div className="transaction-actions">
                <button 
                  className="action-btn" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(transaction.id);
                  }}
                  title="删除"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 添加/编辑表单弹窗 */}
      <div className={`form-overlay ${isFormOpen ? 'active' : ''}`}>
        <div className="form-container" onClick={e => e.stopPropagation()}>
          <div className="form-header">
            <h3>{editingTransaction ? '编辑记录' : '添加新记录'}</h3>
            <button 
              type="button"
              className="close-btn" 
              onClick={() => setIsFormOpen(false)}
              aria-label="关闭"
            >
              <FaTimes />
            </button>
          </div>
            
            <form onSubmit={handleSubmit}>
              <div className="type-toggle">
                <button 
                  type="button"
                  className={`type-btn expense ${formData.type === 'expense' ? 'active' : ''}`}
                  onClick={() => handleTypeChange('expense')}
                >
                  支出
                </button>
                <button 
                  type="button"
                  className={`type-btn income ${formData.type === 'income' ? 'active' : ''}`}
                  onClick={() => handleTypeChange('income')}
                >
                  收入
                </button>
              </div>

              <div className="form-group">
                <label htmlFor="amount">金额</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  className="form-control"
                  value={formData.amount || ''}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">分类</label>
                <div className="select-wrapper">
                  <select
                    id="category"
                    name="category"
                    className="form-control"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    {(formData.type === 'income' ? CATEGORIES.income : CATEGORIES.expense).map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="date">日期</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="form-control"
                  value={formData.date}
                  onChange={handleInputChange}
                  max={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="note">备注 (可选)</label>
                <textarea
                  id="note"
                  name="note"
                  className="form-control"
                  value={formData.note}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>

              <div className="actions">
                <button 
                  type="button" 
                  className="btn btn-outline"
                  onClick={() => setIsFormOpen(false)}
                >
                  取消
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                >
                  {editingTransaction ? '更新' : '保存'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
