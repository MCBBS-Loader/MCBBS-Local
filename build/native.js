"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLockedProperty = exports.getProperty = exports.setProperty = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL25hdGl2ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxTQUFTLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7SUFDaEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNqQixDQUFDO0FBYVEsa0NBQVc7QUFacEIsU0FBUyxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUc7SUFDM0IsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbEIsQ0FBQztBQVVxQixrQ0FBVztBQVRqQyxTQUFTLGlCQUFpQixDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRztJQUNwQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUU7UUFDNUIsS0FBSyxFQUFFLEdBQUc7UUFDVixVQUFVLEVBQUUsS0FBSztRQUNqQixRQUFRLEVBQUUsS0FBSztRQUNmLFlBQVksRUFBRSxLQUFLO0tBQ3BCLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFa0MsOENBQWlCIn0=