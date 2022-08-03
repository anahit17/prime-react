const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("./index");

class Customer extends Model {}
Customer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CusCode: DataTypes.STRING,
    CusName: DataTypes.STRING,
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
    modelName: "customer",
    sequelize,
  }
);
Customer.sync();
module.exports = { Customer };
