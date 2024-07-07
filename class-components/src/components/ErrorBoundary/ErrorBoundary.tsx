import { Component, ReactNode, ErrorInfo } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState | undefined {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(`Error: ${error.message}`, error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return <div className="error-msg">Something went wrong</div>
    }
    return this.props.children as ReactNode;
  }
}
