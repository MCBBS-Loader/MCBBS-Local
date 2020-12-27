"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operation_1 = require("../operation");
const manifest_1 = require("../manifest");
function reg() {
    operation_1.registryFunc("getVersion", getVersion);
}
function getVersion(data, cb) {
    cb(true, manifest_1.MCBBS_LOCAL.VERSION);
}
exports.default = { reg };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2R1bGVzL2luZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FBNEM7QUFDNUMsMENBQTBDO0FBQzFDLFNBQVMsR0FBRztJQUNWLHdCQUFZLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3pDLENBQUM7QUFDRCxTQUFTLFVBQVUsQ0FBQyxJQUFTLEVBQUUsRUFBc0M7SUFDbkUsRUFBRSxDQUFDLElBQUksRUFBRSxzQkFBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2hDLENBQUM7QUFDRCxrQkFBZSxFQUFFLEdBQUcsRUFBRSxDQUFDIn0=