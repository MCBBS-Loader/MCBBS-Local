import { existsSync, readdir, readFile, unlink, writeFile } from "fs";
import { registryFunc } from "../operation";
import { getDeleteDir } from "../native";
import StreamZip from "node-stream-zip";
function reg() {
  registryFunc("readFile", mReadFile);
  registryFunc("writeFile", mWriteFile);
  registryFunc("readDir", mReadDir);
  registryFunc("deleteDir", mDeleteDir);
  registryFunc("deleteFile", mDeleteFile);
  registryFunc("unzip", unzip);
}
function unzip(data: any, cb: (state: boolean, res: any) => void) {
  if (data["from"] == undefined || data["to"] == undefined) {
    cb(false, "Missing path");
    return;
  } else {
    let zip = new StreamZip({
      file: data["from"],
      storeEntries: true,
    });
    zip.on("error", (e) => {
      cb(false, e);
    });
    zip.on("ready", () => {
      zip.extract(null, data["to"], (e) => {
        if (e) {
          cb(false, e);
        } else {
          cb(true, null);
        }
      });
    });
  }
}
function mDeleteDir(data: any, cb: (state: boolean, res: any) => void) {
  if (data["path"] == undefined) {
    cb(false, "Missing path");
    return;
  } else {
    let deleteDir = getDeleteDir();
    deleteDir({ root: data["path"] })
      .then(() => {
        cb(true, null);
      })
      .catch((e: any) => {
        cb(false, e);
      });
  }
}
function mDeleteFile(data: any, cb: (state: boolean, res: any) => void) {
  if (data["path"] == undefined) {
    cb(false, "Missing path");
    return;
  } else {
    unlink(data["path"], (e) => {
      if (e) {
        cb(false, e);
      } else {
        cb(true, null);
      }
    });
  }
}
function mReadDir(data: any, cb: (state: boolean, res: any) => void) {
  if (data["path"] == undefined) {
    cb(false, "Missing path");
    return;
  } else {
    readdir(data["path"], (e, files) => {
      if (e) {
        cb(false, e);
      } else {
        cb(true, files);
      }
    });
  }
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
