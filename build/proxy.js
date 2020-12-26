"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHandler = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("./auth");
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
function doInvoke(id) { }
function createHandler(port) {
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
        if (auth_1.lock()) {
            res.json({ error: "DUPACCESS" }).end();
            return;
        }
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
            })
                .end();
        }
    });
    return handler.listen(port);
}
exports.createHandler = createHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJveHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcHJveHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsc0RBQThCO0FBQzlCLGlDQUE2RTtBQUM3RSx1Q0FBNEM7QUFFNUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQTJCLENBQUM7QUFFOUMsU0FBUyxLQUFLO0lBQ1osSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsT0FBTyxHQUFHLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNwRSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksU0FBUyxFQUFFO1FBQzdCLE9BQU8sRUFBRSxDQUFDO0tBQ1g7U0FBTTtRQUNMLE9BQU8sS0FBSyxFQUFFLENBQUM7S0FDaEI7QUFDSCxDQUFDO0FBQ0QsU0FBUyxRQUFRLENBQUMsRUFBVSxJQUFHLENBQUM7QUFDaEMsU0FBUyxhQUFhLENBQUMsSUFBWTtJQUNqQyxJQUFJLE9BQU8sR0FBRyxpQkFBTyxFQUFFLENBQUM7SUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO1FBQ2xDLEdBQUcsQ0FBQyxNQUFNLENBQUMsNkJBQTZCLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDL0MsR0FBRyxDQUFDLE1BQU0sQ0FBQyw4QkFBOEIsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUMzRCxHQUFHLENBQUMsTUFBTSxDQUFDLDhCQUE4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