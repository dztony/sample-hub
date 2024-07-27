function operateDom(): void {
  const dom = document.createElement('div');
  dom.innerText = 'value by util.ts file666000';
  document.body.appendChild(dom);
}

setTimeout(() => {
  operateDom();
}, 1000 * 1.5);

// if (import.meta.hot) {
//   import.meta.hot.accept((newModule) => {
//     if (newModule) {
//       console.log('update - ', newModule);
//     }
//   });
// }
