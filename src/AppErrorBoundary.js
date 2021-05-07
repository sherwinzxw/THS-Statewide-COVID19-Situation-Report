import * as React from 'react'

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, errorMessage: error.message }
  }

  /*componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }*/

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <p className="AppErrorBoundary">{this.state.errorMessage}</p>
    }

    return this.props.children
  }
}

export default AppErrorBoundary
