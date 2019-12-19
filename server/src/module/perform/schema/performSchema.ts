export default function(sequelize: any, DataTypes: any) {
  return sequelize.define(
    "perform",
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        comment:"主键"
      },
      type:{
        type: DataTypes.STRING,
        allowNull: true,
        comment:"类型"
      }
    },
    {
      tableName: "perform",
      createdAt: false, //去掉默认字段
      updatedAt: false //去掉默认字段
    }
  );
}
