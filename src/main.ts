import log4js from "log4js";
import { savePIN, verifyPIN } from "./auth";
import { MCBBS_LOCAL } from "./manifest";
import { prompt } from "inquirer";
import { createHandler } from "./proxy";
import { getProperty } from "./native";
const LOGGER = log4js.getLogger("main");
LOGGER.level = "debug";
boot();

function boot() {
  LOGGER.info(`MCBBS Local 版本 ${MCBBS_LOCAL.VERSION} 正在启动……`);
  LOGGER.debug(`读取本地密钥中……`);
  if (verifyPIN("VERIFYPIN") != "NOT EXIST") {
    LOGGER.debug(`已加载密钥文件`);
    listen();
  } else {
    LOGGER.info(`没有找到有效的密钥文件，请为 MCBBS Local 设置一个密码。`);
    prompt([
      {
        name: "PIN",
        type: "input",
        default: "0000",
      },
    ]).then((val) => {
      if (val["PIN"]) {
        savePIN(val["PIN"]);
        LOGGER.info(`密钥已保存`);
      } else {
        savePIN("0000");
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
      var server = createHandler(0);
      setTimeout(() => {
        var pt;
        if (typeof server.address() == "string") {
          pt = server.address();
        } else {
          pt = getProperty(server.address(), "port");
        }
        LOGGER.warn(`MCBBS Local 正在备用端口 ${pt} 运行，按 Ctrl-C 退出`);
        LOGGER.warn(`您可能需要提供备用端口号来运行模块`);
      });
    } catch {
      LOGGER.fatal(`不可恢复错误：无可用端口或内部错误`);
      LOGGER.fatal(`MCBBS Local 将在 30 秒后退出，按 Ctrl-C 立即结束`);
      setTimeout(() => {
        server.close();
        process.exit();
      }, 30000);
    }
  });
  try {
    createHandler(4222);
    LOGGER.info(`MCBBS Local 正在端口 4222 运行，按 Ctrl-C 退出`);
  } catch {
    LOGGER.error(`4222 端口被占用，MCBBS Local 将尝试备用端口`);
    LOGGER.error(`某些模块可能无法支持备用端口连接`);
    try {
      var server = createHandler(0);
      setTimeout(() => {
        LOGGER.warn(
          `MCBBS Local 正在备用端口 ${getProperty(
            server.address(),
            "info"
          )} 运行，按 Ctrl-C 退出`
        );
        LOGGER.warn(`您可能需要提供备用端口号来运行模块`);
      }, 5000);
    } catch {
      LOGGER.fatal(`不可恢复错误：无可用端口或内部错误`);
      LOGGER.fatal(`MCBBS Local 将在 30 秒后退出，按 Ctrl-C 立即结束`);
      setTimeout(() => {
        server.close();
        process.exit();
      }, 30000);
    }
  }
}
