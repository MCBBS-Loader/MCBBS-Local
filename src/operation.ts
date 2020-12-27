import { DeferredRequest } from "./request";
import file from "./modules/file";
import { getLogger } from "log4js";
import info from "./modules/info";
var FDT = new Map();
var LOGGER = getLogger("operator");
function isAble(callName: string): boolean {
  if (typeof FDT.get(callName) == "function") {
    return true;
  }
  return false;
}
function run(req: DeferredRequest) {
  LOGGER.info(`已开始运行 ${req.call} 的操作……`);
  LOGGER.debug(`\n操作信息：\n调用：${req.call}\n参数：${req.data}`);
  req.state = "RUNNING";
  FDT.get(req.call)(req.data || {}, (state: boolean, res: any) => {
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
  });
}
function registryFunc(callName: string, func: (...args: any[]) => any) {
  FDT.set(callName, func);
}
function regAll() {
  file.reg();
  info.reg();
}

export { isAble, run, registryFunc, regAll };
