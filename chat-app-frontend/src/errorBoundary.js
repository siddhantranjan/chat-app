import React from "react";

export class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { error: null, errorInfo: null, hasError: false };
    }

    static getDerivedStateFromError(error){
      return {
        hasError: true
      }
    }
    
    componentDidCatch(error, errorInfo) {
     this.setState({
        error: error,
        errorInfo: errorInfo
      });
    }
    
    render() {
      if (this.state.hasError) {
        return (
          <div>
            <h2>Something went wrong</h2>
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </details>
          </div>
        );
      }
      // Render children if there's no error
      return this.props.children;
    }  
  }