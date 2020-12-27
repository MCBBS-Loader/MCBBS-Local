import { existsSync, readFile, writeFile } from "fs";
import { registryFunc } from "../operation";
function reg() {
  registryFunc("readFile", mReadFile);
  registryFunc("writeFile", mWriteFile);
}
function mWriteFile(data: any, cb: (state: boolean, res: any) => void) {
  if (data["path"] == undefined || data["data"] == undefined) {
    cb(false, "Missing path or data");
    return;
  } else {
    writeFile(data["path"], data["data"], (e) => {
      if (e) {
        cb(false, e);
      } else {
        cb(true, null);
      }
    });
  }
}
function mReadFile(data: any, cb: (state: boolean, res: any) => void) {
  if (data["path"] == undefined) {
    cb(false, "No path provided");
    return;
  } else {
    if (!existsSync(data["path"])) {
      cb(false, "Not found");
    } else {
      readFile(data["path"], (e, d) => {
        if (e) {
          cb(false, e);
        } else {
          cb(true, d);
        }
      });
    }
  }
}
export default { reg };
