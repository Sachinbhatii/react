import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong loading this section.</h2>;
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
