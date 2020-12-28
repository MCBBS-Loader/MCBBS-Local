"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHandler = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("./auth");
const operation_1 = require("./operation");
const request_1 = require("./request");
var GRDT = new Map();
function genID() {
    var id = Math.floor(Math.random() * 1048576 * 1048576).toString(16);
    if (GRDT.get(id) == undefined) {
        return id;
    }
    else {
        return genID();
    }
}
function doInvoke(id) {
    var req = GRDT.get(id);
    if (req != undefined) {
        if (operation_1.isAble(req.call || "empty")) {
            operation_1.run(req);
        }
        else {
            req.retValue("NOT IMPLEMENTED");
            req.state = "FAILED";
            GRDT.set(id, req);
        }
    }
}
function createHandler(port) {
    operation_1.regAll();
    var handler = express_1.default();
    handler.use(express_1.default.json());
    handler.use(express_1.default.urlencoded({ extended: true }));
    handler.all("*", (req, res, next) => {
        res.append("Access-Control-Allow-Origin", "*");
        res.append("Access-Control-Allow-Headers", "Content-Type");
        res.append("Access-Control-Allow-Methods", "*");
        res.append("Content-Type", "application/json;charset=utf-8");
        if (req.method.toLocaleLowerCase() == "options") {
            res.status(200).end();
        }
        else {
            if (req.path == "/verify") {
                next();
                return;
            }
            if (req.body["token"] == undefined) {
                res.json({ error: "METAMISSING" }).end();
            }
            else {
                if (auth_1.isRightHash(req.body["token"])) {
                    next();
                }
                else {
                    res.json({ error: "INVALIDPIN" });
                }
            }
        }
    });
    handler.post("/verify", (req, res) => {
        if (req.body["pin"] == undefined) {
            res.json({ error: "METAMISSING" }).end();
        }
        else {
            var state = auth_1.verifyPIN(req.body["pin"]);
            if (state != "PASSING") {
                res.json({ error: "INVALIDPIN" }).end();
            }
            else {
                var t = auth_1.genNewToken();
                auth_1.setToken(t);
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
            var dreq = new request_1.DeferredRequest(id);
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
        }
        catch (_a) {
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
        }
        else {
            res
                .json({
                error: "SUCCESS",
                state: dreq.state,
                data: dreq.data,
            })
                .end();
        }
    });
    handler.post("/get", (req, res) => {
        var ifclose = false;
        if (req.body["close"] == true) {
            ifclose = true;
        }
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
        }
        else {
            if (["FAILED", "DONE"].includes(dreq.state)) {
                res
                    .json({
                    error: "SUCCESS",
                    state: dreq.state,
                    data: dreq.res,
                })
                    .end();
                if (ifclose) {
                    GRDT.delete(req.body["reqid"]);
                }
            }
            else {
                res
                    .json({
                    error: "NOTFINISHED",
                })
                    .end();
            }
        }
    });
    return handler.listen(port);
}
exports.createHandler = createHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJveHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcHJveHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsc0RBQThCO0FBQzlCLGlDQUF1RTtBQUN2RSwyQ0FBa0Q7QUFDbEQsdUNBQTRDO0FBRTVDLElBQUksSUFBSSxHQUFHLElBQUksR0FBRyxFQUEyQixDQUFDO0FBRTlDLFNBQVMsS0FBSztJQUNaLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLE9BQU8sR0FBRyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDcEUsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLFNBQVMsRUFBRTtRQUM3QixPQUFPLEVBQUUsQ0FBQztLQUNYO1NBQU07UUFDTCxPQUFPLEtBQUssRUFBRSxDQUFDO0tBQ2hCO0FBQ0gsQ0FBQztBQUNELFNBQVMsUUFBUSxDQUFDLEVBQVU7SUFDMUIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQW9CLENBQUM7SUFDMUMsSUFBSSxHQUFHLElBQUksU0FBUyxFQUFFO1FBQ3BCLElBQUksa0JBQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxFQUFFO1lBQy9CLGVBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNWO2FBQU07WUFDTCxHQUFHLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDaEMsR0FBRyxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7WUFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDbkI7S0FDRjtBQUNILENBQUM7QUFDRCxTQUFTLGFBQWEsQ0FBQyxJQUFZO0lBQ2pDLGtCQUFNLEVBQUUsQ0FBQztJQUNULElBQUksT0FBTyxHQUFHLGlCQUFPLEVBQUUsQ0FB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