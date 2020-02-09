"use strict";
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ''
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ''
        },
        loginName: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: '',
            field: "login_name"
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: ''
        },
        tel: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ''
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ''
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ''
        },
        sex: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: ''
        },
        roles: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ''
        },
        createDate: {
            type: DataTypes.DATE,
            allowNull: true,
            primaryKey: false,
            field: "create_date"
        },
        updateDate: {
            type: DataTypes.DATE,
            allowNull: true,
            primaryKey: false,
            field: "update_date"
        }
    }, {
        tableName: 'user',
        createdAt: false,
        updatedAt: false //去掉默认字段
    });
};
