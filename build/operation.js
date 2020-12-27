"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.regAll = exports.registryFunc = exports.run = exports.isAble = void 0;
const file_1 = __importDefault(require("./modules/file"));
const log4js_1 = require("log4js");
const info_1 = __importDefault(require("./modules/info"));
var FDT = new Map();
var LOGGER = log4js_1.getLogger("operator");
function isAble(callName) {
    if (typeof FDT.get(callName) == "function") {
        return true;
    }
    return false;
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
}
exports.regAll = regAll;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BlcmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL29wZXJhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSwwREFBa0M7QUFDbEMsbUNBQW1DO0FBQ25DLDBEQUFrQztBQUNsQyxJQUFJLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLElBQUksTUFBTSxHQUFHLGtCQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDbkMsU0FBUyxNQUFNLENBQUMsUUFBZ0I7SUFDOUIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksVUFBVSxFQUFFO1FBQzFDLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUE0QlEsd0JBQU07QUEzQmYsU0FBUyxHQUFHLENBQUMsR0FBb0I7SUFDL0IsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLENBQUMsSUFBSSxRQUFRLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3hELEdBQUcsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO0lBQ3RCLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBRSxFQUFFLENBQUMsS0FBYyxFQUFFLEdBQVEsRUFBRSxFQUFFO1FBQzdELElBQUksS0FBSyxFQUFFO1lBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDO1lBQ3BDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLENBQUMsSUFBSSxRQUFRLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3hELEdBQUcsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1lBQ25CLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDbkI7YUFBTTtZQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQztZQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLElBQUksUUFBUSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUV2RCxHQUFHLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztZQUNyQixHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ25CO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBU2dCLGtCQUFHO0FBUnBCLFNBQVMsWUFBWSxDQUFDLFFBQWdCLEVBQUUsSUFBNkI7SUFDbkUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQU1xQixvQ0FBWTtBQUxsQyxTQUFTLE1BQU07SUFDYixjQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDWCxjQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDYixDQUFDO0FBRW1DLHdCQUFNIn0=