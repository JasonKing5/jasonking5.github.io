import React, { useState, useEffect, useRef } from 'react';
import './styles.css';
import { 
  FaPlus, FaTrash, FaEdit, FaDownload, FaUpload, FaTags, FaTimes, 
  FaMoneyBillWave, FaShoppingCart, FaFolderOpen, FaUtensils, FaBus, 
  FaHome, FaShoppingBag, FaFilm, FaDumbbell, FaGift, FaQuestionCircle, 
  FaEllipsisV, FaEye, FaEyeSlash, FaCog, FaExpand, FaCompress
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

interface Category {
  id: string;
  name: string;
  type: TransactionType;
  icon: JSX.Element | string;
  isCustom?: boolean;
}

const DEFAULT_CATEGORIES: Category[] = [
  { id: 'salary', name: '工资', type: 'income', icon: <FaMoneyBillWave /> },
  { id: 'bonus', name: '奖金', type: 'income', icon: <FaMoneyBillWave /> },
  { id: 'investment', name: '投资收益', type: 'income', icon: <FaMoneyBillWave /> },
  { id: 'other_income', name: '其他收入', type: 'income', icon: <FaMoneyBillWave /> },
  { id: 'food', name: '餐饮', type: 'expense', icon: <FaUtensils /> },
  { id: 'transportation', name: '交通', type: 'expense', icon: <FaBus /> },
  { id: 'shopping', name: '购物', type: 'expense', icon: <FaShoppingBag /> },
  { id: 'entertainment', name: '娱乐', type: 'expense', icon: <FaFilm /> },
  { id: 'housing', name: '住房', type: 'expense', icon: <FaHome /> },
  { id: 'health', name: '医疗健康', type: 'expense', icon: <FaDumbbell /> },
  { id: 'gifts', name: '礼物', type: 'expense', icon: <FaGift /> },
  { id: 'other', name: '其他', type: 'expense', icon: <FaQuestionCircle /> },
];

const STORAGE_KEYS = {
  TRANSACTIONS: 'smart_finance_transactions',
  CUSTOM_CATEGORIES: 'smart_finance_custom_categories'
};

type TimeRange = 'week' | 'month' | '3months' | '6months' | 'year' | 'lastYear' | 'all' | 'custom';

const STORAGE_KEY = 'smart_finance_transactions';

export default function SmartFinanceTool(): JSX.Element {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [customCategories, setCustomCategories] = useState<Category[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false);
  const [newCategory, setNewCategory] = useState<Omit<Category, 'id' | 'icon'>>({ 
    name: '', 
    type: 'expense' 
  });
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [timeRange, setTimeRange] = useState<TimeRange>('month');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showSettings, setShowSettings] = useState(false);
  const [showAmount, setShowAmount] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [formData, setFormData] = useState<Omit<Transaction, 'id'>>({ 
    type: 'expense',
    amount: 0,
    category: 'food',
    note: '',
    date: new Date().toISOString().split('T')[0]
  });
  
  const settingsRef = useRef<HTMLDivElement>(null);
  const categoryManagerRef = useRef<HTMLDivElement>(null);
  
  // 获取所有分类（默认 + 自定义）
  const getAllCategories = (type: TransactionType) => {
    const defaultCats = DEFAULT_CATEGORIES.filter(cat => cat.type === type);
    const customCats = customCategories.filter(cat => cat.type === type);
    return [...defaultCats, ...customCats];
  };
  

  
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
    // 加载交易记录
    const savedTransactions = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    if (savedTransactions) {
      try {
        const parsed = JSON.parse(savedTransactions);
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

    // 加载自定义分类
    const savedCategories = localStorage.getItem(STORAGE_KEYS.CUSTOM_CATEGORIES);
    if (savedCategories) {
      try {
        setCustomCategories(JSON.parse(savedCategories));
      } catch (e) {
        console.error('Failed to parse saved categories', e);
      }
    }
  }, []);

  // 保存数据到本地存储
  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
    }
  }, [transactions]);
  
  // 保存自定义分类到本地存储
  useEffect(() => {
    if (customCategories.length > 0) {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_CATEGORIES, JSON.stringify(customCategories));
    }
  }, [customCategories]);

  // 获取筛选后的交易
  const getFilteredTransactions = () => {
    const now = new Date();
    let startDate = new Date(0); // 默认最早时间
    
    // 根据时间范围筛选
    let filtered = [...transactions];
    
    switch (timeRange) {
      case 'week':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        filtered = filtered.filter(t => new Date(t.date) >= startDate);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        filtered = filtered.filter(t => new Date(t.date) >= startDate);
        break;
      case '3months':
        startDate = new Date(now.getFullYear(), now.getMonth() - 2, 1);
        filtered = filtered.filter(t => new Date(t.date) >= startDate);
        break;
      case '6months':
        startDate = new Date(now.getFullYear(), now.getMonth() - 5, 1);
        filtered = filtered.filter(t => new Date(t.date) >= startDate);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        filtered = filtered.filter(t => new Date(t.date) >= startDate);
        break;
      case 'lastYear':
        startDate = new Date(now.getFullYear() - 1, 0, 1);
        const endDate = new Date(now.getFullYear() - 1, 11, 31);
        filtered = filtered.filter(t => {
          const txDate = new Date(t.date);
          return txDate >= startDate && txDate <= endDate;
        });
        break;
      case 'all':
        // 不进行时间筛选
        break;
      default:
        break;
    }
    
    // 根据分类筛选
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(t => t.category === selectedCategory);
    }
    
    // 按日期倒序排序
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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
    const categories = getAllCategories(type);
    setFormData(prev => ({
      ...prev,
      type,
      category: categories.length > 0 ? categories[0].id : ''
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

  // 添加新分类
    // 生成随机颜色
  const getRandomColor = (type: 'income' | 'expense') => {
    // 收入类颜色：绿色和蓝色系
    const incomeColors = [
      '#10b981', // 绿色
      '#059669', // 深绿色
      '#0d9488', // 蓝绿色
      '#0d9488', // 青色
      '#0891b2', // 天蓝色
      '#0284c7', // 亮蓝色
      '#2563eb', // 宝蓝色
      '#3b82f6'  // 亮蓝色
    ];
    
    // 支出类颜色：红色、橙色和灰色系
    const expenseColors = [
      '#ef4444', // 红色
      '#dc2626', // 深红色
      '#ea580c', // 橙色
      '#d97706', // 琥珀色
      '#b91c1c', // 暗红色
      '#991b1b', // 深红
      '#9a3412', // 深橙色
      '#7c2d12', // 深琥珀色
      '#6b7280', // 灰色
      '#4b5563'  // 深灰色
    ];
    
    const colors = type === 'income' ? incomeColors : expenseColors;
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.name.trim()) return;
    
    const newCat: Category = {
      ...newCategory,
      id: `custom_${Date.now()}`,
      icon: getRandomColor(newCategory.type),
      isCustom: true
    };
    
    setCustomCategories([...customCategories, newCat]);
    setNewCategory({ name: '', type: 'expense' });
  };

  // 删除分类
  const handleDeleteCategory = (id: string) => {
    const categoryToDelete = [...DEFAULT_CATEGORIES, ...customCategories].find(c => c.id === id);
    if (!categoryToDelete) return;
    
    // 检查是否有交易使用此分类
    const transactionsWithThisCategory = transactions.filter(
      t => t.category === id
    );
    
    if (transactionsWithThisCategory.length > 0) {
      if (!window.confirm(
        `删除"${categoryToDelete.name}"分类后，${transactionsWithThisCategory.length}条相关记录的分类将变更为"其他"。确定要删除吗？`
      )) {
        return;
      }
      
      // 更新相关交易的分类为"其他"
      const updatedTransactions = transactions.map(t => 
        t.category === id ? { ...t, category: 'other' } : t
      );
      setTransactions(updatedTransactions);
    }
    
    // 从自定义分类中移除
    setCustomCategories(customCategories.filter(c => c.id !== id));
  };



  // 获取分类图标
  const getCategoryIcon = (type: TransactionType, categoryId: string, marginRight?: string) => {
    const allCategories = [...DEFAULT_CATEGORIES, ...customCategories];
    const category = allCategories.find(c => c.id === categoryId);
    console.log('category', category, typeof category?.icon);

    if (category?.icon && typeof category.icon === 'string') {
      console.log('return string category.icon', category.icon);
      return <span className="category-icon-span" style={{ backgroundColor: category.icon, marginRight: marginRight || '0' }}></span>;
    }
    console.log('return object category.icon');
    return category ? category.icon : <FaQuestionCircle />;
  };

  // 获取分类名称
  const getCategoryName = (type: TransactionType, categoryId: string) => {
    const allCategories = [...DEFAULT_CATEGORIES, ...customCategories];
    const category = allCategories.find(c => c.id === categoryId);
    return category ? category.name : '其他';
  };

  // 切换全屏
  const toggleFullscreen = () => {
    const container = document.querySelector('.smart-finance-container') as HTMLElement;
    const body = document.body;
    
    if (!isFullscreen) {
      container.classList.add('fullscreen');
      body.classList.add('fullscreen-mode');
    } else {
      container.classList.remove('fullscreen');
      body.classList.remove('fullscreen-mode');
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="smart-finance-container">
      <div className="smart-finance-tool-header">
        <div className="header-title">
          <h2>智能财务</h2>
          <button 
            className="fullscreen-toggle"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? '退出全屏' : '全屏显示'}
            title={isFullscreen ? '退出全屏' : '全屏显示'}
          >
            {isFullscreen ? <FaCompress /> : <FaExpand />}
          </button>
        </div>
        <p className="smart-finance-tool-description">
          记录您的每一笔收支，帮助您更好地管理个人财务。
        </p>
      </div>

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
        <div className="filter-group">
          <span className="filter-label">时间：</span>
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${timeRange === 'all' ? 'active' : ''}`}
              onClick={() => setTimeRange('all')}
            >
              全部
            </button>
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
              
          </div>
        </div>
        
        <div className="filter-group">
          <span className="filter-label">分类：</span>
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              全部
            </button>
            {/* 默认收入分类 */}
            {DEFAULT_CATEGORIES.filter(c => c.type === 'income').map(category => (
              <button
                key={category.id}
                className={`filter-btn ${selectedCategory === category.id ? 'active' : ''} income-category`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
            
            {/* 自定义收入分类 */}
            {customCategories.filter(c => c.type === 'income').map(category => (
              <button
                key={category.id}
                className={`filter-btn ${selectedCategory === category.id ? 'active' : ''} income-category`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
            
            {/* 默认支出分类 */}
            {DEFAULT_CATEGORIES.filter(c => c.type === 'expense').map(category => (
              <button
                key={category.id}
                className={`filter-btn ${selectedCategory === category.id ? 'active' : ''} expense-category`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
            
            {/* 自定义支出分类 */}
            {customCategories.filter(c => c.type === 'expense').map(category => (
              <button
                key={category.id}
                className={`filter-btn ${selectedCategory === category.id ? 'active' : ''} expense-category`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
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
            onClick={() => setIsCategoryManagerOpen(true)} 
            className="action-btn"
            title="管理分类"
          >
            <FaTags />
          </button>
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
                  {getCategoryIcon(transaction.type, transaction.category, '0.5rem')}
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
                  className="action-btn delete-btn" 
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
                  {getAllCategories(formData.type).map(category => (
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

      {/* 分类管理弹窗 */}
      {isCategoryManagerOpen && (
        <div className="modal-overlay" onClick={() => setIsCategoryManagerOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} ref={categoryManagerRef}>
            <div className="modal-header">
              <h3>管理分类</h3>
              <button 
                type="button" 
                onClick={() => setIsCategoryManagerOpen(false)} 
                className="close-button"
                aria-label="关闭弹窗"
                title="关闭"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="category-manager">
              <form onSubmit={handleAddCategory} className="add-category-form">
                <h4>添加新分类</h4>
                <div className="form-group">
                  <select
                    value={newCategory.type}
                    onChange={(e) => setNewCategory({...newCategory, type: e.target.value as TransactionType})}
                    required
                    aria-label="分类类型"
                    className="form-control"
                  >
                    <option value="expense">支出分类</option>
                    <option value="income">收入分类</option>
                  </select>
                  <input
                    type="text"
                    placeholder="输入分类名称"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                    required
                    aria-label="分类名称"
                    className="form-control"
                    maxLength={10}
                  />
                  <button type="submit" className="btn btn-primary" style={{ padding: '15px'}}>
                    <FaPlus /> 添加
                  </button>
                </div>
              </form>

              <div className="category-lists">
                <div className="category-list">
                  <h4><FaMoneyBillWave /> 收入分类</h4>
                  <ul>
                    {getAllCategories('income').length > 0 ? (
                      getAllCategories('income').map(category => (
                        <li key={category.id}>
                          <span className="category-icon">{getCategoryIcon(category.type, category.id)}</span>
                          <span className="category-name">{category.name}</span>
                          {category.isCustom && (
                            <button 
                              type="button"
                              className="delete-category"
                              onClick={() => handleDeleteCategory(category.id)}
                              title={`删除分类: ${category.name}`}
                              aria-label={`删除分类: ${category.name}`}
                            >
                              <FaTrash />
                            </button>
                          )}
                        </li>
                      ))
                    ) : (
                      <div className="empty-category">
                        <FaFolderOpen />
                        <p>暂无收入分类</p>
                      </div>
                    )}
                  </ul>
                </div>

                <div className="category-list">
                  <h4><FaShoppingCart /> 支出分类</h4>
                  <ul>
                    {getAllCategories('expense').length > 0 ? (
                      getAllCategories('expense').map(category => (
                        <li key={category.id}>
                          <span className="category-icon">{getCategoryIcon(category.type, category.id)}</span>
                          <span className="category-name">{category.name}</span>
                          {category.isCustom && (
                            <button 
                              type="button"
                              className="delete-category"
                              onClick={() => handleDeleteCategory(category.id)}
                              title={`删除分类: ${category.name}`}
                              aria-label={`删除分类: ${category.name}`}
                            >
                              <FaTrash />
                            </button>
                          )}
                        </li>
                      ))
                    ) : (
                      <div className="empty-category">
                        <FaFolderOpen />
                        <p>暂无支出分类</p>
                      </div>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
