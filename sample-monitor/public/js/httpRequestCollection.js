class HttpRequestCollection {
  constructor() {
    this.collectionType = 'http_request_monitor';
  }

  init() {

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

// const HttpRequestMonitor = new HttpRequestCollection();
// HttpRequestMonitor.init();
