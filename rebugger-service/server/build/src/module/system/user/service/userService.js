"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var baseService_1 = __importDefault(require("../../../base/service/baseService"));
var mysql_1 = __importDefault(require("../../../../utils/mysql"));
var sequelize_1 = __importDefault(require("sequelize"));
var userSchema_1 = __importDefault(require("../schema/userSchema"));
var userRoleSchema_1 = __importDefault(require("..//schema/userRoleSchema"));
var uuid = require("node-uuid");
var js_md5_1 = __importDefault(require("js-md5"));
var UserDao = userSchema_1.default(mysql_1.default, sequelize_1.default);
// 用于更新角色 批量保存角色 菜单关联表
var UserRoleDao = userRoleSchema_1.default(mysql_1.default, sequelize_1.default);
// 重新生成表
// UserDao.sync({ alter: true, force: true });
// UserRoleDao.sync({ alter: true, force: true });
var UserService = /** @class */ (function (_super) {
    __extends(UserService, _super);
    function UserService() {
        return _super.call(this, UserDao) || this;
    }
    /**
     * 分页查询
     */
    UserService.prototype.list = function (pageNum, pageSize, where) {
        if (pageNum === void 0) { pageNum = 1; }
        if (pageSize === void 0) { pageSize = 10; }
        return __awaiter(this, void 0, void 0, function () {
            var total, offset, list, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        total = 0;
                        return [4 /*yield*/, this.entityDao.count({ where: where }, { logging: true })];
                    case 1:
                        total = _a.sent();
                        if (total < 1) {
                            return [2 /*return*/, {
                                    pageSize: pageSize,
                                    pageNum: pageNum,
                                    list: [],
                                    total: 0
                                }];
                        }
                        offset = 0;
                        if (pageNum > 1) {
                            offset = (pageNum - 1) * pageSize;
                        }
                        return [4 /*yield*/, this.entityDao.findAll({
                                where: where,
                                order: [["updateDate", "DESC"]],
                                offset: offset,
                                limit: pageSize
                            })];
                    case 2:
                        list = _a.sent();
                        if (list && list.length > 0) {
                            list.forEach(function (item) {
                                item.password = "";
                            });
                        }
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
    };
    /**
     * update
     */
    UserService.prototype.update = function (model, ignoreFields) {
        if (ignoreFields === void 0) { ignoreFields = []; }
        return __awaiter(this, void 0, void 0, function () {
            var defaultIgnore, o, key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        defaultIgnore = ["createDate", "password"];
                        ignoreFields = ignoreFields.concat(defaultIgnore);
                        ignoreFields = Array.from(new Set(ignoreFields));
                        return [4 /*yield*/, this.entityDao.findOne({
                                where: {
                                    id: model.id
                                }
                            })];
                    case 1:
                        o = _a.sent();
                        o.updateDate = Date.now();
                        // 字段过滤
                        for (key in model) {
                            if (!ignoreFields.includes(key)) {
                                o[key] = model[key];
                            }
                        }
                        return [4 /*yield*/, o.save()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * updatePassword
     */
    UserService.prototype.updatePassword = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var o;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (model.password && model.newPassword) {
                            model.password = js_md5_1.default(model.password);
                            model.newPassword = js_md5_1.default(model.newPassword);
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.entityDao.findOne({
                                where: {
                                    id: model.id,
                                    password: model.password
                                }
                            })];
                    case 1:
                        o = _a.sent();
                        if (!o) {
                            return [2 /*return*/, null];
                        }
                        o.updateDate = Date.now();
                        o.password = model.newPassword;
                        return [4 /*yield*/, o.save()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 保存 新增 修改
     */
    UserService.prototype.create = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (model.password) {
                            model.password = js_md5_1.default(model.password);
                        }
                        return [4 /*yield*/, this.entityDao.create(__assign({ id: uuid.v1(), createDate: new Date(), updateDate: new Date() }, model))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return UserService;
}(baseService_1.default));
var userService = new UserService();
exports.default = userService;
