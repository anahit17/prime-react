const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("./index");

class StorageLocation extends Model {}
StorageLocation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    StorLoc: DataTypes.STRING,
    WhId: DataTypes.STRING,
    Status: DataTypes.STRING,
    CtrlLpn: DataTypes.STRING,
    CtrlCtz: DataTypes.STRING,
    CtrlBlk: DataTypes.STRING,
    CtrlStc: DataTypes.STRING,
    Rotate: DataTypes.STRING,
    StorType: DataTypes.STRING,
    SeqPick: DataTypes.INTEGER,
    SeqDrop: DataTypes.INTEGER,
  },
  {
    modelName: "storageLocation",
    sequelize,
  }
);
// StorageLocation.belongsTo(Warehouse);
// Warehouse.hasMany(StorageLocation);
StorageLocation.sync();
module.exports = { StorageLocation };
