import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

class AppErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('App render failed', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <main className="boot-fallback">
          <strong>页面加载遇到问题</strong>
          <span>请刷新页面，或换用系统浏览器打开链接。</span>
        </main>
      );
    }

    return this.props.children;
  }
}

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <AppErrorBoundary>
        <App />
      </AppErrorBoundary>
    </React.StrictMode>
  );
}
