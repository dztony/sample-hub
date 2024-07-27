import React from 'react';

class ErrorBoundary extends React.PureComponent {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    // return { hasError: true };
    console.log('执行 getDerivedStateFromError');
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // 你同样可以将错误日志上报给服务器
    console.log('进行错误上报');
  }


  render() {
    if ((this.state as any).hasError) {
      return (
        <h1>
          页面报错
        </h1>
      );
    }

    return (this.props as any).children;
  }
}

export default ErrorBoundary;
