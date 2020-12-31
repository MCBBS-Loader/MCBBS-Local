"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operation_1 = require("../operation");
const manifest_1 = require("../manifest");
const os_1 = require("os");
function reg() {
    operation_1.registryFunc("getVersion", getVersion);
    operation_1.registryFunc("getOS", getOS);
}
function getVersion(data, cb) {
    cb(true, manifest_1.MCBBS_LOCAL.VERSION);
}
function getOS(data, cb) {
    cb(true, os_1.platform());
}
exports.default = { reg };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2R1bGVzL2luZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FBNEM7QUFDNUMsMENBQTBDO0FBQzFDLDJCQUE4QjtBQUM5QixTQUFTLEdBQUc7SUFDVix3QkFBWSxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztJQUN2Qyx3QkFBWSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztBQUMvQixDQUFDO0FBQ0QsU0FBUyxVQUFVLENBQUMsSUFBUyxFQUFFLEVBQXNDO0lBQ25FLEVBQUUsQ0FBQyxJQUFJLEVBQUUsc0JBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNoQyxDQUFDO0FBQ0QsU0FBUyxLQUFLLENBQUMsSUFBUyxFQUFFLEVBQXNDO0lBQzlELEVBQUUsQ0FBQyxJQUFJLEVBQUUsYUFBUSxFQUFFLENBQUMsQ0FBQztBQUN2QixDQUFDO0FBQ0Qsa0JBQWUsRUFBRSxHQUFHLEVBQUUsQ0FBQyJ9