import React from 'react';
import { trackError } from '../utils/analytics';

interface Props {
  children: React.ReactNode;
  FallbackComponent?: React.ComponentType<{ error: Error; resetErrorBoundary: () => void }>;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    trackError('error_boundary', error.message || 'Unknown error', errorInfo.componentStack || 'Unknown location');
  }

  resetErrorBoundary = () => {
    this.setState({
      hasError: false,
      error: null
    });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.FallbackComponent) {
        return <this.props.FallbackComponent 
          error={this.state.error} 
          resetErrorBoundary={this.resetErrorBoundary} 
        />;
      }

      return (
        <div className="min-h-screen w-full bg-black flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-[#232136]/40 backdrop-blur-sm p-8 rounded-xl border border-[#00FFFF]/20 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
            <h2 className="text-[#00FFFF] text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="text-white mb-6">
              The application encountered an unexpected error. Please try refreshing the page.
            </p>
            <div className="flex gap-4">
              <button
                onClick={this.resetErrorBoundary}
                className="px-4 py-2 bg-[#008080] text-white rounded-lg hover:bg-[#008080]/80 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 border border-[#00FFFF] text-[#00FFFF] rounded-lg hover:bg-[#00FFFF]/10 transition-colors"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 