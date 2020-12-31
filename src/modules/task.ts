import { spawn } from "child_process";
import { registryFunc } from "../operation";
function reg() {
  registryFunc("spawn", mSpawn);
}
function mSpawn(
  data: any,
  cb: (state: boolean, res: any) => void,
  update: (dt: any) => void
) {
  let log: any[] = [];
  if (data["args"] == undefined || data["run"] == undefined) {
    cb(false, "Missing path or args");
  } else {
    let proc = spawn(data["run"], data["args"]);
    proc.stdout.on("data", (e) => {
      log.push(e.toString());
      update(log);
    });
    proc.stderr.on("data", (e) => {
      log.push(e.toString());
      update(log);
    });
    proc.stdout.on("error", (e) => {
      log.push(e.message);
      update(log);
    });
    proc.stderr.on("error", (e) => {
      log.push(e.message);
      update(log);
    });
    proc.on("close", (code) => {
      log.push("Process ended with exit code " + code);
      if (code != 0) {
        cb(false, log);
      } else {
        cb(true, log);
      }
    });
  }
}
export default { reg };
