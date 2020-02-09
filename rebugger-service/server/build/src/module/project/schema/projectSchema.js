"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(sequelize, DataTypes) {
    return sequelize.define("project", {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            comment: "主键"
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "项目名称"
        },
        type: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "类型 1 PC 2 移动 3 小程序"
        },
        language: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "编写语言"
        },
        frame: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "框架"
        },
        code: {
            type: DataTypes.STRING(64),
            unique: true,
            allowNull: false,
            comment: "项目编码"
        },
        apikey: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            comment: "项目秘钥"
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "项目封面"
        },
        domain: {
            type: DataTypes.STRING(1024),
            allowNull: true,
            comment: "允许域名"
        },
        description: {
            type: DataTypes.STRING(1024),
            allowNull: true,
            comment: "描述"
        },
        retainNameConfig: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "保留字段配置"
        },
        retainIdConfig: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "保留字段配置"
        },
        retainFieldConfig: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "保留字段配置"
        },
        moduleConfig: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "模块分类配置"
        },
        tenantId: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "租户Id"
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
        tableName: "project",
        createdAt: false,
        updatedAt: false //去掉默认字段
    });
}
exports.default = default_1;
