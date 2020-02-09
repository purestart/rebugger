/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50711
Source Host           : localhost:3306
Source Database       : front_logger_db

Target Server Type    : MYSQL
Target Server Version : 50711
File Encoding         : 65001

Date: 2020-01-14 14:31:12
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
  `tenant_id` varchar(255) DEFAULT NULL COMMENT '租户Id',
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
INSERT INTO `project` VALUES ('24128b80-3119-11ea-9117-850dfbbbeb3d', '慧影云', '1', 'js', 'modular', 'oristar', '80827855-3086-4343-8af4-83f0fc0803fc', '/static/assets/swas.png', null, null, '{\"title\":\"用户名\",\"meta\":\"fullName\",\"hideField\":true,\"searchAble\":true}', null, null, null, null, '2020-01-07 06:44:23', '2020-01-06 22:44:23');
INSERT INTO `project` VALUES ('df790830-32d7-11ea-ae13-2d89b96beef0', 'pos端', '1', 'js', 'vue', 'pos-web', '9638ef8d-4f4d-4c31-b952-d9947f7054b1', '/static/assets/javascript.jpg', null, null, null, null, null, null, null, '2020-01-09 12:02:13', '2020-01-09 12:02:13');

-- ----------------------------
-- Table structure for report
-- ----------------------------
DROP TABLE IF EXISTS `report`;
CREATE TABLE `report` (
  `id` varchar(255) NOT NULL COMMENT '主键',
  `code` varchar(255) DEFAULT '' COMMENT '项目编码',
  `project_name` varchar(255) DEFAULT '' COMMENT '项目名称',
  `name` varchar(255) DEFAULT NULL COMMENT '异常名称',
  `type` varchar(32) DEFAULT NULL COMMENT '异常类型',
  `message` varchar(2048) DEFAULT NULL COMMENT '异常信息',
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
  `env` varchar(128) DEFAULT NULL COMMENT '环境 dev 开发 test pre pro',
  `resolve_status` int(11) DEFAULT NULL COMMENT '解决状态 0 未解决 1 已解决 2 其它原因',
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
-- Table structure for sys_config
-- ----------------------------
DROP TABLE IF EXISTS `sys_config`;
CREATE TABLE `sys_config` (
  `id` varchar(64) NOT NULL COMMENT '主键',
  `param_key` varchar(255) NOT NULL COMMENT 'key',
  `param_value` varchar(255) NOT NULL COMMENT 'value',
  `remark` text COMMENT '备注',
  `retain_field1` varchar(255) DEFAULT NULL COMMENT '保留字段',
  `is_del` int(11) DEFAULT NULL COMMENT '物理删除 0 不删除 1 删除',
  `create_date` datetime DEFAULT NULL COMMENT '创建日期',
  `update_date` datetime DEFAULT NULL COMMENT '修改日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_config
-- ----------------------------

-- ----------------------------
-- Table structure for sys_dict
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict`;
CREATE TABLE `sys_dict` (
  `id` varchar(64) NOT NULL COMMENT '主键',
  `name` varchar(255) NOT NULL COMMENT '字典名称',
  `type` varchar(255) NOT NULL COMMENT '字典类型',
  `code` varchar(255) NOT NULL COMMENT '字典码',
  `value` varchar(255) NOT NULL COMMENT '字典值',
  `seq` int(11) NOT NULL COMMENT '排序',
  `remark` text COMMENT '备注',
  `retain_field1` varchar(255) DEFAULT NULL COMMENT '保留字段',
  `is_del` int(11) DEFAULT NULL COMMENT '物理删除 0 不删除 1 删除',
  `create_date` datetime DEFAULT NULL COMMENT '创建日期',
  `update_date` datetime DEFAULT NULL COMMENT '修改日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_dict
-- ----------------------------

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu` (
  `id` varchar(64) NOT NULL COMMENT '主键',
  `menu_name` varchar(128) NOT NULL COMMENT '菜单名称',
  `url` varchar(255) NOT NULL COMMENT '菜单URL',
  `menu_code` varchar(64) DEFAULT NULL COMMENT '菜单编码/权限编码',
  `icon` varchar(64) DEFAULT NULL COMMENT '菜单图标',
  `parent_id` varchar(64) DEFAULT NULL COMMENT '父级Id',
  `seq` int(11) DEFAULT NULL COMMENT '排序',
  `position` varchar(64) DEFAULT NULL COMMENT '菜单位置',
  `product_code` varchar(64) DEFAULT NULL COMMENT '产品CODE',
  `is_del` int(11) DEFAULT NULL COMMENT '是否逻辑删除 0 否 1 是',
  `retain_field1` varchar(255) DEFAULT NULL COMMENT '保留字段',
  `retain_field2` varchar(255) DEFAULT NULL COMMENT '保留字段',
  `retain_field3` varchar(255) DEFAULT NULL COMMENT '保留字段',
  `create_date` datetime DEFAULT NULL COMMENT '创建日期',
  `update_date` datetime DEFAULT NULL COMMENT '修改日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------

-- ----------------------------
-- Table structure for sys_org
-- ----------------------------
DROP TABLE IF EXISTS `sys_org`;
CREATE TABLE `sys_org` (
  `id` varchar(64) NOT NULL COMMENT '主键',
  `name` varchar(255) NOT NULL COMMENT '组织名称',
  `code` varchar(255) NOT NULL COMMENT '组织编码',
  `parent_id` varchar(255) NOT NULL COMMENT '父级Id',
  `remark` text COMMENT '备注',
  `retain_field1` varchar(255) DEFAULT NULL COMMENT '保留字段',
  `retain_field2` varchar(255) DEFAULT NULL COMMENT '保留字段',
  `retain_field3` varchar(255) DEFAULT NULL COMMENT '保留字段',
  `is_del` int(11) DEFAULT NULL COMMENT '物理删除 0 不删除 1 删除',
  `create_date` datetime DEFAULT NULL COMMENT '创建日期',
  `update_date` datetime DEFAULT NULL COMMENT '修改日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_org
-- ----------------------------

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `id` varchar(64) NOT NULL COMMENT '主键',
  `name` varchar(255) NOT NULL COMMENT '角色名称',
  `remark` text COMMENT '备注',
  `is_admin` int(11) DEFAULT NULL COMMENT '是否为管理员',
  `retain_field1` varchar(255) DEFAULT NULL COMMENT '保留字段',
  `retain_field2` varchar(255) DEFAULT NULL COMMENT '保留字段',
  `retain_field3` varchar(255) DEFAULT NULL COMMENT '保留字段',
  `create_date` datetime DEFAULT NULL COMMENT '创建日期',
  `update_date` datetime DEFAULT NULL COMMENT '修改日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_role
-- ----------------------------

-- ----------------------------
-- Table structure for sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu` (
  `id` varchar(64) NOT NULL COMMENT '主键',
  `role_id` varchar(64) NOT NULL COMMENT '角色Id',
  `menu_id` varchar(64) NOT NULL COMMENT '菜单Id',
  `create_date` datetime DEFAULT NULL COMMENT '创建日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id` varchar(255) NOT NULL COMMENT '主键',
  `password` varchar(255) DEFAULT '' COMMENT '密码',
  `name` varchar(255) DEFAULT '' COMMENT '用户名',
  `login_name` varchar(255) DEFAULT '' COMMENT '登录名',
  `age` int(11) DEFAULT NULL COMMENT '年龄',
  `tel` varchar(64) DEFAULT '' COMMENT '联系电话',
  `birthday` datetime DEFAULT NULL COMMENT '生日',
  `image` varchar(255) DEFAULT '' COMMENT '头像',
  `email` varchar(64) DEFAULT '' COMMENT '邮箱',
  `address` varchar(255) DEFAULT '' COMMENT '地址',
  `sex` int(11) DEFAULT NULL COMMENT '向别 0 女 1男',
  `profile` varchar(2048) DEFAULT '' COMMENT '简介',
  `roles` varchar(255) DEFAULT '' COMMENT '角色',
  `org_id` varchar(64) DEFAULT NULL COMMENT '组织Id',
  `org_name` varchar(255) DEFAULT NULL COMMENT '所属部门',
  `tenant_id` varchar(64) DEFAULT NULL COMMENT '租户Id',
  `is_del` int(11) DEFAULT NULL COMMENT '逻辑删除 0  1删除',
  `create_date` datetime DEFAULT NULL COMMENT '创建日期',
  `update_date` datetime DEFAULT NULL COMMENT '更新日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES ('dsfd', '46f94c8de14fb36680850768ff1b7f2a', 'admin', 'purestart', null, '', null, '', '', '', null, '', '', null, null, null, null, null, null);

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role` (
  `id` varchar(64) NOT NULL COMMENT '主键',
  `role_id` varchar(64) NOT NULL COMMENT '角色Id',
  `user_id` varchar(64) NOT NULL COMMENT '用户Id',
  `create_date` datetime DEFAULT NULL COMMENT '创建日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
