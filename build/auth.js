"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setToken = exports.genNewToken = exports.lock = exports.isRightHash = exports.verifyPIN = exports.savePIN = exports.genHash = void 0;
const fs_1 = require("fs");
const crypto = __importStar(require("crypto"));
const os_1 = require("os");
const path_1 = require("path");
const USER_HOME = os_1.homedir();
var pinhash;
function verifyPIN(pin) {
    try {
        var data = fs_1.readFileSync(path_1.join(USER_HOME, "mcbbs.local.hash"));
        if (genHash(pin) == data.toString()) {
            return "PASSING";
        }
        else {
            return "DIFF";
        }
    }
    catch (e) {
        return "NOT EXIST";
    }
}
exports.verifyPIN = verifyPIN;
function savePIN(pin) {
    try {
        fs_1.writeFileSync(path_1.join(USER_HOME, "mcbbs.local.hash"), genHash(pin));
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.savePIN = savePIN;
function genHash(data) {
    const hash = crypto.createHash("md5");
    var t = hash.update(data).digest("hex");
    return t;
}
exports.genHash = genHash;
function genNewToken() {
    return Math.floor(Math.random() * 1048576 * 1048576 * 1048576).toString(16);
}
exports.genNewToken = genNewToken;
function setToken(token) {
    pinhash = token;
}
exports.setToken = setToken;
function isRightHash(hash) {
    if (hash == pinhash) {
        return true;
    }
    return false;
}
exports.isRightHash = isRightHash;
var locked = false;
function lock() {
    if (!locked) {
        locked = true;
        return false;
    }
    else {
        return true;
    }
}
exports.lock = lock;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hdXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQkFBaUQ7QUFDakQsK0NBQWlDO0FBQ2pDLDJCQUE2QjtBQUM3QiwrQkFBNEI7QUFDNUIsTUFBTSxTQUFTLEdBQUcsWUFBTyxFQUFFLENBQUM7QUFDNUIsSUFBSSxPQUFlLENBQUM7QUFDcEIsU0FBUyxTQUFTLENBQUMsR0FBVztJQUM1QixJQUFJO1FBQ0YsSUFBSSxJQUFJLEdBQUcsaUJBQVksQ0FBQyxXQUFJLENBQUMsU0FBUyxFQUFFLGtCQUFrQixDQUFDLENBQUMsQ0FBQztRQUM3RCxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDbkMsT0FBTyxTQUFTLENBQUM7U0FDbEI7YUFBTTtZQUNMLE9BQU8sTUFBTSxDQUFDO1NBQ2Y7S0FDRjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxXQUFXLENBQUM7S0FDcEI7QUFDSCxDQUFDO0FBdUNDLDhCQUFTO0FBdENYLFNBQVMsT0FBTyxDQUFDLEdBQVc7SUFDMUIsSUFBSTtRQUNGLGtCQUFhLENBQUMsV0FBSSxDQUFDLFNBQVMsRUFBRSxrQkFBa0IsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7QUFDSCxDQUFDO0FBOEJDLDBCQUFPO0FBNUJULFNBQVMsT0FBTyxDQUFDLElBQVk7SUFDM0IsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QyxPQUFPLENBQUMsQ0FBQztBQUNYLENBQUM7QUF1QkMsMEJBQU87QUF0QlQsU0FBUyxXQUFXO0lBQ2xCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsT0FBTyxHQUFHLE9BQU8sR0FBRyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDOUUsQ0FBQztBQXlCQyxrQ0FBVztBQXhCYixTQUFTLFFBQVEsQ0FBQyxLQUFhO0lBQzdCLE9BQU8sR0FBRyxLQUFLLENBQUM7QUFDbEIsQ0FBQztBQXVCQyw0QkFBUTtBQXRCVixTQUFTLFdBQVcsQ0FBQyxJQUFZO0lBQy9CLElBQUksSUFBSSxJQUFJLE9BQU8sRUFBRTtRQUNuQixPQUFPLElBQUksQ0FBQztLQUNiO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBY0Msa0NBQVc7QUFiYixJQUFJLE1BQU0sR0FBWSxLQUFLLENBQUM7QUFDNUIsU0FBUyxJQUFJO0lBQ1gsSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUNYLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDZCxPQUFPLEtBQUssQ0FBQztLQUNkO1NBQU07UUFDTCxPQUFPLElBQUksQ0FBQztLQUNiO0FBQ0gsQ0FBQztBQU1DLG9CQUFJIn0=