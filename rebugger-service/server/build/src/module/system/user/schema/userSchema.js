"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(sequelize, DataTypes) {
    return sequelize.define("sys_user", {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            comment: "主键"
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "",
            comment: "密码"
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "",
            comment: "用户名"
        },
        loginName: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "",
            comment: "登录名"
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "年龄"
        },
        tel: {
            type: DataTypes.STRING(64),
            allowNull: true,
            defaultValue: "",
            comment: "联系电话"
        },
        birthday: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: "生日"
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "",
            comment: "头像"
        },
        email: {
            type: DataTypes.STRING(64),
            allowNull: true,
            defaultValue: "",
            comment: "邮箱"
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "",
            comment: "地址"
        },
        sex: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "向别 0 女 1男"
        },
        profile: {
            type: DataTypes.STRING(2048),
            allowNull: true,
            defaultValue: "",
            comment: "简介"
        },
        roles: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "",
            comment: "角色"
        },
        orgId: {
            type: DataTypes.STRING(64),
            allowNull: true,
            comment: "组织Id"
        },
        orgName: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "所属部门"
        },
        tenantId: {
            type: DataTypes.STRING(64),
            allowNull: true,
            comment: "租户Id"
        },
        isDel: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "逻辑删除 0  1删除"
        },
        createDate: {
            type: DataTypes.DATE,
            allowNull: true,
            primaryKey: false,
            comment: "创建日期"
            // field: "create_date"
        },
        updateDate: {
            type: DataTypes.DATE,
            allowNull: true,
            primaryKey: false,
            comment: "更新日期"
        }
    }, {
        tableName: "sys_user",
        createdAt: false,
        updatedAt: false //去掉默认字段
    });
}
exports.default = default_1;
