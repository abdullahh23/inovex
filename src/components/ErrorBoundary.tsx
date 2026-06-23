import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Global Error Boundary — catches any unhandled React render errors
 * and shows a clean fallback instead of a blank white screen.
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    // In production this would send to Sentry / logging service
    // console.error is intentionally omitted to avoid leaking info to users
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0d1a2e',
            fontFamily: "'Inter', system-ui, sans-serif",
            padding: '24px',
          }}
        >
          <div
            style={{
              maxWidth: '480px',
              width: '100%',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '20px',
              padding: '40px',
              textAlign: 'center',
              color: '#fff',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                background: 'rgba(239,68,68,0.15)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: '28px',
              }}
            >
              ⚠️
            </div>
            <h1 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>
              Something went wrong
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.6, marginBottom: '28px' }}>
              An unexpected error occurred. Your data is safe — please reload the page.
            </p>
            <button
              onClick={this.handleReset}
              style={{
                background: 'linear-gradient(135deg, #1d55b0, #2563eb)',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 32px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                width: '100%',
              }}
            >
              Reload App
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
