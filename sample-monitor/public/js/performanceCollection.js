class PerformanceCollection {
  constructor() {
    this.collectionType = 'performance';
  }

  init() {
    // document.addEventListener('visibilitychange', () => {
    //   if (document.visibilityState === 'hidden') {
    //     this.uploadData({
    //       event: 'event_performance',
    //       timestamp: new Date().getTime(),
    //     });
    //   }
    // });

    window.addEventListener('load', (event) => {
      this.uploadData({
        event: 'event_performance',
        desc: '页面完全加载后触发的事件上报',
        timestamp: new Date().getTime(),
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

const PerformanceMonitor = new PerformanceCollection();
PerformanceMonitor.init();
