"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(sequelize, DataTypes) {
    return sequelize.define("sys_config", {
        id: {
            type: DataTypes.STRING(64),
            allowNull: false,
            primaryKey: true,
            comment: "主键"
        },
        paramKey: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "key"
        },
        paramValue: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "value"
        },
        remark: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: "备注"
        },
        retainField1: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "保留字段"
        },
        isDel: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "物理删除 0 不删除 1 删除"
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
        tableName: "sys_config",
        createdAt: false,
        updatedAt: false //去掉默认字段
    });
}
exports.default = default_1;
