import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import { useHistory } from '@docusaurus/router';
import { api } from '../utils/api';
import { encryptPassword } from '../utils/crypto';

const inputStyle = {
  width: '100%',
  padding: '0.75rem 1rem',
  borderRadius: '8px',
  border: '1px solid var(--ifm-color-emphasis-300)',
  fontSize: '1rem',
  transition: 'all 0.2s',
  backgroundColor: 'var(--ifm-background-surface-color)',
  color: 'var(--ifm-font-color-base)',
};

const focusStyle = {
  borderColor: 'var(--ifm-color-primary)',
  boxShadow: '0 0 0 2px var(--ifm-color-primary-lighter)',
  outline: 'none',
};

export default function Login(): JSX.Element {
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });
  const [validationErrors, setValidationErrors] = useState({
    username: '',
    password: '',
    email: '',
  });

  // Load saved credentials if remember me was enabled
  useEffect(() => {
    const savedUsername = localStorage.getItem('savedUsername') || '';
    const savedPassword = localStorage.getItem('savedPassword') || '';
    if (savedUsername && savedPassword) {
      setFormData(prev => ({
        ...prev,
        username: savedUsername,
        password: savedPassword
      }));
    }
  }, []); // Run only once on component mount

  const validatePassword = (password: string): string => {
    if (password.length < 8) return 'Password must be at least 8 characters long';
    if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
    if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
    if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
    if (!/[!@#$%^&*.]/.test(password)) return 'Password must contain at least one special character';
    return '';
  };

  const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate form
    const newValidationErrors = {
      username: formData.username.length < 3 ? 'Username must be at least 3 characters long' : '',
      password: validatePassword(formData.password),
      email: !isLogin ? validateEmail(formData.email) : '',
    };

    setValidationErrors(newValidationErrors);

    if (Object.values(newValidationErrors).some(error => error)) {
      return;
    }

    setLoading(true);

    try {
      // Encrypt password before sending to API
      const encryptedPassword = encryptPassword(formData.password);

      if (isLogin) {
        const response = await api.login(formData.username, encryptedPassword);
        if (response.code === 200) {
          // Store token and user data in localStorage
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          history.replace('/profile');
        } else {
          setError(response.message);
        }
      } else {
        const response = await api.register(formData.username, encryptedPassword, formData.email);
        if (response.code === 201) {
          setIsLogin(true);
          setError('Registration successful! Please log in.');
          setFormData({ ...formData, password: '' });
        } else {
          setError(response.message);
        }
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Layout title={isLogin ? "Welcome Back" : "Create Account"}>
      <div
        style={{
          minHeight: 'calc(100vh - var(--ifm-navbar-height))',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '2rem',
          paddingTop: '15vh',
          background: 'var(--ifm-background-surface-color)',
          backgroundImage: 'linear-gradient(180deg, var(--ifm-color-primary-lightest) 0%, var(--ifm-background-surface-color) 100%)',
          backgroundSize: '100% 40vh',
          backgroundRepeat: 'no-repeat',
        }}>
        <div style={{
          width: '100%',
          maxWidth: '400px',
          background: 'var(--ifm-background-color)',
          borderRadius: '16px',
          padding: '2.5rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ 
              fontSize: '2rem',
              marginBottom: '0.5rem',
              background: 'linear-gradient(120deg, var(--ifm-color-primary) 0%, var(--ifm-color-primary-dark) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p style={{ 
              color: 'var(--ifm-color-emphasis-600)',
              margin: 0,
            }}>
              {isLogin ? "Sign in to continue" : "Fill in your details to register"}
            </p>
          </div>

          {error && (
            <div style={{
              padding: '1rem',
              marginBottom: '1.5rem',
              borderRadius: '8px',
              backgroundColor: error.includes('successful') ? 'var(--ifm-color-success-contrast-background)' : 'var(--ifm-color-danger-contrast-background)',
              color: error.includes('successful') ? 'var(--ifm-color-success-darkest)' : 'var(--ifm-color-danger-darkest)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.9rem',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {error.includes('successful') ? (
                  <path d="M9 12l2 2 4-4" />
                ) : (
                  <path d="M12 8v4m0 4h.01" />
                )}
                <circle cx="12" cy="12" r="10" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label
                htmlFor="username"
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: 'var(--ifm-color-emphasis-700)',
                  fontSize: '0.9rem',
                }}>
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                style={{
                  ...inputStyle,
                  borderColor: validationErrors.username ? 'var(--ifm-color-danger)' : inputStyle.borderColor,
                }}
                onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                placeholder="Enter your username"
              />
              {validationErrors.username && (
                <div style={{ color: 'var(--ifm-color-danger)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                  {validationErrors.username}
                </div>
              )}
            </div>

            {!isLogin && (
              <div>
                <label
                  htmlFor="email"
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    color: 'var(--ifm-color-emphasis-700)',
                    fontSize: '0.9rem',
                  }}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    ...inputStyle,
                    borderColor: validationErrors.email ? 'var(--ifm-color-danger)' : inputStyle.borderColor,
                  }}
                  onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                  placeholder="Enter your email"
                />
                {validationErrors.email && (
                  <div style={{ color: 'var(--ifm-color-danger)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                    {validationErrors.email}
                  </div>
                )}
              </div>
            )}

            <div style={{ position: 'relative' }}>
              <label
                htmlFor="password"
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: 'var(--ifm-color-emphasis-700)',
                  fontSize: '0.9rem',
                }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={{
                    ...inputStyle,
                    borderColor: validationErrors.password ? 'var(--ifm-color-danger)' : inputStyle.borderColor,
                    paddingRight: '2.5rem',
                  }}
                  onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.25rem',
                    color: 'var(--ifm-color-emphasis-600)',
                  }}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {validationErrors.password && (
                <div style={{ color: 'var(--ifm-color-danger)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                  {validationErrors.password}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: 'var(--ifm-color-primary)',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {loading ? (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}>
                  <div style={{
                    width: '1rem',
                    height: '1rem',
                    border: '2px solid white',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                  }} />
                  Processing...
                </div>
              ) : (
                isLogin ? "Sign In" : "Create Account"
              )}
            </button>

            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setFormData({ username: '', password: '', email: '' });
                  setValidationErrors({ username: '', password: '', email: '' });
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--ifm-color-primary)',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                }}
              >
                {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </Layout>
  );
}
