export type RecycleTimeoutExecutor = {
  (next: () => void): void;
};

export type RecycleTimeoutOptions = {
  immediate: boolean;
};

export function recycleTimeout(
  fn: RecycleTimeoutExecutor,
  seconds: number,

  options: RecycleTimeoutOptions = {
    immediate: false
  }
) {
  let timeout: number | undefined = void 0;

  const start = (immediate = false) => {
    if (immediate) {
      fn(start);
    } else {
      timeout = window.setTimeout(() => {
        fn(start);
      }, seconds);
    }
  };

  const stop = () => {
    clearTimeout(timeout);
  };

  if (options.immediate) {
    fn(start);
  }

  return {
    start,
    stop
  };
}
