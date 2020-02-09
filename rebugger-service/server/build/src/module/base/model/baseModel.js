"use strict";
/**
 * 基础实例类
 */
Object.defineProperty(exports, "__esModule", { value: true });
var BaseEntity = /** @class */ (function () {
    function BaseEntity(id, updateDate, createDate) {
        this.id = id;
        this.updateDate = updateDate;
        this.createDate = createDate;
    }
    return BaseEntity;
}());
exports.default = BaseEntity;
