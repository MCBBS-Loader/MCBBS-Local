"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registryFunc = exports.runSync = exports.run = exports.isAble = void 0;
var FDT = new Map();
function isAble(callName) {
    if (typeof FDT.get(callName) == "function") {
        return true;
    }
    return false;
}
exports.isAble = isAble;
function runSync(callName, data) {
    return FDT.get(callName)(data);
}
exports.runSync = runSync;
function run(callName, data, cb) {
    FDT.get(callName)(data, cb);
}
exports.run = run;
function registryFunc(callName, func) {
    FDT.set(callName, func);
}
exports.registryFunc = registryFunc;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BlcmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL29wZXJhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxJQUFJLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLFNBQVMsTUFBTSxDQUFDLFFBQWdCO0lBQzlCLElBQUksT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFVBQVUsRUFBRTtRQUMxQyxPQUFPLElBQUksQ0FBQztLQUNiO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBVVEsd0JBQU07QUFUZixTQUFTLE9BQU8sQ0FBQyxRQUFnQixFQUFFLElBQVM7SUFDMUMsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2pDLENBQUM7QUFPcUIsMEJBQU87QUFON0IsU0FBUyxHQUFHLENBQUMsUUFBZ0IsRUFBRSxJQUFTLEVBQUUsRUFBc0I7SUFDOUQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDOUIsQ0FBQztBQUlnQixrQkFBRztBQUhwQixTQUFTLFlBQVksQ0FBQyxRQUFnQixFQUFFLElBQTZCO0lBQ25FLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzFCLENBQUM7QUFDOEIsb0NBQVkifQ==