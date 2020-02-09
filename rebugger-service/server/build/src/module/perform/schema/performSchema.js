"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(sequelize, DataTypes) {
    return sequelize.define("perform", {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            comment: "主键"
        },
        type: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "类型"
        }
    }, {
        tableName: "perform",
        createdAt: false,
        updatedAt: false //去掉默认字段
    });
}
exports.default = default_1;
