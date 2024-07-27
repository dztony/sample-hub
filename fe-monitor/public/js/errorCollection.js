/*
* 收集 页面错误
* 加载时机 - 需要在 header 中同步加载
* */

class ErrorCollection {
  constructor() {
    this.collectionType = 'error';
  }

  init() {
    window.addEventListener('error', (event) => {
      console.log('error event - ', event);
      this.uploadData({
        event: 'event_error_js_execute',
        desc: '代码执行报错',
        timestamp: new Date().getTime(),
        msg: event.message,
        filename: event.filename,
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      console.log('promise 报错 - ', event);
      this.uploadData({
        event: 'event_error_promise_unhandled_rejection',
        desc: 'promise 报错',
        timestamp: new Date().getTime(),
        msg: event.reason,
      });
    })
  }

  uploadData(params = {}) {
    requestIdleCallback(async() => {
      const apiUrl = 'http://localhost:3000/api/hello';
      const curParams = {
        ...params,
        collectionType: this.collectionType,
      };
      await fetch(apiUrl, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(curParams),
      });
    });
  }
}

const ErrorMonitor = new ErrorCollection();
ErrorMonitor.init();
