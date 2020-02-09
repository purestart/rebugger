"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("../../../../utils/mysql"));
var sequelize_1 = __importDefault(require("sequelize"));
var userSchema_1 = __importDefault(require("../schema/userSchema"));
var userRoleSchema_1 = __importDefault(require("../schema/userRoleSchema"));
var UserDao = userSchema_1.default(mysql_1.default, sequelize_1.default); // 引入user的表结构
var uuid = require("node-uuid");
var UserRoleDao = userRoleSchema_1.default(mysql_1.default, sequelize_1.default);
// 重新生成表
// UserDao.sync({ alter: true, force: true });
// UserRoleDao.sync({ alter: true, force: true });
exports.default = {
    info: function (id) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, UserDao.findOne({
                        where: {
                            id: id
                        }
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
    infoByName: function (name) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, UserDao.findOne({
                        where: {
                            name: name
                        }
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
    // 用户名登录
    loginByLoginName: function (loginName, password) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, UserDao.findOne({
                        where: {
                            loginName: loginName,
                            password: password
                        }
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
    // 邮箱登录
    loginByEmail: function (email, password) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, UserDao.findOne({
                        where: {
                            email: email,
                            password: password
                        }
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
    list: function (pageSize, pageNum, searchParams) {
        if (pageSize === void 0) { pageSize = 10; }
        return __awaiter(void 0, void 0, void 0, function () {
            var total, offset, list, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        total = 0;
                        return [4 /*yield*/, UserDao.count({ where: searchParams }, { logging: false })];
                    case 1:
                        total = _a.sent();
                        // console.log(total);
                        if (total < 1) {
                            return [2 /*return*/, []];
                        }
                        offset = 0;
                        // console.log(pageSize);
                        if (pageNum > 1) {
                            offset = (pageNum - 1) * pageSize;
                        }
                        return [4 /*yield*/, UserDao.findAll({
                                where: searchParams,
                                //order: [['update_date', 'DESC']],
                                offset: offset,
                                limit: pageSize
                            })];
                    case 2:
                        list = _a.sent();
                        list.forEach(function (item) {
                            item.password = "";
                        });
                        result = {
                            pageSize: pageSize,
                            pageNum: pageNum,
                            list: list,
                            total: total
                        };
                        return [2 /*return*/, result];
                }
            });
        });
    },
    create: function (obj) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, UserDao.create(__assign({ id: uuid.v1() }, obj))];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
    delete: function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var o;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, UserDao.findOne({
                        where: {
                            id: id
                        }
                    })];
                case 1:
                    o = _a.sent();
                    return [4 /*yield*/, o.destroy()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
    update: function (obj) { return __awaiter(void 0, void 0, void 0, function () {
        var o;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, UserDao.findOne({
                        where: {
                            id: obj.id
                        }
                    })];
                case 1:
                    o = _a.sent();
                    o.update_date = Date.now();
                    o.name = obj.name;
                    o.remarks = obj.remarks;
                    return [4 /*yield*/, o.save()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
    updateExist: function (obj) { return __awaiter(void 0, void 0, void 0, function () {
        var o;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, UserDao.findOne({
                        where: {
                            id: obj.id
                        }
                    })];
                case 1:
                    o = _a.sent();
                    o.updateDate = Date.now();
                    if (obj.name) {
                        o.name = obj.name;
                    }
                    if (obj.create_date) {
                        o.createDate = obj.createDate;
                    }
                    if (obj.remarks) {
                        o.remarks = obj.remarks;
                    }
                    return [4 /*yield*/, o.save()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); }
};
