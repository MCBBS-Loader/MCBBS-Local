const deleteDir = require("delete-directory-recursive");
function setProperty(obj, key, val) {
  obj[key] = val;
}
function getProperty(obj, key) {
  return obj[key];
}
function setLockedProperty(a, tag, val) {
  Object.defineProperty(a, tag, {
    value: val,
    enumerable: false,
    writable: false,
    configurable: false,
  });
}
function getDeleteDir() {
  return deleteDir();
}
export { setProperty, getProperty, setLockedProperty, getDeleteDir };
