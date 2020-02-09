export default function(sequelize: any, DataTypes: any) {
  return sequelize.define(
    "sys_dict",
    {
      id: {
        type: DataTypes.STRING(64),
        allowNull: false,
        primaryKey: true,
        comment:"主键"
      },
      name:{
        type: DataTypes.STRING,
        allowNull: false,
        comment:"字典名称"
      },
      type:{
        type: DataTypes.STRING,
        allowNull: false,
        comment:"字典类型"
      },
      code:{
        type: DataTypes.STRING,
        allowNull: false,
        comment:"字典码"
      },
      value:{
        type: DataTypes.STRING,
        allowNull: false,
        comment:"字典值"
      },
      seq:{
        type: DataTypes.INTEGER,
        allowNull: false,
        comment:"排序"
      },
      remark:{
        type: DataTypes.TEXT,
        allowNull: true,
        comment:"备注"
      },
      retainField1:{
        type: DataTypes.STRING,
        allowNull: true,
        comment:"保留字段"
      },
      isDel:{
        type: DataTypes.INTEGER,
        allowNull: true,
        comment:"物理删除 0 不删除 1 删除"
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
      tableName: "sys_dict",
      createdAt: false, //去掉默认字段
      updatedAt: false //去掉默认字段
    }
  );
}
