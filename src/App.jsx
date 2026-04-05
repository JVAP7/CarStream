import React from 'react';
import Dashboard from './components/Dashboard';
import './index.css';

function App() {
  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo">
          <span className="logo-accent">Car</span>Stream
        </div>
      </nav>
      <main>
        <Dashboard />
      </main>
      <style>{`
        .app-container { min-height: 100vh; }
        .navbar {
          background: var(--primary-dark);
          color: white;
          padding: 1rem 2rem;
          display: flex;
          align-items: center;
          box-shadow: var(--shadow);
        }
        .logo { font-size: 1.5rem; font-weight: 800; letter-spacing: -0.5px; }
        .logo-accent { color: var(--secondary); }
        main { padding: 2rem; max-width: 1200px; margin: 0 auto; }
      `}</style>
    </div>
  );
}

export default App;
