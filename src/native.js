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

export { setProperty, getProperty, setLockedProperty };
