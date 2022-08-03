const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("./index");

class Supplier extends Model {}
Supplier.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    SupCode: DataTypes.STRING,
    SupName: DataTypes.STRING,
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
  },
  {
    modelName: "supplier",
    sequelize,
  }
);
Supplier.sync();
module.exports = { Supplier };
