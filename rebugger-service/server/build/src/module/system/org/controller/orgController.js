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
var orgService_1 = __importDefault(require("../service/orgService"));
var baseController_1 = __importDefault(require("../../../base/controller/baseController"));
var OrgController = /** @class */ (function (_super) {
    __extends(OrgController, _super);
    function OrgController(entityService, prefix, option) {
        return _super.call(this, entityService, prefix, option) || this;
    }
    /**
     * getCustomRouter
     * 自定义扩展路由
     */
    OrgController.prototype.getCustomRouter = function () {
        return [
        // 自定义扩展
        // {
        //   url: this.profix + "/info",
        //   method: "post",
        //   function: async (ctx: Context) => {}
        // }
        ];
    };
    return OrgController;
}(baseController_1.default));
var orgController = new OrgController(orgService_1.default, "/api/org", {
    infoCacheable: false,
    findCacheable: false
});
var orgRouter = orgController
    .getBaseRouter()
    .concat(orgController.getCustomRouter());
exports.default = orgRouter;
