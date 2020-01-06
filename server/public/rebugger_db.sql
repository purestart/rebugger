/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50711
Source Host           : localhost:3306
Source Database       : rebugger_db

Target Server Type    : MYSQL
Target Server Version : 50711
File Encoding         : 65001

Date: 2020-01-06 18:25:39
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for ip_auth
-- ----------------------------
DROP TABLE IF EXISTS `ip_auth`;
CREATE TABLE `ip_auth` (
  `id` varchar(255) NOT NULL COMMENT '主键',
  `name` varchar(255) NOT NULL COMMENT '环境名称',
  `type` int(11) DEFAULT NULL COMMENT '类型 1 允许访问的域名 2 禁止访问的域名 3 禁止ip列表',
  `domain` text NOT NULL COMMENT '允许域名JSON数据',
  `description` varchar(1024) DEFAULT NULL COMMENT '描述',
  `create_date` datetime DEFAULT NULL COMMENT '创建日期',
  `update_date` datetime DEFAULT NULL COMMENT '修改日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ip_auth
-- ----------------------------

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `id` varchar(255) NOT NULL COMMENT '主键',
  `name` varchar(255) NOT NULL COMMENT '项目名称',
  `type` int(11) DEFAULT NULL COMMENT '类型 1 PC 2 移动 3 小程序',
  `language` varchar(255) DEFAULT NULL COMMENT '编写语言',
  `frame` varchar(255) DEFAULT NULL COMMENT '框架',
  `code` varchar(64) NOT NULL COMMENT '项目编码',
  `apikey` varchar(255) NOT NULL COMMENT '项目秘钥',
  `image` varchar(255) DEFAULT NULL COMMENT '项目封面',
  `domain` varchar(1024) DEFAULT NULL COMMENT '允许域名',
  `description` varchar(1024) DEFAULT NULL COMMENT '描述',
  `retain_name_config` varchar(255) DEFAULT NULL COMMENT '保留字段配置',
  `retain_id_config` varchar(255) DEFAULT NULL COMMENT '保留字段配置',
  `retain_field_config` varchar(255) DEFAULT NULL COMMENT '保留字段配置',
  `module_config` varchar(255) DEFAULT NULL COMMENT '模块分类配置',
  `create_date` datetime DEFAULT NULL COMMENT '创建日期',
  `update_date` datetime DEFAULT NULL COMMENT '修改日期',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  UNIQUE KEY `apikey` (`apikey`),
  UNIQUE KEY `code_2` (`code`),
  UNIQUE KEY `apikey_2` (`apikey`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of project
-- ----------------------------
INSERT INTO `project` VALUES ('46ae0b10-26ec-11ea-9ca3-4d070c34f5f7', 'purestart', '1', null, null, 'pos-web', 'b402fd20-262d-11ea-8a78-557d3d32d13c', null, 'localhost,127.0.0.1', null, null, null, null, null, '2019-12-25 07:58:02', '2020-01-03 08:14:53');

-- ----------------------------
-- Table structure for report
-- ----------------------------
DROP TABLE IF EXISTS `report`;
CREATE TABLE `report` (
  `id` varchar(255) NOT NULL COMMENT '主键',
  `code` varchar(255) DEFAULT '' COMMENT '项目编码',
  `name` varchar(255) DEFAULT NULL COMMENT '异常名称',
  `type` varchar(32) DEFAULT NULL COMMENT '异常类型',
  `message` varchar(255) DEFAULT NULL COMMENT '异常信息',
  `o_s` varchar(64) DEFAULT '' COMMENT '系统信息',
  `emit_time` datetime DEFAULT NULL COMMENT '异常发生时间',
  `agent` varchar(255) DEFAULT '' COMMENT '浏览器agent',
  `stack` text COMMENT '异常堆栈',
  `file_name` varchar(255) DEFAULT NULL COMMENT '异常文件',
  `line_number` varchar(32) DEFAULT NULL COMMENT '异常所在文件行',
  `column_number` varchar(32) DEFAULT NULL COMMENT '异常所在文件列',
  `meta_data` varchar(1024) DEFAULT NULL COMMENT '其它信息',
  `component_name` varchar(255) DEFAULT NULL COMMENT '异常组件',
  `browser` varchar(64) DEFAULT '' COMMENT '浏览器',
  `city_no` varchar(32) DEFAULT '' COMMENT '城市编码',
  `city_name` varchar(32) DEFAULT '' COMMENT '城市名称',
  `screen_info` varchar(128) DEFAULT NULL COMMENT '屏幕信息 包含availHeight、availWidth、clientHeight和clientWidth',
  `color_depth` varchar(32) DEFAULT NULL COMMENT 'colorDepth',
  `height` int(11) DEFAULT NULL COMMENT '屏幕高度',
  `ip` varchar(32) DEFAULT NULL COMMENT '设备外网ip',
  `language` varchar(16) DEFAULT NULL COMMENT '语言首选项',
  `online` tinyint(1) DEFAULT NULL COMMENT '网络是否在线',
  `pixel_depth` varchar(32) DEFAULT NULL COMMENT 'pixelDepth',
  `props_data` varchar(255) DEFAULT NULL COMMENT '组件参数',
  `url` varchar(255) DEFAULT NULL COMMENT '当前url',
  `core_version` varchar(64) DEFAULT NULL COMMENT '浏览器内核版本信息',
  `width` int(11) DEFAULT NULL COMMENT '屏幕宽度',
  `src` varchar(255) DEFAULT NULL COMMENT '资源src',
  `tag_name` varchar(32) DEFAULT NULL COMMENT '资源标签',
  `outer_html` varchar(255) DEFAULT NULL COMMENT '资源HTML',
  `status` int(11) DEFAULT NULL COMMENT '状态码',
  `status_text` varchar(255) DEFAULT NULL COMMENT '状态内容',
  `selector` varchar(255) DEFAULT NULL COMMENT '资源选择器',
  `video_id` varchar(64) DEFAULT NULL COMMENT '监控视频id',
  `retain_name` varchar(128) DEFAULT NULL COMMENT '保留字段',
  `retain_id` varchar(128) DEFAULT NULL COMMENT '保留字段',
  `retain_field` varchar(128) DEFAULT NULL COMMENT '保留字段',
  `resolved_status` int(11) DEFAULT NULL COMMENT '解决状态 0 未解决 1 已解决 2 其它原因',
  `comment` text COMMENT '问题描述',
  `resolve_user_id` varchar(64) DEFAULT NULL COMMENT '当前解决用户ID',
  `resolve_user_name` varchar(64) DEFAULT NULL COMMENT '当前解决用户名称',
  `module_name` varchar(32) DEFAULT NULL COMMENT '子模块名称',
  `create_date` datetime DEFAULT NULL COMMENT '创建日期',
  `update_date` datetime DEFAULT NULL COMMENT '修改日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of report
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `login_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `sex` int(11) DEFAULT NULL,
  `birthday` datetime DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `profile` varchar(255) DEFAULT NULL,
  `roles` varchar(255) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('sad001', 'zcl', 'purestart', '123qwe', '', null, null, null, null, null, null, null, null, '2019-12-17 17:48:14', null);
