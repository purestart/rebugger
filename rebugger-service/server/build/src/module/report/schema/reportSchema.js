"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// var moment = require('moment');
// import moment from "moment";
function default_1(sequelize, DataTypes) {
    return sequelize.define("report", {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            comment: "主键"
        },
        code: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "",
            // unique: true,
            comment: "项目编码"
        },
        projectName: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "",
            comment: "项目名称"
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "异常名称"
        },
        type: {
            type: DataTypes.STRING(32),
            allowNull: true,
            comment: "异常类型"
        },
        message: {
            type: DataTypes.STRING(2048),
            allowNull: true,
            comment: "异常信息"
        },
        OS: {
            type: DataTypes.STRING(64),
            allowNull: true,
            defaultValue: "",
            comment: "系统信息"
        },
        emitTime: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: "异常发生时间"
        },
        agent: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "",
            comment: "浏览器agent"
        },
        stack: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: "异常堆栈"
        },
        fileName: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "异常文件"
        },
        lineNumber: {
            type: DataTypes.STRING(32),
            allowNull: true,
            comment: "异常所在文件行"
        },
        columnNumber: {
            type: DataTypes.STRING(32),
            allowNull: true,
            comment: "异常所在文件列"
        },
        metaData: {
            type: DataTypes.STRING(1024),
            allowNull: true,
            comment: "其它信息"
        },
        componentName: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "异常组件"
        },
        // apikey: {
        //   type: DataTypes.STRING(64),
        //   allowNull: true,
        //   defaultValue: "",
        //   comment:"apikey"
        // },
        // availHeight:{
        //   type: DataTypes.STRING,
        //   allowNull: true,
        //   comment:"availHeight"
        // },
        // availWidth:{
        //   type: DataTypes.STRING,
        //   allowNull: true,
        //   comment:"availWidth"
        // },
        browser: {
            type: DataTypes.STRING(64),
            allowNull: true,
            defaultValue: "",
            comment: "浏览器"
        },
        cityNo: {
            type: DataTypes.STRING(32),
            allowNull: true,
            defaultValue: "",
            comment: "城市编码"
        },
        cityName: {
            type: DataTypes.STRING(32),
            allowNull: true,
            defaultValue: "",
            comment: "城市名称"
        },
        // clientHeight:{
        //   type: DataTypes.STRING,
        //   allowNull: true,
        //   comment:"clientHeight"
        // },
        // clientWidth:{
        //   type: DataTypes.STRING,
        //   allowNull: true,
        //   comment:"clientWidth"
        // },
        screenInfo: {
            type: DataTypes.STRING(128),
            allowNull: true,
            comment: "屏幕信息 包含availHeight、availWidth、clientHeight和clientWidth"
        },
        colorDepth: {
            type: DataTypes.STRING(32),
            allowNull: true,
            comment: "colorDepth"
        },
        height: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "屏幕高度"
        },
        ip: {
            type: DataTypes.STRING(32),
            allowNull: true,
            comment: "设备外网ip"
        },
        language: {
            type: DataTypes.STRING(16),
            allowNull: true,
            comment: "语言首选项"
        },
        online: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            comment: "网络是否在线"
        },
        pixelDepth: {
            type: DataTypes.STRING(32),
            allowNull: true,
            comment: "pixelDepth"
        },
        propsData: {
            type: DataTypes.STRING(2048),
            allowNull: true,
            comment: "组件参数"
        },
        url: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "当前url"
        },
        coreVersion: {
            type: DataTypes.STRING(64),
            allowNull: true,
            comment: "浏览器内核版本信息"
        },
        width: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "屏幕宽度"
        },
        src: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "资源src"
        },
        tagName: {
            type: DataTypes.STRING(32),
            allowNull: true,
            comment: "资源标签"
        },
        outerHtml: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "资源HTML"
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "状态码"
        },
        statusText: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "状态内容"
        },
        selector: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "资源选择器"
        },
        videoId: {
            type: DataTypes.STRING(64),
            allowNull: true,
            comment: "监控视频id"
        },
        retainName: {
            type: DataTypes.STRING(128),
            allowNull: true,
            comment: "保留字段"
        },
        retainId: {
            type: DataTypes.STRING(128),
            allowNull: true,
            comment: "保留字段"
        },
        retainField: {
            type: DataTypes.STRING(128),
            allowNull: true,
            comment: "保留字段"
        },
        env: {
            type: DataTypes.STRING(128),
            allowNull: true,
            comment: "环境 dev 开发 test pre pro"
        },
        resolveStatus: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "解决状态 0 未解决 1 已解决 2 其它原因"
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: "问题描述"
        },
        resolveUserId: {
            type: DataTypes.STRING(64),
            allowNull: true,
            comment: "当前解决用户ID"
        },
        resolveUserName: {
            type: DataTypes.STRING(64),
            allowNull: true,
            comment: "当前解决用户名称"
        },
        moduleName: {
            type: DataTypes.STRING(32),
            allowNull: true,
            comment: "子模块名称"
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
        tableName: "report",
        createdAt: false,
        updatedAt: false //去掉默认字段
    });
}
exports.default = default_1;
