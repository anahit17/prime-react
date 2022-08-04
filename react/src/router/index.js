import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Client from "../component/client/Client";
import CreateClient from "../component/createClient/CreateClient";
import CreateCustomer from "../component/createCustomer/CreateCustomer";
import CreateSupplier from "../component/createSupplier/CreateSupplier";
import CreateWarehouse from "../component/createWarehouse/CreateWarehouse";
import Customer from "../component/customer/Customer";
import Menu from "../component/menu/Menu";
import StorageLocation from "../component/storageLocation/StorageLocation";
import Supplier from "../component/supplier/Supplier";
import Warehouse from "../component/warehouse/Warehouse";
import CreateStorageLocation from "../component/createStorageLocation/CreateStorageLocation";

export default function Router() {
  return (
    <BrowserRouter>
      <Menu />
      <div className="app-content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Navigate replace to="/client" />} />
            <Route path="/client" element={<Client />} />
            <Route path="/supplier" element={<Supplier />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/warehouse" element={<Warehouse />} />
            <Route path="/storagelocation" element={<StorageLocation />} />
            <Route path="/client/create" element={<CreateClient />} />
            <Route path="/customer/create" element={<CreateCustomer />} />
            <Route path="/supplier/create" element={<CreateSupplier />} />
            <Route path="/warehouse/create" element={<CreateWarehouse />} />
            <Route
              path="/storagelocation/create"
              element={<CreateStorageLocation />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
