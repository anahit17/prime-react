const port = 1111;
const express = require("express");
const app = express();
const cors = require("cors");
const ClientController = require("./controller/ClientController");
const SupplierController = require("./controller/SupplierController");
const CustomerController = require("./controller/CustomerController");
const WarehouseController = require("./controller/WarehouseController");
const StorageLocationController = require("./controller/StorageLocationController");

const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/getClients", ClientController.getClients);
app.post("/addNewClient", ClientController.addNewClient);
app.post("/destroyClient/:id", ClientController.destroyClient);
app.post("/editClient/:id", ClientController.editClient);

app.get("/getSuppliers", SupplierController.getSuppliers);
app.post("/addNewSupplier", SupplierController.addNewSupplier);
app.post("/destroySupplier/:id", SupplierController.destroySupplier);
app.post("/editSupplier/:id", SupplierController.editSupplier);

app.get("/getCustomers", CustomerController.getCustomers);
app.post("/addNewCustomer", CustomerController.addNewCustomer);
app.post("/destroyCustomer/:id", CustomerController.destroyCustomer);
app.post("/editCustomer/:id", CustomerController.editCustomer);

app.get("/getWarehouse", WarehouseController.getWarehouse);
app.post("/addNewWarehouse", WarehouseController.addNewWarehouse);
app.post("/destroyWarehouse/:id", WarehouseController.destroyWarehouse);
app.post("/editWarehouse/:id", WarehouseController.editWarehouse);

app.get("/getStorageLocation", StorageLocationController.getStorageLocation);
app.post("/addNewStorageLocation", StorageLocationController.addNewStorageLocation);
app.post("/destroyStorageLocation/:id", StorageLocationController.destroyStorageLocation);
app.post("/editStorageLocation/:id", StorageLocationController.editStorageLocation);


app.listen(port);
