"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const operation_1 = require("../operation");
const native_1 = require("../native");
const node_stream_zip_1 = __importDefault(require("node-stream-zip"));
function reg() {
    operation_1.registryFunc("readFile", mReadFile);
    operation_1.registryFunc("writeFile", mWriteFile);
    operation_1.registryFunc("readDir", mReadDir);
    operation_1.registryFunc("deleteDir", mDeleteDir);
    operation_1.registryFunc("deleteFile", mDeleteFile);
    operation_1.registryFunc("unzip", unzip);
}
function unzip(data, cb) {
    if (data["from"] == undefined || data["to"] == undefined) {
        cb(false, "Missing path");
        return;
    }
    else {
        let zip = new node_stream_zip_1.default({
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
                }
                else {
                    cb(true, null);
                }
            });
        });
    }
}
function mDeleteDir(data, cb) {
    if (data["path"] == undefined) {
        cb(false, "Missing path");
        return;
    }
    else {
        let deleteDir = native_1.getDeleteDir();
        deleteDir({ root: data["path"] })
            .then(() => {
            cb(true, null);
        })
            .catch((e) => {
            cb(false, e);
        });
    }
}
function mDeleteFile(data, cb) {
    if (data["path"] == undefined) {
        cb(false, "Missing path");
        return;
    }
    else {
        fs_1.unlink(data["path"], (e) => {
            if (e) {
                cb(false, e);
            }
            else {
                cb(true, null);
            }
        });
    }
}
function mReadDir(data, cb) {
    if (data["path"] == undefined) {
        cb(false, "Missing path");
        return;
    }
    else {
        fs_1.readdir(data["path"], (e, files) => {
            if (e) {
                cb(false, e);
            }
            else {
                cb(true, files);
            }
        });
    }
}
function mWriteFile(data, cb) {
    if (data["path"] == undefined || data["data"] == undefined) {
        cb(false, "Missing path or data");
        return;
    }
    else {
        fs_1.writeFile(data["path"], data["data"], (e) => {
            if (e) {
                cb(false, e);
            }
            else {
                cb(true, null);
            }
        });
    }
}
function mReadFile(data, cb) {
    if (data["path"] == undefined) {
        cb(false, "No path provided");
        return;
    }
    else {
        if (!fs_1.existsSync(data["path"])) {
            cb(false, "Not found");
        }
        else {
            fs_1.readFile(data["path"], (e, d) => {
                if (e) {
                    cb(false, e);
                }
                else {
                    cb(true, d);
                }
            });
        }
    }
}
exports.default = { reg };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2R1bGVzL2ZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwyQkFBc0U7QUFDdEUsNENBQTRDO0FBQzVDLHNDQUF5QztBQUN6QyxzRUFBd0M7QUFDeEMsU0FBUyxHQUFHO0lBQ1Ysd0JBQVksQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDcEMsd0JBQVksQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDdEMsd0JBQVksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDbEMsd0JBQVksQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDdEMsd0JBQVksQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDeEMsd0JBQVksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDL0IsQ0FBQztBQUNELFNBQVMsS0FBSyxDQUFDLElBQVMsRUFBRSxFQUFzQztJQUM5RCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsRUFBRTtRQUN4RCxFQUFFLENBQUMsS0FBSyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQzFCLE9BQU87S0FDUjtTQUFNO1FBQ0wsSUFBSSxHQUFHLEdBQUcsSUFBSSx5QkFBUyxDQUFDO1lBQ3RCLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ2xCLFlBQVksRUFBRSxJQUFJO1NBQ25CLENBQUMsQ0FBQztRQUNILEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDcEIsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDO1FBQ0gsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO1lBQ25CLEdB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