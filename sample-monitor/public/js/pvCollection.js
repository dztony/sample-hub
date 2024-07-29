/*
* 收集 PV
* 加载时机 - 需要在 header 中同步加载
* */
class PvCollection {
  constructor() {
    this.collectionType = 'pv';
  }

  init() {
    document.addEventListener('DOMContentLoaded', (...args) => {
      this.uploadData({
        event: 'event_DOMContentLoaded',
        desc: 'dom 解析完成',
        timestamp: new Date().getTime(),
        ua: window.navigator.userAgent,
      });
    });

    window.addEventListener('load', () => {
      this.uploadData({
        event: 'event_load',
        desc: '页面所有资源加载完成',
        timestamp: new Date().getTime(),
        ua: window.navigator.userAgent,
      });
    });
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

const PvMonitor = new PvCollection();
PvMonitor.init();
