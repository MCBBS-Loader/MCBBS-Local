import { registryFunc } from "../operation";
import { MCBBS_LOCAL } from "../manifest";
function reg() {
  registryFunc("getVersion", getVersion);
}
function getVersion(data: any, cb: (state: boolean, res: any) => void) {
  cb(true, MCBBS_LOCAL.VERSION);
}
export default { reg };
