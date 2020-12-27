"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const operation_1 = require("../operation");
function reg() {
    operation_1.registryFunc("readFile", mReadFile);
    operation_1.registryFunc("writeFile", mWriteFile);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2R1bGVzL2ZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQkFBcUQ7QUFDckQsNENBQTRDO0FBQzVDLFNBQVMsR0FBRztJQUNWLHdCQUFZLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3BDLHdCQUFZLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3hDLENBQUM7QUFDRCxTQUFTLFVBQVUsQ0FBQyxJQUFTLEVBQUUsRUFBc0M7SUFDbkUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxTQUFTLEVBQUU7UUFDMUQsRUFBRSxDQUFDLEtBQUssRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO1FBQ2xDLE9BQU87S0FDUjtTQUFNO1FBQ0wsY0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUMxQyxJQUFJLENBQUMsRUFBRTtnQkFDTCxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ2Q7aUJBQU07Z0JBQ0wsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNoQjtRQUNILENBQUMsQ0FBQyxDQUFDO0tBQ0o7QUFDSCxDQUFDO0FBQ0QsU0FBUyxTQUFTLENBQUMsSUFBUyxFQUFFLEVBQXNDO0lBQ2xFLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFNBQVMsRUFBRTtRQUM3QixFQUFFLENBQUMsS0FBSyxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDOUIsT0FBTztLQUNSO1NBQU07UUFDTCxJQUFJLENBQUMsZUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFO1lBQzdCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7U0FDeEI7YUFBTTtZQUNMLGFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzlCLElBQUksQ0FBQyxFQUFFO29CQUNMLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQ2Q7cUJBQU07b0JBQ0wsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDYjtZQUNILENBQUMsQ0FBQyxDQUFDO1NBQ0o7S0FDRjtBQUNILENBQUM7QUFDRCxrQkFBZSxFQUFFLEdBQUcsRUFBRSxDQUFDIn0=