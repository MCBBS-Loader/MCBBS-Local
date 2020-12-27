import { existsSync, readFile } from "fs";
import { registryFunc } from "../operation";
function reg() {
  registryFunc("readFile", mReadFile);
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
