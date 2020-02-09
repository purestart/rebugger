"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var userController_1 = __importDefault(require("../module/system/user/controller/userController"));
var authController_1 = __importDefault(require("../module/system/auth/controller/authController"));
var reportController_1 = __importDefault(require("../module/report/controller/reportController"));
var projectController_1 = __importDefault(require("../module/project/controller/projectController"));
var ipAuthController_1 = __importDefault(require("../module/ipAuth/controller/ipAuthController"));
var roleController_1 = __importDefault(require("../module/system/role/controller/roleController"));
var menuController_1 = __importDefault(require("../module/system/menu/controller/menuController"));
var orgController_1 = __importDefault(require("../module/system/org/controller/orgController"));
var configController_1 = __importDefault(require("../module/system/config/controller/configController"));
var dictController_1 = __importDefault(require("../module/system/dict/controller/dictController"));
var dashboardController_1 = __importDefault(require("../module/dashboard/controller/dashboardController"));
exports.default = {
    userController: userController_1.default,
    authController: authController_1.default,
    reportController: reportController_1.default,
    projectController: projectController_1.default,
    ipAuthController: ipAuthController_1.default,
    roleController: roleController_1.default,
    menuController: menuController_1.default,
    orgController: orgController_1.default,
    configController: configController_1.default,
    dictController: dictController_1.default,
    dashboardController: dashboardController_1.default
};
