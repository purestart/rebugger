export default function(sequelize: any, DataTypes: any) {
  return sequelize.define(
    "ip_auth",
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        comment:"主键"
      },
      name:{
        type: DataTypes.STRING,
        allowNull: false,
        comment:"环境名称"
      },
      type:{
        type: DataTypes.INTEGER,
        allowNull: true,
        comment:"类型 1 开发环境 2 测试 3 预生产 4 生产"
      },
      domain:{
        type: DataTypes.STRING,
        allowNull: false,
        comment:"允许域名"
      },
      description:{
        type: DataTypes.STRING(1024),
        allowNull: true,
        comment:"描述" 
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
      tableName: "ip_auth",
      createdAt: false, //去掉默认字段
      updatedAt: false //去掉默认字段
    }
  );
}
