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
var baseService_1 = __importDefault(require("../../base/service/baseService"));
var mysql_1 = __importDefault(require("../../../utils/mysql"));
var sequelize_1 = __importDefault(require("sequelize"));
var ipAuthSchema_1 = __importDefault(require("../schema/ipAuthSchema"));
var ipAuthDao = ipAuthSchema_1.default(mysql_1.default, sequelize_1.default);
// 重新生成表
// ipAuthDao.sync({ alter: true, force: true });
var IpAuthService = /** @class */ (function (_super) {
    __extends(IpAuthService, _super);
    function IpAuthService() {
        return _super.call(this, ipAuthDao) || this;
    }
    /**
     * createOrUpdateDomain
     */
    IpAuthService.prototype.createOrUpdateDomain = function (domains, oldDomains) {
        return __awaiter(this, void 0, void 0, function () {
            var deleteArr, oldDomainsArr, newDomainArr_1, ret, obj, domainStr, tmpArr, entity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        deleteArr = [];
                        if (!domains || domains.length == 0) {
                            return [2 /*return*/];
                        }
                        if (oldDomains && oldDomains.length > 0) {
                            oldDomainsArr = oldDomains.split(",");
                            newDomainArr_1 = domains.split(",");
                            oldDomainsArr.forEach(function (item) {
                                var existItem = newDomainArr_1.find(function (el) { return el === item; });
                                if (!existItem && existItem !== "localhost" && existItem !== "127.0.0.1") {
                                    deleteArr.push(item);
                                }
                            });
                        }
                        return [4 /*yield*/, this.find({ type: 1 })];
                    case 1:
                        ret = _a.sent();
                        ret = ret || [];
                        if (ret.length == 1) {
                            obj = ret[0];
                            domainStr = "";
                            if (obj.domain && obj.domain.length > 0) {
                                domainStr = obj.domain + "," + domains;
                            }
                            else {
                                domainStr = domains;
                            }
                            tmpArr = domainStr.split(",");
                            tmpArr = Array.from(new Set(tmpArr));
                            if (deleteArr.length > 0) {
                                // 做差集
                                tmpArr = tmpArr.filter(function (item) { return !deleteArr.some(function (ele) { return ele === item; }); });
                            }
                            domainStr = tmpArr.join(",");
                            if (obj.domain != domainStr) {
                                obj.domain = domainStr;
                                this.update(obj);
                            }
                        }
                        else if (ret.length == 0) {
                            entity = {
                                type: 1,
                                name: "允许域名访问列表",
                                domain: domains
                            };
                            this.create(entity);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return IpAuthService;
}(baseService_1.default));
var ipAuthService = new IpAuthService();
exports.default = ipAuthService;
