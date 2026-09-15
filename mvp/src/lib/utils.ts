export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function clsx(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}
