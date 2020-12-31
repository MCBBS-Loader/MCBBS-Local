"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.regAll = exports.registryFunc = exports.run = exports.isAble = void 0;
const file_1 = __importDefault(require("./modules/file"));
const task_1 = __importDefault(require("./modules/task"));
const log4js_1 = require("log4js");
const info_1 = __importDefault(require("./modules/info"));
let FDT = new Map();
let LOGGER = log4js_1.getLogger("operator");
function getAll() {
    let gn = [];
    for (let n of FDT.keys()) {
        gn.push(n);
    }
    return gn;
}
function isAble(callName) {
    return typeof FDT.get(callName) == "function";
}
exports.isAble = isAble;
function run(req) {
    LOGGER.info(`已开始运行 ${req.call} 的操作……`);
    LOGGER.debug(`\n操作信息：\n调用：${req.call}\n参数：${req.data}`);
    req.state = "RUNNING";
    FDT.get(req.call)(req.data || {}, (state, res) => {
        if (state) {
            LOGGER.info(`操作 ${req.call} 成功完成了`);
            LOGGER.debug(`\n操作信息：\n调用：${req.call}\n参数：${req.data}`);
            req.state = "DONE";
            req.retValue(res);
        }
        else {
            LOGGER.warn(`操作 ${req.call} 未能完成`);
            LOGGER.warn(`\n操作信息：\n调用：${req.call}\n参数：${req.data}`);
            req.state = "FAILED";
            req.retValue(res);
        }
    }, (updata) => {
        req.retValue(updata);
    });
}
exports.run = run;
function registryFunc(callName, func) {
    FDT.set(callName, func);
}
exports.registryFunc = registryFunc;
function regAll() {
    file_1.default.reg();
    info_1.default.reg();
    task_1.default.reg();
}
exports.regAll = regAll;
registryFunc("getAllAPIs", getAll);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BlcmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL29wZXJhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSwwREFBa0M7QUFDbEMsMERBQWtDO0FBQ2xDLG1DQUFtQztBQUNuQywwREFBa0M7QUFDbEMsSUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNwQixJQUFJLE1BQU0sR0FBRyxrQkFBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ25DLFNBQVMsTUFBTTtJQUNiLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUNaLEtBQUssSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3hCLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDWjtJQUNELE9BQU8sRUFBRSxDQUFDO0FBQ1osQ0FBQztBQUNELFNBQVMsTUFBTSxDQUFDLFFBQWdCO0lBQzlCLE9BQU8sT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFVBQVUsQ0FBQztBQUNoRCxDQUFDO0FBbUNRLHdCQUFNO0FBbENmLFNBQVMsR0FBRyxDQUFDLEdBQW9CO0lBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQztJQUN2QyxNQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxDQUFDLElBQUksUUFBUSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUN4RCxHQUFHLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztJQUN0QixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FDZixHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFDZCxDQUFDLEtBQWMsRUFBRSxHQUFRLEVBQUUsRUFBRTtRQUMzQixJQUFJLEtBQUssRUFBRTtZQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQztZQUNwQyxNQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxDQUFDLElBQUksUUFBUSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUN4RCxHQUFHLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztZQUNuQixHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ25CO2FBQU07WUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUM7WUFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxJQUFJLFFBQVEsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFFdkQsR0FBRyxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7WUFDckIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNuQjtJQUNILENBQUMsRUFDRCxDQUFDLE1BQVcsRUFBRSxFQUFFO1FBQ2QsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN2QixDQUFDLENBQ0YsQ0FBQztBQUNKLENBQUM7QUFVZ0Isa0JBQUc7QUFUcEIsU0FBUyxZQUFZLENBQUMsUUFBZ0IsRUFBRSxJQUE2QjtJQUNuRSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBT3FCLG9DQUFZO0FBTmxDLFNBQVMsTUFBTTtJQUNiLGNBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNYLGNBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNYLGNBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNiLENBQUM7QUFFbUMsd0JBQU07QUFEMUMsWUFBWSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQyJ9