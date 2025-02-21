import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import { useHistory } from '@docusaurus/router';
import { api } from '../utils/api';

const ProfileCard = ({ label, value, icon }: { label: string; value: string; icon: string }) => (
  <div style={{
    background: 'var(--ifm-background-surface-color)',
    borderRadius: '12px',
    padding: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      borderRadius: '10px',
      background: 'var(--ifm-color-primary-lighter)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
    }}>
      {icon}
    </div>
    <div>
      <div style={{ fontSize: '0.875rem', color: 'var(--ifm-color-emphasis-600)', marginBottom: '0.25rem' }}>
        {label}
      </div>
      <div style={{ fontSize: '1.125rem', fontWeight: '500' }}>
        {value}
      </div>
    </div>
  </div>
);

export default function Profile(): JSX.Element {
  const history = useHistory();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      history.replace('/login');
      return;
    }
    setUserData(JSON.parse(user));
  }, [history]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    history.replace('/login');
  };

  if (!userData) {
    return null;
  }

  return (
    <Layout title="Profile">
      <div style={{
        minHeight: 'calc(100vh - var(--ifm-navbar-height))',
        background: 'var(--ifm-background-color)',
        backgroundImage: 'linear-gradient(180deg, var(--ifm-color-primary-lightest) 0%, var(--ifm-background-color) 100%)',
        backgroundSize: '100% 30vh',
        backgroundRepeat: 'no-repeat',
        padding: '2rem',
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}>
          {/* Profile Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            background: 'var(--ifm-background-color)',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          }}>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'var(--ifm-color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              color: 'white',
              fontWeight: 'bold',
            }}>
              {userData.username.charAt(0).toUpperCase()}
            </div>
            <div style={{ flex: 1 }}>
              <h1 style={{ 
                fontSize: '2rem',
                marginBottom: '0.5rem',
                background: 'linear-gradient(120deg, var(--ifm-color-primary) 0%, var(--ifm-color-primary-dark) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                {userData.username}
              </h1>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                color: 'var(--ifm-color-emphasis-600)',
              }}>
                <span>Role: {userData.role}</span>
                <span>•</span>
                <span>Member since {new Date().getFullYear()}</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                border: '2px solid var(--ifm-color-danger)',
                background: 'transparent',
                color: 'var(--ifm-color-danger)',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'var(--ifm-color-danger)';
                e.currentTarget.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--ifm-color-danger)';
              }}
            >
              Sign Out
            </button>
          </div>

          {/* Profile Information */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
          }}>
            <ProfileCard
              label="Username"
              value={userData.username}
              icon="👤"
            />
            <ProfileCard
              label="Email"
              value={userData.email}
              icon="📧"
            />
            <ProfileCard
              label="Role"
              value={userData.role}
              icon="🔑"
            />
          </div>

          {/* Additional Information */}
          <div style={{
            background: 'var(--ifm-background-color)',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          }}>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Account Settings</h2>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                borderRadius: '8px',
                background: 'var(--ifm-background-surface-color)',
              }}>
                <div>
                  <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>Two-Factor Authentication</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--ifm-color-emphasis-600)' }}>Add an extra layer of security to your account</div>
                </div>
                <button
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    border: '1px solid var(--ifm-color-primary)',
                    background: 'transparent',
                    color: 'var(--ifm-color-primary)',
                    cursor: 'pointer',
                  }}
                >
                  Enable
                </button>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                borderRadius: '8px',
                background: 'var(--ifm-background-surface-color)',
              }}>
                <div>
                  <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>Email Notifications</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--ifm-color-emphasis-600)' }}>Manage your email notification preferences</div>
                </div>
                <button
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    border: '1px solid var(--ifm-color-primary)',
                    background: 'transparent',
                    color: 'var(--ifm-color-primary)',
                    cursor: 'pointer',
                  }}
                >
                  Configure
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
