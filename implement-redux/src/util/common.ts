export async function timeout(duration: number = 1.5): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve();
      } catch (e) {
        reject(e);
      }
    }, 1000 * duration)
  })
}
