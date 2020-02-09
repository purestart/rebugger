"use strict";
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
var mysql_1 = __importDefault(require("../../../utils/mysql"));
var sequelize_1 = __importDefault(require("sequelize"));
var reportSchema_1 = __importDefault(require("../../report/schema/reportSchema"));
var ReportDao = reportSchema_1.default(mysql_1.default, sequelize_1.default); // 引入user的表结构
var jwt = require('jsonwebtoken');
var moment_1 = __importDefault(require("moment"));
var projectService_1 = __importDefault(require("../../project/service/projectService"));
var cacheUtil_1 = __importDefault(require("../../../utils/cacheUtil"));
var Op = sequelize_1.default.Op;
var DashboardService = /** @class */ (function () {
    function DashboardService() {
    }
    /**
     * name
     */
    DashboardService.prototype.stat = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            var obj, startTime, endTime, emitTime, dayTotalWhere, infoTotalWhere, errorTotalWhere, dayTotal, infoTotal, errorTotal, total, dailySum, projectSum, typeSum, ret;
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, cacheUtil_1.default.get("dashboard:stat")];
                    case 1:
                        obj = _f.sent();
                        if (obj && false) {
                            obj = JSON.parse(obj);
                            console.log("取缓存");
                            return [2 /*return*/, obj];
                        }
                        startTime = moment_1.default().startOf("day");
                        endTime = moment_1.default().endOf("day");
                        emitTime = (_a = {},
                            _a[Op.gt] = startTime,
                            _a[Op.lt] = endTime,
                            _a);
                        dayTotalWhere = {
                            emitTime: emitTime
                        };
                        infoTotalWhere = (_b = {
                                emitTime: emitTime
                            },
                            _b[Op.or] = [
                                { type: "info" },
                                { type: "warning" }
                            ],
                            _b);
                        errorTotalWhere = (_c = {
                                emitTime: emitTime
                            },
                            _c[Op.and] = [
                                { type: (_d = {}, _d[Op.ne] = "info", _d) },
                                { type: (_e = {}, _e[Op.ne] = "warning", _e) }
                            ],
                            _c);
                        return [4 /*yield*/, ReportDao.count({ where: dayTotalWhere }, { logging: true })];
                    case 2:
                        dayTotal = _f.sent();
                        return [4 /*yield*/, ReportDao.count({ where: infoTotalWhere }, { logging: true })];
                    case 3:
                        infoTotal = _f.sent();
                        return [4 /*yield*/, ReportDao.count({ where: errorTotalWhere }, { logging: true })];
                    case 4:
                        errorTotal = _f.sent();
                        return [4 /*yield*/, ReportDao.count({ where: {} }, { logging: true })];
                    case 5:
                        total = _f.sent();
                        return [4 /*yield*/, this.dailySum(12)];
                    case 6:
                        dailySum = _f.sent();
                        return [4 /*yield*/, this.statByProject()];
                    case 7:
                        projectSum = _f.sent();
                        return [4 /*yield*/, this.statByType()];
                    case 8:
                        typeSum = _f.sent();
                        ret = {
                            dayTotal: dayTotal,
                            infoTotal: infoTotal,
                            errorTotal: errorTotal,
                            total: total,
                            dailySum: dailySum,
                            projectSum: projectSum,
                            typeSum: typeSum
                        };
                        cacheUtil_1.default.set("dashboard:stat", JSON.stringify(ret), 60000 * 5);
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    /**
     * name
     *
     * 按天统计数据
     */
    DashboardService.prototype.dailySum = function (dayCount) {
        if (dayCount === void 0) { dayCount = 12; }
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                            var arr, i, date, emitTime, dayTotalWhere, dayTotal, obj;
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        arr = [];
                                        i = dayCount - 1;
                                        _b.label = 1;
                                    case 1:
                                        if (!(i > -1)) return [3 /*break*/, 4];
                                        date = moment_1.default().subtract('days', i).format('YYYY-MM-DD');
                                        emitTime = (_a = {},
                                            _a[Op.gt] = date + " 00:00:00",
                                            _a[Op.lt] = date + " 23:59:59",
                                            _a);
                                        dayTotalWhere = {
                                            emitTime: emitTime
                                        };
                                        dayTotal = 0;
                                        return [4 /*yield*/, ReportDao.count({ where: dayTotalWhere }, { logging: true })];
                                    case 2:
                                        dayTotal = _b.sent();
                                        obj = {
                                            date: date,
                                            dayTotal: dayTotal ? dayTotal : 0
                                        };
                                        arr.push(obj);
                                        _b.label = 3;
                                    case 3:
                                        i--;
                                        return [3 /*break*/, 1];
                                    case 4:
                                        resolve(arr);
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    /**
     * statByProject
     * 按项目统计当天数量
     */
    DashboardService.prototype.statByProject = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                            var arr, result, i, project, date, emitTime, dayTotalWhere, dayTotal, obj;
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        arr = [];
                                        return [4 /*yield*/, projectService_1.default.list(1, 10, {})];
                                    case 1:
                                        result = _b.sent();
                                        if (!(result && result.list && result.list.length > 0)) return [3 /*break*/, 5];
                                        i = 0;
                                        _b.label = 2;
                                    case 2:
                                        if (!(i < result.list.length)) return [3 /*break*/, 5];
                                        project = result.list[i];
                                        date = moment_1.default().subtract('days', 0).format('YYYY-MM-DD');
                                        emitTime = (_a = {},
                                            _a[Op.gt] = date + " 00:00:00",
                                            _a[Op.lt] = date + " 23:59:59",
                                            _a);
                                        dayTotalWhere = {
                                            emitTime: emitTime,
                                            code: project.code
                                        };
                                        dayTotal = 0;
                                        return [4 /*yield*/, ReportDao.count({ where: dayTotalWhere }, { logging: true })];
                                    case 3:
                                        dayTotal = _b.sent();
                                        obj = {
                                            id: project.id,
                                            name: project.name,
                                            date: date,
                                            total: dayTotal ? dayTotal : 0
                                        };
                                        arr.push(obj);
                                        _b.label = 4;
                                    case 4:
                                        i++;
                                        return [3 /*break*/, 2];
                                    case 5:
                                        resolve(arr);
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    /**
     * statByType
     * 按异常类型统计
     */
    DashboardService.prototype.statByType = function () {
        return __awaiter(this, void 0, void 0, function () {
            var types, typeNames, ret;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        types = ["unCaught", "caught", "info", "warning", "sourceError", "httpError", "unhandledRejection", "handledRejection"];
                        typeNames = ["捕获代码异常", "主动上报代码异常", "日志信息", "警告信息", "资源加载异常", "接口请求异常", "未处理promise异常", "已处理promise异常"];
                        return [4 /*yield*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                var arr, i, type, typeName, date, emitTime, dayTotalWhere, dayTotal, obj;
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            arr = [];
                                            i = 0;
                                            _b.label = 1;
                                        case 1:
                                            if (!(i < types.length)) return [3 /*break*/, 4];
                                            type = types[i];
                                            typeName = typeNames[i];
                                            date = moment_1.default().subtract('days', 0).format('YYYY-MM-DD');
                                            emitTime = (_a = {},
                                                _a[Op.gt] = date + " 00:00:00",
                                                _a[Op.lt] = date + " 23:59:59",
                                                _a);
                                            dayTotalWhere = {
                                                emitTime: emitTime,
                                                type: type
                                            };
                                            dayTotal = 0;
                                            return [4 /*yield*/, ReportDao.count({ where: dayTotalWhere }, { logging: true })];
                                        case 2:
                                            dayTotal = _b.sent();
                                            obj = {
                                                type: type,
                                                typeName: typeName,
                                                date: date,
                                                total: dayTotal ? dayTotal : 0
                                            };
                                            arr.push(obj);
                                            _b.label = 3;
                                        case 3:
                                            i++;
                                            return [3 /*break*/, 1];
                                        case 4:
                                            resolve(arr);
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    return DashboardService;
}());
var dashboardService = new DashboardService();
exports.default = dashboardService;
