import { registryFunc } from "../operation";
import { MCBBS_LOCAL } from "../manifest";
import { platform } from "os";
function reg() {
  registryFunc("getVersion", getVersion);
  registryFunc("getOS", getOS);
}
function getVersion(data: any, cb: (state: boolean, res: any) => void) {
  cb(true, MCBBS_LOCAL.VERSION);
}
function getOS(data: any, cb: (state: boolean, res: any) => void) {
  cb(true, platform());
}
export default { reg };
