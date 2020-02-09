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
var userService_1 = __importDefault(require("../service/userService"));
exports.default = [
    {
        url: "/api/user/info",
        method: "get",
        function: function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
            var id, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = ctx.request.query.id;
                        return [4 /*yield*/, userService_1.default.info(id)];
                    case 1:
                        ret = _a.sent();
                        if (ret) {
                            ctx.response.body = {
                                code: 200,
                                data: ret
                            };
                        }
                        else {
                            ctx.response.body = {
                                code: 503,
                                data: null,
                                errMsg: "查询错误"
                            };
                        }
                        return [2 /*return*/];
                }
            });
        }); }
    },
    {
        url: "/api/user/delete",
        method: "post",
        function: function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
            var ids, ret_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ids = ctx.request.body.ids;
                        if (!(ids && ids.length > 0)) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        ret_1 = null;
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                ids.forEach(function (id, idx) { return __awaiter(void 0, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, userService_1.default.delete(id)];
                                            case 1:
                                                ret_1 = _a.sent();
                                                if (idx == ids.length - 1) {
                                                    resolve();
                                                }
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                            })];
                    case 2:
                        _a.sent();
                        if (ret_1) {
                            ctx.response.body = {
                                code: 200,
                                data: ret_1
                            };
                        }
                        else {
                            ctx.response.body = {
                                code: 503,
                                data: null
                            };
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        ctx.response.body = {
                            code: 503,
                            data: null,
                            errMsg: "no this data"
                        };
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        ctx.response.body = {
                            code: 503,
                            data: null,
                            errMsg: "请传入要删除的id"
                        };
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); }
    },
    {
        url: "/api/user/create",
        method: "post",
        function: function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
            var obj, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        obj = ctx.request.body;
                        return [4 /*yield*/, userService_1.default.create(obj)];
                    case 1:
                        ret = _a.sent();
                        if (ret) {
                            ctx.response.body = {
                                code: 200,
                                data: ret
                            };
                        }
                        else {
                            ctx.response.body = {
                                code: 503,
                                data: null,
                                errMsg: "创建失败"
                            };
                        }
                        return [2 /*return*/];
                }
            });
        }); }
    },
    {
        url: "/api/user/list",
        method: "post",
        function: function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
            var pageSize, pageNum, name, searchParams, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pageSize = ctx.request.query.pageSize
                            ? parseInt(ctx.request.query.pageSize)
                            : 10;
                        pageNum = ctx.request.query.pageNum
                            ? parseInt(ctx.request.query.pageNum)
                            : 1;
                        name = ctx.request.query.name;
                        if (name && name.length > 0) {
                            searchParams.name = name;
                        }
                        else {
                            searchParams = {};
                        }
                        return [4 /*yield*/, userService_1.default.list(pageSize, pageNum, searchParams)];
                    case 1:
                        ret = _a.sent();
                        if (ret) {
                            ctx.response.body = {
                                code: 200,
                                data: ret
                            };
                        }
                        else {
                            ctx.response.body = {
                                code: 503,
                                data: null
                            };
                        }
                        return [2 /*return*/];
                }
            });
        }); }
    },
    {
        url: "/api/user/update",
        method: "post",
        function: function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
            var obj, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        obj = ctx.request.body;
                        return [4 /*yield*/, userService_1.default.update(obj)];
                    case 1:
                        ret = _a.sent();
                        if (ret) {
                            ctx.response.body = {
                                code: 200,
                                data: ret
                            };
                        }
                        else {
                            ctx.response.body = {
                                code: 503,
                                data: null,
                                errMsg: "更新失败"
                            };
                        }
                        return [2 /*return*/];
                }
            });
        }); }
    }
];
