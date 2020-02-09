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
var mysql_1 = __importDefault(require("../../../../utils/mysql"));
var sequelize_1 = __importDefault(require("sequelize"));
var userSchema_1 = __importDefault(require("../../user/schema/userSchema"));
var UserDao = userSchema_1.default(mysql_1.default, sequelize_1.default); // 引入user的表结构
var jwt = require('jsonwebtoken');
var default_1 = __importDefault(require("../../../../../config/default"));
var js_md5_1 = __importDefault(require("js-md5"));
var authService = /** @class */ (function () {
    function authService() {
    }
    /**
     * login 46f94c8de14fb36680850768ff1b7f2a
     */
    authService.prototype.login = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var ret, payload, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (params.password) {
                            params.password = js_md5_1.default(params.password);
                        }
                        if (!(params.userName && params.password)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.loginByLoginName(params.userName, params.password)];
                    case 1:
                        ret = _a.sent();
                        if (ret) {
                            ret.password = "";
                            payload = { userId: ret.id, time: new Date().getTime(), timeout: 1000 * 60 * 60 * 2 };
                            token = jwt.sign(payload, default_1.default.secret);
                            return [2 /*return*/, {
                                    code: 200,
                                    data: ret,
                                    token: token
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    code: 503,
                                    data: null,
                                    message: "登录失败,账号或密码错误！"
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2: return [2 /*return*/, {
                            code: 503,
                            data: null,
                            message: "登录失败,账号或密码错误！"
                        }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * name
     */
    authService.prototype.loginByLoginName = function (loginName, password) {
        return __awaiter(this, void 0, void 0, function () {
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
        });
    };
    /**
     * loginByEmail
     */
    authService.prototype.loginByEmail = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
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
        });
    };
    return authService;
}());
var authServiceImpl = new authService();
exports.default = authServiceImpl;
