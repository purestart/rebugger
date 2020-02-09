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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var baseService_1 = __importDefault(require("../../../base/service/baseService"));
var mysql_1 = __importDefault(require("../../../../utils/mysql"));
var sequelize_1 = __importDefault(require("sequelize"));
var configSchema_1 = __importDefault(require("../schema/configSchema"));
var configDao = configSchema_1.default(mysql_1.default, sequelize_1.default);
// 重新生成表
// configDao.sync({ alter: true, force: true });
var ConfigService = /** @class */ (function (_super) {
    __extends(ConfigService, _super);
    function ConfigService() {
        return _super.call(this, configDao) || this;
    }
    return ConfigService;
}(baseService_1.default));
var configService = new ConfigService();
exports.default = configService;
