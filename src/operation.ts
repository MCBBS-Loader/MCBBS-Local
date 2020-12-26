var FDT = new Map();
function isAble(callName: string): boolean {
  if (typeof FDT.get(callName) == "function") {
    return true;
  }
  return false;
}
function runSync(callName: string, data: any) {
  return FDT.get(callName)(data);
}
function run(callName: string, data: any, cb: (res: any) => void) {
  FDT.get(callName)(data, cb);
}
function registryFunc(callName: string, func: (...args: any[]) => any) {
  FDT.set(callName, func);
}
export { isAble, run, runSync, registryFunc };
