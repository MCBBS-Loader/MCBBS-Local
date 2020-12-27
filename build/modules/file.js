"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const operation_1 = require("../operation");
function reg() {
    operation_1.registryFunc("readFile", mReadFile);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2R1bGVzL2ZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQkFBMEM7QUFDMUMsNENBQTRDO0FBQzVDLFNBQVMsR0FBRztJQUNWLHdCQUFZLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ3RDLENBQUM7QUFDRCxTQUFTLFNBQVMsQ0FBQyxJQUFTLEVBQUUsRUFBc0M7SUFDbEUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksU0FBUyxFQUFFO1FBQzdCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUM5QixPQUFPO0tBQ1I7U0FBTTtRQUNMLElBQUksQ0FBQyxlQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUU7WUFDN0IsRUFBRSxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQztTQUN4QjthQUFNO1lBQ0wsYUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDOUIsSUFBSSxDQUFDLEVBQUU7b0JBQ0wsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDZDtxQkFBTTtvQkFDTCxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUNiO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjtLQUNGO0FBQ0gsQ0FBQztBQUNELGtCQUFlLEVBQUUsR0FBRyxFQUFFLENBQUMifQ==