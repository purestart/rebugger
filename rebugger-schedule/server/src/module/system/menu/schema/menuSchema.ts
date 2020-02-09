export default function(sequelize: any, DataTypes: any) {
  return sequelize.define(
    "sys_menu",
    {
      id: {
        type: DataTypes.STRING(64),
        allowNull: false,
        primaryKey: true,
        comment:"主键"
      },
      menuName:{
        type: DataTypes.STRING(128),
        allowNull: false,
        comment:"菜单名称"
      },
      url:{
        type: DataTypes.STRING,
        allowNull: false,
        comment:"菜单URL"
      },
      menuCode:{
        type: DataTypes.STRING(64),
        allowNull: true,
        comment:"菜单编码/权限编码"
      },
      icon:{
        type: DataTypes.STRING(64),
        allowNull: true,
        comment:"菜单图标"
      },
      parentId:{
        type: DataTypes.STRING(64),
        allowNull: true,
        comment:"父级Id"
      },
      seq:{
        type: DataTypes.INTEGER,
        allowNull: true,
        comment:"排序"
      },
      position:{
        type: DataTypes.STRING(64),
        allowNull: true,
        comment:"菜单位置"
      },
      productCode:{
        type: DataTypes.STRING(64),
        allowNull: true,
        comment:"产品CODE"
      },
      isDel:{
        type: DataTypes.INTEGER,
        allowNull: true,
        comment:"是否逻辑删除 0 否 1 是"
      },
      retainField1:{
        type: DataTypes.STRING,
        allowNull: true,
        comment:"保留字段"
      },
      retainField2:{
        type: DataTypes.STRING,
        allowNull: true,
        comment:"保留字段"
      },
      retainField3:{
        type: DataTypes.STRING,
        allowNull: true,
        comment:"保留字段"
      },
      createDate: {
        type: DataTypes.DATE,
        allowNull: true,
        primaryKey: false,
        // field: "create_date",
        comment:"创建日期"
      },
      updateDate: {
        type: DataTypes.DATE,
        allowNull: true,
        primaryKey: false,
        // field: "update_date",
        comment:"修改日期"
      }
    },
    {
      tableName: "sys_menu",
      createdAt: false, //去掉默认字段
      updatedAt: false //去掉默认字段
    }
  );
}
