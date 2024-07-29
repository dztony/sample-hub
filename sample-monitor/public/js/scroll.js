let timestampList = [];
let lastOne = 0;
const minInterval = 500; // ms

function main() {
  console.log('*****scroll.js 加载开始 - ', new Date().getTime());
  window.addEventListener('scroll', (...args) => {
    console.log('scroll 事件触发');
    const idList = [
      'id-home-block2',
      // 'id-home-block3',
      // 'id-home-block4',
      // 'id-home-block5',
    ];
    for (const item of idList) {
      const curDom = document.getElementById(item);
      if (isLooking(curDom)) {
        console.log('正在观看 - ', item);
        const curTimestamp = new Date().getTime();
        if (curTimestamp - lastOne > minInterval) {
          lastOne = curTimestamp;
          timestampList.push(curTimestamp);
          console.log('timestampList - ', timestampList);
        }
      }
    }
  })

  console.log('******scroll.js 加载结束 - ', new Date().getTime());
}

function uploadData(params = {}) {
  requestIdleCallback(async() => {
    const apiUrl = 'http://localhost:3000/api/hello';
    await fetch(apiUrl, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    console.log('发送事件 - ', params.event);
  });
}

const viewportWidth = window.innerWidth
const viewportHeight = window.innerHeight

// dom 对象是否在屏幕内
function isInScreen(dom) {
  const rectInfo = dom.getBoundingClientRect();
  if (
    rectInfo.left >= 0
    && rectInfo.left < viewportWidth
    && rectInfo.top >= 0
    && rectInfo.top < viewportHeight
  ) {
    return true
  }
}

function isLooking(dom) {
  const rectInfo = dom.getBoundingClientRect();
  const domHeight = parseInt(rectInfo.height);
  const bottomDistance = parseInt(rectInfo.bottom);
  // console.log('bottomDistance - ', bottomDistance);
  return bottomDistance <= (50 + domHeight) && bottomDistance >= parseInt(domHeight / 2);
}

main();
