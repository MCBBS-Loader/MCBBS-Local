import { DeferredRequest } from "./request";
import file from "./modules/file";
import task from "./modules/task";
import { getLogger } from "log4js";
import info from "./modules/info";
let FDT = new Map();
let LOGGER = getLogger("operator");
function getAll() {
  let gn = [];
  for (let n of FDT.keys()) {
    gn.push(n);
  }
  return gn;
}
function isAble(callName: string): boolean {
  return typeof FDT.get(callName) == "function";
}
function run(req: DeferredRequest) {
  LOGGER.info(`已开始运行 ${req.call} 的操作……`);
  LOGGER.debug(`\n操作信息：\n调用：${req.call}\n参数：${req.data}`);
  req.state = "RUNNING";
  FDT.get(req.call)(
    req.data || {},
    (state: boolean, res: any) => {
      if (state) {
        LOGGER.info(`操作 ${req.call} 成功完成了`);
        LOGGER.debug(`\n操作信息：\n调用：${req.call}\n参数：${req.data}`);
        req.state = "DONE";
        req.retValue(res);
      } else {
        LOGGER.warn(`操作 ${req.call} 未能完成`);
        LOGGER.warn(`\n操作信息：\n调用：${req.call}\n参数：${req.data}`);

        req.state = "FAILED";
        req.retValue(res);
      }
    },
    (updata: any) => {
      req.retValue(updata);
    }
  );
}
function registryFunc(callName: string, func: (...args: any[]) => any) {
  FDT.set(callName, func);
}
function regAll() {
  file.reg();
  info.reg();
  task.reg();
}
registryFunc("getAllAPIs", getAll);
export { isAble, run, registryFunc, regAll };
