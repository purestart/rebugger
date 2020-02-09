"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(sequelize, DataTypes) {
    return sequelize.define("sys_role", {
        id: {
            type: DataTypes.STRING(64),
            allowNull: false,
            primaryKey: true,
            comment: "主键"
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "角色名称"
        },
        remark: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: "备注"
        },
        isAdmin: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "是否为管理员"
        },
        retainField1: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "保留字段"
        },
        retainField2: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "保留字段"
        },
        retainField3: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "保留字段"
        },
        createDate: {
            type: DataTypes.DATE,
            allowNull: true,
            primaryKey: false,
            // field: "create_date",
            comment: "创建日期"
        },
        updateDate: {
            type: DataTypes.DATE,
            allowNull: true,
            primaryKey: false,
            // field: "update_date",
            comment: "修改日期"
        }
    }, {
        tableName: "sys_role",
        createdAt: false,
        updatedAt: false //去掉默认字段
    });
}
exports.default = default_1;
