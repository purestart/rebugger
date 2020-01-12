export default class Utils {
  /**
   * 通过传入的children字段名，将多层级的对象打平为一个数组
   * @param {T} source
   * @param {string} children
   * @returns {T[]}
   * 例如  [{id: 1, children: [{id: 2}]}] => [{id: 1}, {id: 2}]
   */
  flatObject(source, children = "children") {
    const re = [];
    const clone = JSON.parse(JSON.stringify(source));
    this.flatObjectDo(clone, children, re);
    return re;
  }

  /**
   * 数组转树
   * @param source
   * @param parentIdVal
   * @param id
   * @param parentId
   * @returns {*}
   */
  list2Tree(
    source,
    parentIdVal = undefined,
    id = "id",
    parentId = "parentId",
    max = 3,
    currentLevel = 1
  ) {
    const target = source.filter(s => s[parentId] === parentIdVal);
    target.forEach(t => {
      if (currentLevel < max) {
        const children = this.list2Tree(
          source,
          t[id],
          id,
          parentId,
          max,
          currentLevel + 1
        );
        if (children.length) {
          t.children = children;
        }
      }
    });
    return target;
  }

  treeDataTranslate(data, id = "id", pid = "parentId") {
    var res = [];
    var temp = {};
    for (var i = 0; i < data.length; i++) {
      temp[data[i][id]] = data[i];
    }
    for (var k = 0; k < data.length; k++) {
      if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
        if (!temp[data[k][pid]]["children"]) {
          temp[data[k][pid]]["children"] = [];
        }
        if (!temp[data[k][pid]]["_level"]) {
          temp[data[k][pid]]["_level"] = 1;
        }
        data[k]["_level"] = temp[data[k][pid]]._level + 1;
        temp[data[k][pid]]["children"].push(data[k]);
      } else {
        res.push(data[k]);
      }
    }
    return res;
  }

  // 日期判断
  isDate(obj) {
    return Object.prototype.toString.call(obj) === "[object Date]";
  }
  isObj(obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";
  }
  // 空对象判断
  isEmptyObject(obj) {
    return Object.keys(obj).length <= 0;
  }
  //
  delEmptyProp(obj = {}) {
    for (const key of Object.keys(obj)) {
      if (this.isObj(obj[key])) {
        this.delEmptyProp(obj[key]);
      }
      if (
        obj[key] === null ||
        obj[key] === undefined ||
        obj[key] === "" ||
        (this.isObj(obj[key]) && this.isEmptyObject(obj[key]))
      ) {
        delete obj[key];
      }
    }
    return obj;
  }
  // 对象转为数组
  objToArr(obj = {}, labelField = "label", valueField = "value") {
    const arr = [];
    for (const key of Object.keys(obj)) {
      arr.push({
        [labelField]: key,
        [valueField]: obj[key]
      });
    }
    return arr;
  }

  // 反转对象的key-value
  reverse(source) {
    const re = {};
    for (const key of Object.keys(source)) {
      re[source[key]] = key;
    }
    return re;
  }

  flatObjectDo(source, children, re, parentId) {
    source.forEach(s => {
      if (parentId) {
        s.parentId = parentId;
      }
      re.push(s);
      if (s[children]) {
        this.flatObjectDo(s[children], children, re, s.id);
        delete s[children];
      }
    });
  }

  /**
   * 分组
   * @param array
   * @param f
   * @returns [[],[]]
   */
  groupBy(array, f) {
    let groups = {};
    array.forEach(function(o) {
      let group = JSON.stringify(f(o));
      groups[group] = groups[group] || [];
      groups[group].push(o);
    });
    return Object.keys(groups).map(function(group) {
      return groups[group];
    });
  }
  deepCopy(obj) {
    // 只拷贝对象
    if (typeof obj !== "object") return obj;
    // 根据obj的类型判断是新建一个数组还是一个对象
    let newObj = obj instanceof Array ? [] : {};
    for (let key in obj) {
      // 遍历obj,并且判断是obj的属性才拷贝
      if (obj.hasOwnProperty(key)) {
        // 判断属性值的类型，如果是对象递归调用深拷贝
        newObj[key] =
          typeof obj[key] === "object" ? this.deepCopy(obj[key]) : obj[key];
      }
    }
    return newObj;
  }

  getUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
      return (c === "x" ? (Math.random() * 16) | 0 : "r&0x3" | "0x8").toString(
        16
      );
    });
  }
  // 生成唯一的UUID
  generateUUID() {
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
      d += performance.now(); // use high-precision timer if available
    }
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
      c
    ) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  }

  // promise处理
  to(promise) {
    return promise
      .then(data => {
        return [null, data];
      })
      .catch(err => [err]);
  }
  // 加密
  enCode(code) {
    var c = String.fromCharCode(code.charCodeAt(0) + code.length);
    for (var i = 1; i < code.length; i++) {
      c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
    }
    return (escape(c));
  }

  // 解密
  deCode(code) {
    code = unescape(code);
    var c = String.fromCharCode(code.charCodeAt(0) - code.length);
    for (var i = 1; i < code.length; i++) {
      c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
    }
    return c;
  }
}
export const utils = new Utils();
