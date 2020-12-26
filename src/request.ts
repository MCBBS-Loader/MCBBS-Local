class DeferredRequest {
  call: string = "empty";
  id: string;
  state: string = "PENDING";
  data: any = {};
  res: any = undefined;
  invokeSync(func: (data: any) => boolean) {
    if (this.state != "PENDING") {
      return false;
    }
    this.state = "RUNNING";
    if (func(this.data)) {
      this.state = "DONE";
    } else {
      this.state = "FAILED";
    }
    return true;
  }
  configure(func: (req: DeferredRequest) => void) {
    func(this);
  }
  invoke(func: (next: (state: any) => void) => void) {
    if (this.state != "PENDING") {
      return false;
    }
    this.state = "RUNNING";
    func((state) => {
      if (state) {
        this.state = "DONE";
      } else {
        this.state = "FAILED";
      }
    });
    return true;
  }
  retValue(data: any) {
    if (this.state != "PENDING") {
      return false;
    }
    this.res = data;
    return true;
  }
  close() {
    this.state = "CLOSED";
  }
  constructor(id: string) {
    this.id = id;
  }
}

export { DeferredRequest };
