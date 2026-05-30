import React, { useState } from 'react';

const LoginPage = ({ onLogin }: { onLogin: (token: string) => void }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const url = isLogin 
      ? 'http://localhost:5000/api/auth/login' 
      : 'http://localhost:5000/api/auth/register';

    const body = isLogin ? { email, password } : { name, email, password };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      
      const data = await res.json();

      if (res.ok) {
        onLogin(data.token);
      } else {
        setError(data.message || 'Authentication failed');
      }
    } catch (err: any) {
      setError(err.message || 'Network error');
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'var(--bg-primary)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '1.5rem',
      backgroundImage: 'radial-gradient(circle at 50% -20%, var(--accent-primary-transparent) 0%, transparent 50%)'
    }}>
      <div style={{ 
        background: 'var(--bg-secondary)', 
        border: '1.5px solid var(--border-color)', 
        borderRadius: '24px', 
        maxWidth: '420px', 
        width: '100%', 
        padding: '3rem 2rem', 
        position: 'relative',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, letterSpacing: '-0.5px' }}>
            QUICK<span style={{ color: 'var(--accent-primary)' }}>CART</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Premium Express Delivery
          </p>
        </div>

        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center', fontSize: '1.25rem' }}>
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        
        {error && <div style={{ color: 'var(--accent-rose)', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem', background: 'rgba(244, 63, 94, 0.1)', padding: '0.75rem', borderRadius: '8px' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {!isLogin && (
            <input 
              type="text" 
              placeholder="Full Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              style={{ padding: '0.9rem 1rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none' }}
            />
          )}
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ padding: '0.9rem 1rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none' }}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ padding: '0.9rem 1rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none' }}
          />
          
          <button type="submit" style={{ 
            background: 'var(--accent-primary)', 
            color: 'white', 
            padding: '1rem', 
            borderRadius: '12px', 
            border: 'none', 
            fontWeight: 'bold', 
            cursor: 'pointer', 
            marginTop: '0.5rem', 
            boxShadow: 'var(--glow-primary)',
            fontSize: '1rem',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {isLogin ? 'Login to QuickCart' : 'Sign Up'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', fontWeight: 'bold', cursor: 'pointer' }}>
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
