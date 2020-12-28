import { EventEmitter } from "events";
import { PonyDown } from "./ponydown";

function download(
  data: any,
  cb: (state: boolean, res: any) => void,
  update: (rdata: any) => void
) {
  var flist = data["files"];
  var gflist = [];
  for (var obj of flist) {
    if (typeof obj["url"] == "string" && typeof obj["pt"] == "string") {
      gflist.push(obj);
    }
  }
  var threads = data["threads"] || 2;
  var emitter = new EventEmitter();
  var mgr = new PonyDown(flist, threads, emitter);
  emitter.on("IRQ_DM_DONE", (failedCount) => {
    cb(true, {
      failed: failedCount,
      passed: flist.length - failedCount,
    });
  });
  emitter.on("IRQ_DM_UPDATE", (resolved: number, all: number) => {
    update({
      processed: resolved,
      all: all,
    });
  });
  mgr.start();
}
/*
Like this...
{
    pt: "Where should I save this file...",
    url: "Download from here..."
}
*/
