"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(sequelize, DataTypes) {
    return sequelize.define("sys_role_menu", {
        id: {
            type: DataTypes.STRING(64),
            allowNull: false,
            primaryKey: true,
            comment: "主键"
        },
        roleId: {
            type: DataTypes.STRING(64),
            allowNull: false,
            comment: "角色Id"
        },
        menuId: {
            type: DataTypes.STRING(64),
            allowNull: false,
            comment: "菜单Id"
        },
        createDate: {
            type: DataTypes.DATE,
            allowNull: true,
            primaryKey: false,
            // field: "create_date",
            comment: "创建日期"
        }
    }, {
        tableName: "sys_role_menu",
        createdAt: false,
        updatedAt: false //去掉默认字段
    });
}
exports.default = default_1;
