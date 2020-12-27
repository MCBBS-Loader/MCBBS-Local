class DeferredRequest {
  call: string = "empty";
  id: string;
  state: string = "PENDING";
  data: any = {};
  res: any = {};
  retValue(data: any) {
    this.res = data;
  }

  constructor(id: string) {
    this.id = id;
  }
}

export { DeferredRequest };
