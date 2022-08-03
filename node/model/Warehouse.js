const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("./index");

class Warehouse extends Model {}
Warehouse.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    WhId: DataTypes.STRING,
    WhName: DataTypes.STRING,
    Addr1: DataTypes.STRING,
    Addr2: DataTypes.STRING,
    Addr3: DataTypes.STRING,
    City: DataTypes.STRING,
    State: DataTypes.STRING,
    Zip: DataTypes.STRING,
    Phone: DataTypes.STRING,
    Mobile: DataTypes.STRING,
    Email: DataTypes.STRING,
    Contact: DataTypes.STRING,
    CountryCode: DataTypes.STRING,
    FacId: DataTypes.STRING,
    RulePut: DataTypes.STRING,
    RulePick: DataTypes.STRING,
    TaskRep: DataTypes.STRING,
    TaskMove: DataTypes.STRING,
    RcvXDock: DataTypes.STRING,
    RcvWrk: DataTypes.STRING,
    RcvDayEarly: DataTypes.STRING,
    RcvDayLate: DataTypes.STRING,
    RcvDayAct: DataTypes.STRING,
    RcvOverTol: DataTypes.STRING,
    RcvOverAct: DataTypes.STRING,
    RcvQcAct: DataTypes.STRING,
    IssDirectShip: DataTypes.STRING,
    IssShortTol: DataTypes.STRING,
    IssShortAct: DataTypes.STRING,
    IssGrpPick: DataTypes.STRING,
    IssGrpDel: DataTypes.STRING,
    IssCancelAct: DataTypes.STRING,
  },
  {
    modelName: "warehouse",
    sequelize,
  }
);
Warehouse.sync();
module.exports = { Warehouse };
