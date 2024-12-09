export const debounce = <T extends (...args: any[]) => any>(
  callback: T,
  timeout: number,
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      callback(...args);
    }, timeout);
  };
};
