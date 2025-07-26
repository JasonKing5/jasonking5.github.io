import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faUser, faRotate } from '@fortawesome/free-solid-svg-icons';

interface StatsData {
  pageviews: { value: number };
  visitors: { value: number };
  visits: { value: number };
}

const analyticsServerUrl = 'http://localhost:4002';

const AnalyticsStats: React.FC = () => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${analyticsServerUrl}/api/visitors`, {
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error('Error fetching Analytics stats:', err);
        setError('加载失败');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) return <div style={{ textAlign: 'center', padding: '10px 0' }}>加载中...</div>;
  if (error) return <div style={{ textAlign: 'center', color: 'red' }}>{error}</div>;
  if (!stats) return null;

  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px',
      fontSize: '14px',
      backgroundColor: '#303846',
      color: '#fff',
      padding: '0.5rem 0'
    }}>
      <span>
        本站总浏览量
        <FontAwesomeIcon icon={faEye} style={{ margin: '0 4px' }} />
        {formatNumber(stats.pageviews.value)}
      </span>
      <span>|</span>
      <span>
        独立访客
        <FontAwesomeIcon icon={faUser} style={{ margin: '0 4px' }} />
        {formatNumber(stats.visitors.value)}
      </span>
      <span>|</span>
      <span>
        访问次数
        <FontAwesomeIcon icon={faRotate} style={{ margin: '0 4px' }} />
        {formatNumber(stats.visits.value)}
      </span>
    </div>
  );
};

export default AnalyticsStats;
