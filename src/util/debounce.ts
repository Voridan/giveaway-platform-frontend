// TODO imlplement useDebounce hook

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function debounce(
  callback: (...args: any[]) => void | Promise<void>,
  delay: number
) {
  let timeoutId: number;
  return async (...args: any[]) => {
    console.log('changed');
    if (timeoutId !== undefined) clearTimeout(timeoutId);
    timeoutId = setTimeout(async () => {
      await callback(...args);
    }, delay);
  };
}
