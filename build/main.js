"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log4js_1 = __importDefault(require("log4js"));
const auth_1 = require("./auth");
const manifest_1 = require("./manifest");
const inquirer_1 = require("inquirer");
const proxy_1 = require("./proxy");
const native_1 = require("./native");
const LOGGER = log4js_1.default.getLogger("main");
LOGGER.level = "debug";
boot();
function boot() {
    LOGGER.info(`MCBBS Local 版本 ${manifest_1.MCBBS_LOCAL.VERSION} 正在启动……`);
    LOGGER.debug(`读取本地密钥中……`);
    if (auth_1.verifyPIN("VERIFYPIN") != "NOT EXIST") {
        LOGGER.debug(`已加载密钥文件`);
        listen();
    }
    else {
        LOGGER.info(`没有找到有效的密钥文件，请为 MCBBS Local 设置一个密码。`);
        inquirer_1.prompt([
            {
                name: "PIN",
                type: "input",
                default: "0000",
            },
        ]).then((val) => {
            if (val["PIN"]) {
                auth_1.savePIN(val["PIN"]);
                LOGGER.info(`密钥已保存`);
            }
            else {
                auth_1.savePIN("0000");
                LOGGER.warn(`未设置有效密钥，已将密钥设为 0000`);
            }
            listen();
        });
    }
}
function listen() {
    process.on("uncaughtException", (e) => {
        LOGGER.error(`4222 端口被占用，MCBBS Local 将尝试备用端口`);
        LOGGER.error(`某些模块可能无法支持备用端口连接`);
        try {
            var server = proxy_1.createHandler(0);
            setTimeout(() => {
                var pt;
                if (typeof server.address() == "string") {
                    pt = server.address();
                }
                else {
                    pt = native_1.getProperty(server.address(), "port");
                }
                LOGGER.warn(`MCBBS Local 正在备用端口 ${pt} 运行，按 Ctrl-C 退出`);
                LOGGER.warn(`您可能需要提供备用端口号来运行模块`);
            });
        }
        catch (_a) {
            LOGGER.fatal(`不可恢复错误：无可用端口或内部错误`);
            LOGGER.fatal(`MCBBS Local 将在 30 秒后退出，按 Ctrl-C 立即结束`);
            setTimeout(() => {
                server.close();
                process.exit();
            }, 30000);
        }
    });
    try {
        proxy_1.createHandler(4222);
        LOGGER.info(`MCBBS Local 正在端口 4222 运行，按 Ctrl-C 退出`);
    }
    catch (_a) {
        LOGGER.error(`4222 端口被占用，MCBBS Local 将尝试备用端口`);
        LOGGER.error(`某些模块可能无法支持备用端口连接`);
        try {
            var server = proxy_1.createHandler(0);
            setTimeout(() => {
                LOGGER.warn(`MCBBS Local 正在备用端口 ${native_1.getProperty(server.address(), "info")} 运行，按 Ctrl-C 退出`);
                LOGGER.warn(`您可能需要提供备用端口号来运行模块`);
            }, 5000);
        }
        catch (_b) {
            LOGGER.fatal(`不可恢复错误：无可用端口或内部错误`);
            LOGGER.fatal(`MCBBS Local 将在 30 秒后退出，按 Ctrl-C 立即结束`);
            setTimeout(() => {
                server.close();
                process.exit();
            }, 30000);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0RBQTRCO0FBQzVCLGlDQUE0QztBQUM1Qyx5Q0FBeUM7QUFDekMsdUNBQWtDO0FBQ2xDLG1DQUF3QztBQUN4QyxxQ0FBdUM7QUFFdkMsTUFBTSxNQUFNLEdBQUcsZ0JBQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDeEMsTUFBTSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7QUFDdkIsSUFBSSxFQUFFLENBQUM7QUFFUCxTQUFTLElBQUk7SUFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixzQkFBVyxDQUFDLE9BQU8sU0FBUyxDQUFDLENBQUM7SUFDNUQsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMxQixJQUFJLGdCQUFTLENBQUMsV0FBVyxDQUFDLElBQUksV0FBVyxFQUFFO1FBQ3pDLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEIsTUFBTSxFQUFFLENBQUM7S0FDVjtTQUFNO1FBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1FBQ2xELGlCQUFNLENBQUM7WUFDTDtnQkFDRSxJQUFJLEVBQUUsS0FBSztnQkFDWCxJQUFJLEVBQUUsT0FBTztnQkFDYixPQUFPLEVBQUUsTUFBTTthQUNoQjtTQUNGLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNkLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNkLGNBQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUN0QjtpQkFBTTtnQkFDTCxjQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2hCLE1BQU0sQ0FBQyxJQUFJLENB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