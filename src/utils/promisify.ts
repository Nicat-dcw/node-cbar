export function promisify<T extends (...args: any[]) => any>(
  fn: T,
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  function _promisify(...args: Parameters<T>): Promise<ReturnType<T>> {
    let promise = new Promise<ReturnType<T>>((resolve, reject) => {
      try {
        resolve(fn(...args));
      } catch (e) {
        reject(e);
      }
    });
    return promise;
  }

  return _promisify;
}
