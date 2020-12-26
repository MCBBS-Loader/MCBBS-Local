import express from "express";
import { genNewToken, isRightHash, lock, setToken, verifyPIN } from "./auth";
import { DeferredRequest } from "./request";

var GRDT = new Map<string, DeferredRequest>();

function genID(): string {
  var id = Math.floor(Math.random() * 1048576 * 1048576).toString(16);
  if (GRDT.get(id) == undefined) {
    return id;
  } else {
    return genID();
  }
}
function doInvoke(id: string) {}
function createHandler(port: number) {
  var handler = express();
  handler.use(express.json());
  handler.use(express.urlencoded({ extended: true }));
  handler.all("*", (req, res, next) => {
    res.append("Access-Control-Allow-Origin", "*");
    res.append("Access-Control-Allow-Headers", "Content-Type");
    res.append("Access-Control-Allow-Methods", "*");
    res.append("Content-Type", "application/json;charset=utf-8");
    if (req.method.toLocaleLowerCase() == "options") {
      res.status(200).end();
    } else {
      if (req.path == "/verify") {
        next();
        return;
      }
      if (req.body["token"] == undefined) {
        res.json({ error: "METAMISSING" }).end();
      } else {
        if (isRightHash(req.body["token"])) {
          next();
        } else {
          res.json({ error: "INVALIDPIN" });
        }
      }
    }
  });
  handler.post("/verify", (req, res) => {
    if (lock()) {
      res.json({ error: "DUPACCESS" }).end();
      return;
    }
    if (req.body["pin"] == undefined) {
      res.json({ error: "METAMISSING" }).end();
    } else {
      var state = verifyPIN(req.body["pin"]);
      if (state != "PASSING") {
        res.json({ error: "INVALIDPIN" }).end();
      } else {
        var t = genNewToken();
        setToken(t);
        res.json({ error: "ACCEPTED", token: t });
      }
    }
  });
  handler.post("/new", (req, res) => {
    try {
      if (req.body["call"] == undefined) {
        res
          .json({
            error: "METAMISSING",
          })
          .end();
        return;
      }
      var id = genID();
      var dreq = new DeferredRequest(id);
      dreq.call = req.body["call"];
      dreq.data = req.body["data"] || {};
      GRDT.set(id, dreq);
      res
        .json({
          error: "ACCEPTED",
          reqid: id,
        })
        .end();
      doInvoke(id);
    } catch {
      res
        .json({
          error: "UNKNOWN",
        })
        .end();
    }
  });
  handler.post("/query", (req, res) => {
    if (req.body["reqid"] == undefined) {
      res
        .json({
          error: "METAMISSING",
        })
        .end();
      return;
    }
    var dreq = GRDT.get(req.body["reqid"]);
    if (dreq == undefined) {
      res
        .json({
          error: "NOTEXIST",
        })
        .end();
      return;
    } else {
      res
        .json({
          error: "SUCCESS",
          state: dreq.state,
        })
        .end();
    }
  });
  return handler.listen(port);
}
export { createHandler };