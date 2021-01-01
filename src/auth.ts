import { readFileSync, writeFileSync } from "fs";
import * as crypto from "crypto";
import { homedir } from "os";
import { join } from "path";

const USER_HOME = homedir();
var pinhash: string[] = [];
function verifyPIN(pin: string): string {
  try {
    var data = readFileSync(join(USER_HOME, "mcbbs.local.hash"));
    if (genHash(pin) == data.toString()) {
      return "PASSING";
    } else {
      return "DIFF";
    }
  } catch (e) {
    return "NOT EXIST";
  }
}
function savePIN(pin: string): boolean {
  try {
    writeFileSync(join(USER_HOME, "mcbbs.local.hash"), genHash(pin));
    return true;
  } catch (e) {
    return false;
  }
}

function genHash(data: string): string {
  const hash = crypto.createHash("md5");
  return hash.update(data).digest("hex");
}
function genNewToken() {
  return Math.floor(Math.random() * 1048576 * 1048576 * 1048576).toString(16);
}
function setToken(token: string) {
  pinhash.push(token);
}
function isRightHash(hash: string) {
  return pinhash.includes(hash);
}
var locked: boolean = false;
function lock() {
  if (!locked) {
    locked = true;
    return false;
  } else {
    return true;
  }
}
export {
  genHash,
  savePIN,
  verifyPIN,
  isRightHash,
  lock,
  genNewToken,
  setToken,
};
