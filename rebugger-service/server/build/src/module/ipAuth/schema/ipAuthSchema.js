"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(sequelize, DataTypes) {
    return sequelize.define("ip_auth", {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            comment: "主键"
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "环境名称"
        },
        type: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "类型 1 允许访问的域名 2 禁止访问的域名 3 禁止ip列表"
        },
        domain: {
            type: DataTypes.TEXT,
            allowNull: false,
            comment: "允许域名JSON数据"
        },
        description: {
            type: DataTypes.STRING(1024),
            allowNull: true,
            comment: "描述"
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
        tableName: "ip_auth",
        createdAt: false,
        updatedAt: false //去掉默认字段
    });
}
exports.default = default_1;
