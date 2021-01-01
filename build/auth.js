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
var pinhash = [];
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
    return hash.update(data).digest("hex");
}
exports.genHash = genHash;
function genNewToken() {
    return Math.floor(Math.random() * 1048576 * 1048576 * 1048576).toString(16);
}
exports.genNewToken = genNewToken;
function setToken(token) {
    pinhash.push(token);
}
exports.setToken = setToken;
function isRightHash(hash) {
    return pinhash.includes(hash);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hdXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQkFBaUQ7QUFDakQsK0NBQWlDO0FBQ2pDLDJCQUE2QjtBQUM3QiwrQkFBNEI7QUFFNUIsTUFBTSxTQUFTLEdBQUcsWUFBTyxFQUFFLENBQUM7QUFDNUIsSUFBSSxPQUFPLEdBQWEsRUFBRSxDQUFDO0FBQzNCLFNBQVMsU0FBUyxDQUFDLEdBQVc7SUFDNUIsSUFBSTtRQUNGLElBQUksSUFBSSxHQUFHLGlCQUFZLENBQUMsV0FBSSxDQUFDLFNBQVMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7UUFDN0QsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ25DLE9BQU8sU0FBUyxDQUFDO1NBQ2xCO2FBQU07WUFDTCxPQUFPLE1BQU0sQ0FBQztTQUNmO0tBQ0Y7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sV0FBVyxDQUFDO0tBQ3BCO0FBQ0gsQ0FBQztBQW1DQyw4QkFBUztBQWxDWCxTQUFTLE9BQU8sQ0FBQyxHQUFXO0lBQzFCLElBQUk7UUFDRixrQkFBYSxDQUFDLFdBQUksQ0FBQyxTQUFTLEVBQUUsa0JBQWtCLENBQUMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNqRSxPQUFPLElBQUksQ0FBQztLQUNiO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLEtBQUssQ0FBQztLQUNkO0FBQ0gsQ0FBQztBQTBCQywwQkFBTztBQXhCVCxTQUFTLE9BQU8sQ0FBQyxJQUFZO0lBQzNCLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN6QyxDQUFDO0FBb0JDLDBCQUFPO0FBbkJULFNBQVMsV0FBVztJQUNsQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLE9BQU8sR0FBRyxPQUFPLEdBQUcsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzlFLENBQUM7QUFzQkMsa0NBQVc7QUFyQmIsU0FBUyxRQUFRLENBQUMsS0FBYTtJQUM3QixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3RCLENBQUM7QUFvQkMsNEJBQVE7QUFuQlYsU0FBUyxXQUFXLENBQUMsSUFBWTtJQUMvQixPQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEMsQ0FBQztBQWNDLGtDQUFXO0FBYmIsSUFBSSxNQUFNLEdBQVksS0FBSyxDQUFDO0FBQzVCLFNBQVMsSUFBSTtJQUNYLElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDWCxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2QsT0FBTyxLQUFLLENBQUM7S0FDZDtTQUFNO1FBQ0wsT0FBTyxJQUFJLENBQUM7S0FDYjtBQUNILENBQUM7QUFNQyxvQkFBSSJ9