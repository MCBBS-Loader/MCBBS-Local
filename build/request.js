"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeferredRequest = void 0;
class DeferredRequest {
    constructor(id) {
        this.call = "empty";
        this.state = "PENDING";
        this.data = {};
        this.res = undefined;
        this.id = id;
    }
    invokeSync(func) {
        if (this.state != "PENDING") {
            return false;
        }
        this.state = "RUNNING";
        if (func(this.data)) {
            this.state = "DONE";
        }
        else {
            this.state = "FAILED";
        }
        return true;
    }
    configure(func) {
        func(this);
    }
    invoke(func) {
        if (this.state != "PENDING") {
            return false;
        }
        this.state = "RUNNING";
        func((state) => {
            if (state) {
                this.state = "DONE";
            }
            else {
                this.state = "FAILED";
            }
        });
        return true;
    }
    retValue(data) {
        if (this.state != "PENDING") {
            return false;
        }
        this.res = data;
        return true;
    }
    close() {
        this.state = "CLOSED";
    }
}
exports.DeferredRequest = DeferredRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQU0sZUFBZTtJQTZDbkIsWUFBWSxFQUFVO1FBNUN0QixTQUFJLEdBQVcsT0FBTyxDQUFDO1FBRXZCLFVBQUssR0FBVyxTQUFTLENBQUM7UUFDMUIsU0FBSSxHQUFRLEVBQUUsQ0FBQztRQUNmLFFBQUcsR0FBUSxTQUFTLENBQUM7UUF5Q25CLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQXpDRCxVQUFVLENBQUMsSUFBNEI7UUFDckMsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLFNBQVMsRUFBRTtZQUMzQixPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7UUFDdkIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1NBQ3JCO2FBQU07WUFDTCxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztTQUN2QjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNELFNBQVMsQ0FBQyxJQUFvQztRQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDYixDQUFDO0lBQ0QsTUFBTSxDQUFDLElBQTBDO1FBQy9DLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxTQUFTLEVBQUU7WUFDM0IsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ2IsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7YUFDckI7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7YUFDdkI7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNELFFBQVEsQ0FBQyxJQUFTO1FBQ2hCLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxTQUFTLEVBQUU7WUFDM0IsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNELEtBQUs7UUFDSCxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztJQUN4QixDQUFDO0NBSUY7QUFFUSwwQ0FBZSJ9