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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var baseService_1 = __importDefault(require("../../base/service/baseService"));
var projectService_1 = __importDefault(require("../../project/service/projectService"));
var mysql_1 = __importDefault(require("../../../utils/mysql"));
var sequelize_1 = __importDefault(require("sequelize"));
var reportSchema_1 = __importDefault(require("../schema/reportSchema"));
var default_1 = __importDefault(require("../../../../config/default"));
var cacheUtil_1 = __importDefault(require("../../../utils/cacheUtil"));
var ReportDao = reportSchema_1.default(mysql_1.default, sequelize_1.default);
var uuid = require("node-uuid");
var logger_1 = __importDefault(require("../../../middleware/logger"));
var Op = sequelize_1.default.Op;
// 重新生成表
// ReportDao.sync({ alter: true, force: true });
var ReportService = /** @class */ (function (_super) {
    __extends(ReportService, _super);
    function ReportService() {
        return _super.call(this, ReportDao) || this;
    }
    /**
     * 重写 保存 新增
     * override
     */
    ReportService.prototype.create = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var apikey, options, project, currentProject, metaObj, retainNameConfig, retainIdConfig, retainFieldConfig, moduleConfig, module_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(process.env.NODE_ENV);
                        apikey = model.apikey;
                        if (!(apikey && apikey.length > 0)) return [3 /*break*/, 2];
                        options = {
                            keyPrefix: "report:",
                            exprires: 60000 * 10 // 10分钟缓存
                        };
                        return [4 /*yield*/, projectService_1.default.find({ apikey: apikey }, true, options)];
                    case 1:
                        project = _a.sent();
                        if (project && project.length == 1) {
                            currentProject = project[0];
                            // 取自定义字段
                            if (model.metaData && model.metaData.length > 5) {
                                metaObj = JSON.parse(model.metaData);
                                if (currentProject.retainNameConfig && currentProject.retainNameConfig.length > 0) {
                                    console.log(currentProject.retainNameConfig);
                                    retainNameConfig = JSON.parse(currentProject.retainNameConfig);
                                    console.log(retainNameConfig);
                                    model.retainName = metaObj[retainNameConfig.meta];
                                }
                                if (currentProject.retainIdConfig && currentProject.retainIdConfig.length > 0) {
                                    retainIdConfig = JSON.parse(currentProject.retainIdConfig);
                                    model.retainId = metaObj[retainIdConfig.meta];
                                }
                                if (currentProject.retainFieldConfig &&
                                    currentProject.retainFieldConfig.length > 0) {
                                    retainFieldConfig = JSON.parse(currentProject.retainFieldConfig);
                                    model.retainField = metaObj[retainFieldConfig.meta];
                                }
                            }
                            // 取子模块
                            if (currentProject.moduleConfig && currentProject.moduleConfig.length > 0) {
                                moduleConfig = JSON.parse(currentProject.moduleConfig);
                                module_1 = moduleConfig.find(function (item) { return model.url.indexOf(item.prefix) != -1; });
                                if (module_1) {
                                    model.moduleName = module_1.moduleName;
                                }
                            }
                        }
                        if (project && project.length == 1) {
                            model.code = project[0].code;
                            model.projectName = project[0].name;
                            model.resolveStatus = 0; // 初始化解决状态
                        }
                        else {
                            return [2 /*return*/, {
                                    code: 503,
                                    data: null,
                                    errMsg: "report error, no this project"
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2: return [2 /*return*/, {
                            code: 503,
                            data: null,
                            errMsg: "report error, no this project"
                        }];
                    case 3: return [4 /*yield*/, this.entityDao.create(__assign({ id: uuid.v1(), createDate: new Date(), updateDate: new Date() }, model))];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * createList 批量上传数据
     */
    ReportService.prototype.createList = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                // let errorObj = null;
                model.list.forEach(function (item) { return __awaiter(_this, void 0, void 0, function () {
                    var error_1, errorObj;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, this.create(item)];
                            case 1:
                                _a.sent();
                                return [3 /*break*/, 3];
                            case 2:
                                error_1 = _a.sent();
                                errorObj = {
                                    message: error_1.message + ": " + (error_1.parent ? error_1.parent.message : ''),
                                    url: "/api/report/createList",
                                    method: "post",
                                    body: JSON.stringify(item)
                                };
                                logger_1.default.logger.log("error", errorObj);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
                // if(errorObj){
                //   throw errorObj;
                // }
                return [2 /*return*/, { list: [], total: model.list.length }];
            });
        });
    };
    /**
     * 重写 查询list
     */
    ReportService.prototype.list = function (pageNum, pageSize, whereParams) {
        if (pageNum === void 0) { pageNum = 1; }
        if (pageSize === void 0) { pageSize = 10; }
        return __awaiter(this, void 0, void 0, function () {
            var project, _a, startTime, _b, endTime, where, emitTime, projectWhere, projectRet, total, offset, list, result;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        project = null;
                        _a = whereParams.startTime, startTime = _a === void 0 ? null : _a, _b = whereParams.endTime, endTime = _b === void 0 ? null : _b, where = __rest(whereParams, ["startTime", "endTime"]);
                        // 时间间隔查询
                        if (startTime && endTime) {
                            emitTime = (_c = {},
                                _c[Op.gt] = startTime,
                                _c[Op.lt] = endTime,
                                _c);
                            where = __assign({ emitTime: emitTime }, where);
                        }
                        console.log(where);
                        if (!((where.code && where.code.length > 0) || (where.projectName && where.projectName.length > 0))) return [3 /*break*/, 2];
                        projectWhere = {};
                        if (where.projectName && where.projectName.length > 0) {
                            projectWhere = { name: where.projectName };
                        }
                        if (where.code && where.code.length > 0) {
                            projectWhere = { code: where.code };
                        }
                        return [4 /*yield*/, projectService_1.default.find(__assign({}, projectWhere), true)];
                    case 1:
                        projectRet = _d.sent();
                        if (projectRet && projectRet.length > 0) {
                            projectRet[0].apikey = "";
                            project = projectRet[0];
                        }
                        _d.label = 2;
                    case 2:
                        total = 0;
                        return [4 /*yield*/, this.entityDao.count({ where: where }, { logging: true })];
                    case 3:
                        total = _d.sent();
                        if (total < 1) {
                            return [2 /*return*/, {
                                    pageSize: pageSize,
                                    pageNum: pageNum,
                                    list: [],
                                    total: 0,
                                    project: project
                                }];
                        }
                        offset = 0;
                        if (pageNum > 1) {
                            offset = (pageNum - 1) * pageSize;
                        }
                        return [4 /*yield*/, this.entityDao.findAll({
                                where: where,
                                order: [["emitTime", "DESC"]],
                                offset: offset,
                                limit: pageSize
                            })];
                    case 4:
                        list = _d.sent();
                        result = {
                            pageSize: pageSize,
                            pageNum: pageNum,
                            list: list,
                            total: total,
                            project: project
                        };
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * 重写 查询已解决list
     */
    ReportService.prototype.resolveList = function (pageNum, pageSize, whereParams) {
        if (pageNum === void 0) { pageNum = 1; }
        if (pageSize === void 0) { pageSize = 10; }
        return __awaiter(this, void 0, void 0, function () {
            var project, _a, startTime, _b, endTime, where, emitTime, total, offset, list, result;
            var _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        project = null;
                        _a = whereParams.startTime, startTime = _a === void 0 ? null : _a, _b = whereParams.endTime, endTime = _b === void 0 ? null : _b, where = __rest(whereParams, ["startTime", "endTime"]);
                        // 时间间隔查询
                        if (startTime && endTime) {
                            emitTime = (_c = {},
                                _c[Op.gt] = startTime,
                                _c[Op.lt] = endTime,
                                _c);
                            where = __assign(__assign({ emitTime: emitTime }, where), { type: (_d = {},
                                    _d[Op.notIn] = ["info", "warning"],
                                    _d), resolveStatus: (_e = {},
                                    _e[Op.lte] = 0,
                                    _e) });
                        }
                        total = 0;
                        return [4 /*yield*/, this.entityDao.count({ where: where }, { logging: true })];
                    case 1:
                        total = _f.sent();
                        if (total < 1) {
                            return [2 /*return*/, {
                                    pageSize: pageSize,
                                    pageNum: pageNum,
                                    list: [],
                                    total: 0
                                    // project
                                }];
                        }
                        offset = 0;
                        if (pageNum > 1) {
                            offset = (pageNum - 1) * pageSize;
                        }
                        return [4 /*yield*/, this.entityDao.findAll({
                                where: where,
                                order: [["emitTime", "DESC"]],
                                offset: offset,
                                limit: pageSize
                            })];
                    case 2:
                        list = _f.sent();
                        result = {
                            pageSize: pageSize,
                            pageNum: pageNum,
                            list: list,
                            total: total
                            // project
                        };
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * 更新 异常状态
     *
     */
    ReportService.prototype.resolveStatus = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var o;
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
                        // 更新部分字段
                        o.resolveStatus = model.resolveStatus;
                        o.resolveUserId = model.resolveUserId;
                        o.resolveUserName = model.resolveUserName;
                        if (model.comment) {
                            o.comment = model.comment;
                        }
                        return [4 /*yield*/, o.save()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
       * id 查询字段
       * cacheable 是否开启缓存
       */
    ReportService.prototype.info = function (id, cacheable, options) {
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
    return ReportService;
}(baseService_1.default));
var repoetService = new ReportService();
exports.default = repoetService;
