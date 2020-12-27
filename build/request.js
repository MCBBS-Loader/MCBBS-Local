"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeferredRequest = void 0;
class DeferredRequest {
    constructor(id) {
        this.call = "empty";
        this.state = "PENDING";
        this.data = {};
        this.res = {};
        this.id = id;
    }
    retValue(data) {
        this.res = data;
    }
}
exports.DeferredRequest = DeferredRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQU0sZUFBZTtJQVVuQixZQUFZLEVBQVU7UUFUdEIsU0FBSSxHQUFXLE9BQU8sQ0FBQztRQUV2QixVQUFLLEdBQVcsU0FBUyxDQUFDO1FBQzFCLFNBQUksR0FBUSxFQUFFLENBQUM7UUFDZixRQUFHLEdBQVEsRUFBRSxDQUFDO1FBTVosSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDZixDQUFDO0lBTkQsUUFBUSxDQUFDLElBQVM7UUFDaEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7SUFDbEIsQ0FBQztDQUtGO0FBRVEsMENBQWUifQ==