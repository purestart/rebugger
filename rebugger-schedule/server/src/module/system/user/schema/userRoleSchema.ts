export default function(sequelize: any, DataTypes: any) {
  return sequelize.define(
    "sys_user_role",
    {
      id: {
        type: DataTypes.STRING(64),
        allowNull: false,
        primaryKey: true,
        comment:"主键"
      },
      roleId:{
        type: DataTypes.STRING(64),
        allowNull: false,
        comment:"角色Id"
      },
      userId:{
        type: DataTypes.STRING(64),
        allowNull: false,
        comment:"用户Id"
      },
      createDate: {
        type: DataTypes.DATE,
        allowNull: true,
        primaryKey: false,
        // field: "create_date",
        comment:"创建日期"
      }
    },
    {
      tableName: "sys_user_role",
      createdAt: false, //去掉默认字段
      updatedAt: false //去掉默认字段
    }
  );
}
