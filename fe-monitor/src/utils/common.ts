export async function timeout(number = 1.5): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve();
      } catch (e) {
        reject(e);
      }
    }, 1000 * number);
  })
}

export function testExecuteError() {
  // @ts-ignore
  return m;
}

export function testPromiseError() {
  return Promise.reject('test promise error');
}
