import { Component, ReactNode, ErrorInfo } from "react";

export class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(`Error: ${error.message}`, error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return <div className="error-msg">Something went wrong</div>
    }
  }
}
