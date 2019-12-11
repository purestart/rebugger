/* eslint-disable quotes */
/* eslint-disable space-before-function-paren */
export class LsUtils {
  set(key, val) {
    if (typeof val === "object") {
      val = JSON.stringify(val);
    }
    localStorage.setItem(key, val);
  }
  get(key, defaultVal = "") {
    return localStorage.getItem(key) || defaultVal;
  }
  getObj(key, defaultVal) {
    const val = this.get(key, null);
    if (val) {
      return JSON.parse(val);
    }
    return defaultVal || null;
  }
  remove(key) {
    localStorage.removeItem(key);
  }
}
export default new LsUtils();
