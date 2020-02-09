"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(sequelize, DataTypes) {
    return sequelize.define("comment", {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            comment: "主键"
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "评论标题、名称"
        },
        type: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "类型 现在只有异常解决类型"
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: "内容"
        },
        bId: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "业务ID"
        },
        bName: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "业务名称"
        }
    }, {
        tableName: "comment",
        createdAt: false,
        updatedAt: false //去掉默认字段
    });
}
exports.default = default_1;
