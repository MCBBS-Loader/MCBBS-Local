import wget from "wget-improved";
import * as fs from "fs";
import path from "path";
import { EventEmitter } from "events";
class PonyTask {
  downloaded = 0;
  failed = 0;
  findex = 0;
  emitter: EventEmitter;
  dlist: any;
  constructor(dlistIn: any, emitterIn: EventEmitter) {
    this.dlist = dlistIn;
    this.emitter = emitterIn;
  }
  start() {
    downloadNext(this);
  }
  done() {
    this.emitter.emit("IRQ_TASK_DONE", this.failed);
  }
}
function downloadNext(o: PonyTask) {
  mkdirsSync(path.dirname(o.dlist[o.findex].pt));
  if (!fs.existsSync(o.dlist[o.findex].pt)) {
    var d = wget.download(o.dlist[o.findex].url, o.dlist[o.findex].pt);
    d.on("end", () => {
      o.downloaded += 1;
      o.emitter.emit("IRQ_DL_UPDATE");
      if (o.downloaded + o.failed >= o.dlist.length) {
        o.done();
      } else {
        o.findex += 1;
        downloadNext(o);
      }
    });
    d.on("error", () => {
      o.failed += 1;
      o.emitter.emit("IRQ_DL_FAILED");
      if (o.downloaded + o.failed >= o.dlist.length) {
        o.done();
      } else {
        o.findex += 1;
        downloadNext(o);
      }
    });
  } else {
    o.downloaded += 1;
    o.emitter.emit("IRQ_DL_UPDATE");
    if (o.downloaded + o.failed >= o.dlist.length) {
      o.done();
    } else {
      o.findex += 1;
      downloadNext(o);
    }
  }
}
function mkdirsSync(dirname: string) {
  try {
    if (fs.existsSync(dirname)) {
      return true;
    } else {
      if (mkdirsSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        return true;
      }
    }
  } catch (e) {
    return false;
  }
  return false;
}

class PonyDown {
  tasks = [];
  emitter: EventEmitter;
  downloaded = 0;
  failed = 0;
  alll: number;
  prem = new EventEmitter();
  constructor(flIn: any[], tkIn: number, emitterIn: EventEmitter) {
    this.alll = flIn.length;
    this.emitter = emitterIn;
    var ct = 1;
    var fll = [null];
    for (var i = 1; i <= tkIn; i++) {
      fll.push([]);
    }
    for (var f of flIn) {
      fll[ct].push(f);
      ct += 1;
      if (ct > tkIn) {
        ct = 1;
      }
    }
    for (var i = 1; i <= tkIn; i++) {
      this.tasks.push(new PonyTask(fll[i], this.prem));
    }
    this.prem.on("IRQ_DL_UPDATE", async () => {
      this.downloaded += 1;
      this.emitter.emit(
        "IRQ_DM_UPDATE",
        this.downloaded + this.failed,
        this.alll
      );
      if (this.downloaded + this.failed >= this.alll) {
        this.emitter.emit("IRQ_DM_DONE", this.failed);
      }
    });
    this.prem.on("IRQ_DL_FAILED", async () => {
      this.failed += 1;
      this.emitter.emit(
        "IRQ_DM_UPDATE",
        this.downloaded + this.failed,
        this.alll
      );
      if (this.downloaded + this.failed >= this.alll) {
        this.emitter.emit("IRQ_DM_DONE", this.failed);
      }
    });
  }
  start() {
    for (var e of this.tasks) {
      e.start();
    }
  }
}
export { PonyDown };
