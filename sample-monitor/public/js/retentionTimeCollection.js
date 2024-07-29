/*
* 收集 页面停留时间
* 加载时机 - 需要在 header 中同步加载
* */
class RetentionTimeCollection {
  constructor() {
    this.lastVisibleTimestamp = new Date().getTime();
    this.collectionType = 'retentionTime';
  }
  init() {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        const curHiddenTimestamp = new Date().getTime();
        const curRetentionTime = curHiddenTimestamp - this.lastVisibleTimestamp;
        this.uploadData({
          event: 'event_visibilityState',
          desc: '用户离开页面 - 隐藏、切换 tab',
          retentionTime: curRetentionTime,
          timestamp: new Date().getTime(),
          collectionType: this.collectionType,
        });
      }

      if (document.visibilityState === 'visible') {
        this.lastVisibleTimestamp = new Date().getTime();
      }
    })
  }

  uploadData(params = {}) {
    requestIdleCallback(async() => {
      const apiUrl = 'http://localhost:3000/api/hello';
      await fetch(apiUrl, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
    });
  }

}

const RetentionMonitor = new RetentionTimeCollection();
RetentionMonitor.init();
