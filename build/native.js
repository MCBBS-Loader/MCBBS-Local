"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeleteDir = exports.setLockedProperty = exports.getProperty = exports.setProperty = void 0;
const deleteDir = require("delete-directory-recursive");
function setProperty(obj, key, val) {
    obj[key] = val;
}
exports.setProperty = setProperty;
function getProperty(obj, key) {
    return obj[key];
}
exports.getProperty = getProperty;
function setLockedProperty(a, tag, val) {
    Object.defineProperty(a, tag, {
        value: val,
        enumerable: false,
        writable: false,
        configurable: false,
    });
}
exports.setLockedProperty = setLockedProperty;
function getDeleteDir() {
    return deleteDir();
}
exports.getDeleteDir = getDeleteDir;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL25hdGl2ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQztBQUN4RCxTQUFTLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7SUFDaEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNqQixDQUFDO0FBZVEsa0NBQVc7QUFkcEIsU0FBUyxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUc7SUFDM0IsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbEIsQ0FBQztBQVlxQixrQ0FBVztBQVhqQyxTQUFTLGlCQUFpQixDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRztJQUNwQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUU7UUFDNUIsS0FBSyxFQUFFLEdBQUc7UUFDVixVQUFVLEVBQUUsS0FBSztRQUNqQixRQUFRLEVBQUUsS0FBSztRQUNmLFlBQVksRUFBRSxLQUFLO0tBQ3BCLENBQUMsQ0FBQztBQUNMLENBQUM7QUFJa0MsOENBQWlCO0FBSHBELFNBQVMsWUFBWTtJQUNuQixPQUFPLFNBQVMsRUFBRSxDQUFDO0FBQ3JCLENBQUM7QUFDcUQsb0NBQVkifQ==