"use strict";
/**
 * 基础service
 */
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
var default_1 = __importDefault(require("../../../../config/default"));
var cacheUtil_1 = __importDefault(require("../../../utils/cacheUtil"));
var uuid = require("node-uuid");
var baseService = /** @class */ (function () {
    function baseService(entityDao) {
        this.entityDao = entityDao;
    }
    /**
     * id 查询字段
     * cacheable 是否开启缓存
     */
    baseService.prototype.info = function (id, cacheable, options) {
        if (cacheable === void 0) { cacheable = false; }
        return __awaiter(this, void 0, void 0, function () {
            var obj, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!cacheable) return [3 /*break*/, 5];
                        return [4 /*yield*/, cacheUtil_1.default.get(id)];
                    case 1:
                        obj = _a.sent();
                        if (!obj) return [3 /*break*/, 2];
                        obj = JSON.parse(obj);
                        return [2 /*return*/, obj];
                    case 2: return [4 /*yield*/, this.entityDao.findOne({
                            where: {
                                id: id
                            }
                        })];
                    case 3:
                        ret = _a.sent();
                        if (ret) {
                            cacheUtil_1.default.set(id, JSON.stringify(ret), options && options.exprires
                                ? options.exprires
                                : default_1.default.redis.exprires);
                        }
                        return [2 /*return*/, ret];
                    case 4: return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.entityDao.findOne({
                            where: {
                                id: id
                            }
                        })];
                    case 6: return [2 /*return*/, _a.sent()];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 字段查询 返回列表 适用于少量数据的查询
     * where 搜索条件 返回所有
     * cacheable 是否开启缓存
     */
    baseService.prototype.find = function (where, cacheable, options) {
        if (cacheable === void 0) { cacheable = false; }
        return __awaiter(this, void 0, void 0, function () {
            var key, obj, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!cacheable) return [3 /*break*/, 5];
                        key = JSON.stringify(where);
                        if (options && options.keyPrefix) {
                            key = options.keyPrefix + key;
                        }
                        return [4 /*yield*/, cacheUtil_1.default.get(key)];
                    case 1:
                        obj = _a.sent();
                        if (!obj) return [3 /*break*/, 2];
                        obj = JSON.parse(obj);
                        return [2 /*return*/, obj];
                    case 2: return [4 /*yield*/, this.entityDao.findAll({
                            order: [["updateDate", "DESC"]],
                            where: where
                        })];
                    case 3:
                        ret = _a.sent();
                        if (ret) {
                            cacheUtil_1.default.set(key, JSON.stringify(ret), options && options.exprires
                                ? options.exprires
                                : default_1.default.redis.exprires);
                        }
                        return [2 /*return*/, ret];
                    case 4: return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.entityDao.findAll({
                            order: [["updateDate", "DESC"]],
                            where: where
                        })];
                    case 6: return [2 /*return*/, _a.sent()];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 分页查询
     */
    baseService.prototype.list = function (pageNum, pageSize, where) {
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
                        console.log(offset);
                        return [4 /*yield*/, this.entityDao.findAll({
                                where: where,
                                order: [["updateDate", "DESC"]],
                                offset: offset,
                                limit: pageSize
                            })];
                    case 2:
                        list = _a.sent();
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
     * 保存 新增 修改
     */
    baseService.prototype.create = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.entityDao.create(__assign({ id: uuid.v1(), createDate: new Date(), updateDate: new Date() }, model))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * createOrUpdate
     */
    baseService.prototype.createOrUpdate = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!model.id) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.update(model)];
                    case 1: 
                    // 修改
                    return [2 /*return*/, _a.sent()];
                    case 2: return [4 /*yield*/, this.create(model)];
                    case 3: 
                    // 创建
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * update
     */
    baseService.prototype.update = function (model, ignoreFields) {
        if (ignoreFields === void 0) { ignoreFields = []; }
        return __awaiter(this, void 0, void 0, function () {
            var defaultIgnore, o, key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        defaultIgnore = ["createDate"];
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
     * updateIfExist
     * 保存存在的字段 不存在或者undefined不保存
     */
    baseService.prototype.updateExist = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var o, key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.entityDao.findOne({
                            where: {
                                id: model.id
                            }
                        })];
                    case 1:
                        o = _a.sent();
                        o.updateDate = Date.now();
                        for (key in model) {
                            if (key && model[key] !== undefined) {
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
     * delete
     */
    baseService.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var o;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.entityDao.findOne({
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
        });
    };
    return baseService;
}());
exports.default = baseService;
