/*
* 收集 页面错误
* 加载时机 - 异步加载、或者在 body 底部加载
* */

class ClickCollection {
  constructor() {
    this.collectionType = 'click';
  }

  init() {
    window.addEventListener('click', (event) => {
      const dom = event.target;
      console.log('dom - ', dom.getAttribute('id'), event);
      const id = dom.getAttribute('id');
      this.uploadData({
        event: 'click',
        targetId: id,
        desc: '点击事件。如果禁用冒泡，则全局无法监听',
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

const ClickMonitor = new ClickCollection();
ClickMonitor.init();
