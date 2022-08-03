const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("./index");

class Client extends Model {}
Client.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ClnCode: DataTypes.STRING,
    ClnName: DataTypes.STRING,
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
    modelName: "Client",
    sequelize,
  }
);
Client.sync();
module.exports = { Client };
