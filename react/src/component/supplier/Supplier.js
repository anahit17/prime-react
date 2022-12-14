import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Controller, useForm } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import {
  deleteSupplierData,
  setSuppliers,
  updateSupplier,
} from "../../store/supplier/action";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "primereact/toast";

export default function Supplier() {
  const dispatch = useDispatch();
  const { suppliersData } = useSelector((state) => state.suppliersData);
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();
  const toast = useRef(null);
  const [deleteRowData, setDeleteRowData] = useState(null);
  const [editRowData, setEditRowData] = useState({});
  const [displayResponsive, setDisplayResponsive] = useState(false);

  const dialogFuncMap = {
    displayResponsive: setDisplayResponsive,
  };
  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);
  };
  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };
  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="Cancel"
          icon="pi pi-times"
          onClick={() => onHide(name)}
          className="p-button-text"
        />
      </div>
    );
  };

  const accept = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/destroySupplier/${deleteRowData.id}`
      )
      .then((res) => {
        if (res.data === "deleted") {
          dispatch(deleteSupplierData(deleteRowData));
        }
      })
      .catch((err) => {
        console.log(err);
      });
    toast.current.show({
      severity: "info",
      summary: "Confirmed",
      detail: "You have accepted",
      life: 3000,
    });
  };
  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };
  const confirm = () => {
    confirmDialog({
      message: "Are you sure you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept,
      reject,
    });
  };

  const deleteSupplier = (rowData) => {
    return (
      <Button
        label="Delete"
        type="button"
        icon="pi pi-trash"
        className="p-button-danger p-button-outlined"
        onClick={() => {
          setDeleteRowData(rowData);
        }}
      />
    );
  };
  const editSupplier = (rowData) => {
    return (
      <Button
        label="Edit"
        type="button"
        icon="pi pi-fw pi-pencil"
        className="p-button-warning p-button-outlined"
        onClick={() => {
          onClick("displayResponsive");
          setEditRowData(rowData);
        }}
      />
    );
  };

  const defaultValues = {
    SupCode: "",
    SupName: "",
    Addr1: "",
    Addr2: "",
    Addr3: "",
    City: "",
    State: "",
    Zip: "",
    Phone: "",
    Mobile: "",
    Email: "",
    Contact: "",
    CountryCode: "",
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const onSubmit = async (data) => {
    onHide("displayResponsive");
    for (let key in data) {
      for (let i in editRowData) {
        if (data[key] === "") {
          data[key] = editRowData[key];
        }
      }
    }
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/editSupplier/${editRowData.id}`,
        data
      )
      .then((res) => {
        if (res.data === "updated") {
          dispatch(updateSupplier({ id: editRowData.id, data: data }));
          navigate("/supplier");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    reset();
  };
  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };
  useEffect(() => {
    if (deleteRowData) {
      confirm();
    }
  }, [deleteRowData]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/getSuppliers`)
      .then((res) => {
        dispatch(setSuppliers(res.data.suppliers.reverse()));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    axios
      .get("https://trial.mobiscroll.com/content/countries.json")
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          const country = response.data[i];
          countries.push(country.text);
        }
        setCountries(countries);
      });
  }, [countries]);

  return (
    <div>
      <div className="btn-create">
        <Button
          icon="pi pi-fw pi-user"
          label="Create a new Supplier"
          onClick={() => navigate("/supplier/create")}
        />
      </div>
      <Toast ref={toast} />
      <div className="card">
        <ConfirmDialog />
        <Dialog
          header="Edit Supplier Data"
          visible={displayResponsive}
          onHide={() => onHide("displayResponsive")}
          breakpoints={{ "960px": "75vw" }}
          style={{ width: "50vw" }}
          footer={renderFooter("displayResponsive")}
        >
          <div className="form-demo">
            <div className="flex justify-content-center">
              <div className="card">
                <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                  <div className="field">
                    <span className="p-float-label">
                      <Controller
                        name="SupCode"
                        control={control}
                        render={({ field, fieldState }) => (
                          <InputText
                            id={field.name}
                            {...field}
                            className={classNames({
                              "p-invalid": fieldState.invalid,
                            })}
                          />
                        )}
                      />
                      <label htmlFor="SupCode">{editRowData.SupCode}</label>
                    </span>
                  </div>

                  <div className="field">
                    <span className="p-float-label">
                      <Controller
                        name="SupName"
                        control={control}
                        render={({ field, fieldState }) => (
                          <InputText
                            id={field.name}
                            {...field}
                            className={classNames({
                              "p-invalid": fieldState.invalid,
                            })}
                          />
                        )}
                      />
                      <label htmlFor="SupName">{editRowData.SupName}</label>
                    </span>
                  </div>

                  <div className="field">
                    <span className="p-float-label">
                      <Controller
                        name="Addr1"
                        control={control}
                        render={({ field, fieldState }) => (
                          <InputText
                            id={field.name}
                            {...field}
                            className={classNames({
                              "p-invalid": fieldState.invalid,
                            })}
                          />
                        )}
                      />
                      <label htmlFor="Addr1"> {editRowData.Addr3}</label>
                    </span>
                  </div>

                  <div className="field">
                    <span className="p-float-label">
                      <Controller
                        name="Addr2"
                        control={control}
                        render={({ field, fieldState }) => (
                          <InputText
                            id={field.name}
                            {...field}
                            className={classNames({
                              "p-invalid": fieldState.invalid,
                            })}
                          />
                        )}
                      />
                      <label htmlFor="Addr2"> {editRowData.Addr2}</label>
                    </span>
                  </div>

                  <div className="field">
                    <span className="p-float-label">
                      <Controller
                        name="Addr3"
                        control={control}
                        render={({ field, fieldState }) => (
                          <InputText
                            id={field.name}
                            {...field}
                            className={classNames({
                              "p-invalid": fieldState.invalid,
                            })}
                          />
                        )}
                      />
                      <label htmlFor="Addr3"> {editRowData.Addr3}</label>
                    </span>
                  </div>

                  <div className="field">
                    <span className="p-float-label">
                      <Controller
                        name="City"
                        control={control}
                        render={({ field, fieldState }) => (
                          <InputText
                            id={field.name}
                            {...field}
                            className={classNames({
                              "p-invalid": fieldState.invalid,
                            })}
                          />
                        )}
                      />
                      <label htmlFor="City"> {editRowData.City}</label>
                    </span>
                  </div>

                  <div className="field">
                    <span className="p-float-label">
                      <Controller
                        name="State"
                        control={control}
                        render={({ field, fieldState }) => (
                          <InputText
                            id={field.name}
                            {...field}
                            className={classNames({
                              "p-invalid": fieldState.invalid,
                            })}
                          />
                        )}
                      />
                      <label htmlFor="State"> {editRowData.State}</label>
                    </span>
                  </div>

                  <div className="field">
                    <span className="p-float-label">
                      <Controller
                        name="Zip"
                        control={control}
                        render={({ field, fieldState }) => (
                          <InputText
                            id={field.name}
                            {...field}
                            className={classNames({
                              "p-invalid": fieldState.invalid,
                            })}
                          />
                        )}
                      />
                      <label htmlFor="Zip">Zip</label>
                    </span>
                  </div>

                  <div className="field">
                    <span className="p-float-label">
                      <Controller
                        name="Phone"
                        control={control}
                        render={({ field, fieldState }) => (
                          <InputText
                            id={field.name}
                            {...field}
                            className={classNames({
                              "p-invalid": fieldState.invalid,
                            })}
                          />
                        )}
                      />
                      <label htmlFor="Phone"> {editRowData.Phone}</label>
                    </span>
                  </div>

                  <div className="field">
                    <span className="p-float-label">
                      <Controller
                        name="Mobile"
                        control={control}
                        render={({ field, fieldState }) => (
                          <InputText
                            id={field.name}
                            {...field}
                            className={classNames({
                              "p-invalid": fieldState.invalid,
                            })}
                          />
                        )}
                      />
                      <label htmlFor="Mobile"> {editRowData.Mobile}</label>
                    </span>
                  </div>

                  <div className="field">
                    <span className="p-float-label p-input-icon-right">
                      <i className="pi pi-envelope" />
                      <Controller
                        name="Email"
                        control={control}
                        rules={{
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message:
                              "Invalid email address. E.g. example@email.com",
                          },
                        }}
                        render={({ field, fieldState }) => (
                          <InputText
                            id={field.name}
                            {...field}
                            className={classNames({
                              "p-invalid": fieldState.invalid,
                            })}
                          />
                        )}
                      />
                      <label
                        htmlFor="Email"
                        className={classNames({ "p-error": !!errors.Email })}
                      >
                        {editRowData.Email}
                      </label>
                    </span>
                    {getFormErrorMessage("Email")}
                  </div>

                  <div className="field">
                    <span className="p-float-label">
                      <Controller
                        name="Contact"
                        control={control}
                        render={({ field, fieldState }) => (
                          <InputText
                            id={field.name}
                            {...field}
                            className={classNames({
                              "p-invalid": fieldState.invalid,
                            })}
                          />
                        )}
                      />
                      <label htmlFor="Contact"> {editRowData.Contact}</label>
                    </span>
                  </div>

                  <div className="field">
                    <span className="p-float-label">
                      <Controller
                        name="CountryCode"
                        control={control}
                        render={({ field }) => (
                          <Dropdown
                            id={field.name}
                            value={field.value}
                            onChange={(e) => field.onChange(e.value)}
                            options={countries}
                          />
                        )}
                      />
                      <label htmlFor="CountryCode">
                        {editRowData.CountryCode}
                      </label>
                    </span>
                  </div>
                  <Button type="submit" label="Submit" className="mt-2" />
                </form>
              </div>
            </div>
          </div>
        </Dialog>
        <DataTable
          value={suppliersData}
          header="All Suppliers"
          responsiveLayout="scroll"
        >
          <Column field="id" header="No" />
          <Column field="SupCode" header="Supplier Code" />
          <Column field="SupName" header="Supplier Name" />
          <Column field="Addr1" header="Address 1" />
          <Column field="Addr2" header="Address 2" />
          <Column field="Addr3" header="Address 3" />
          <Column field="City" header="City" />
          <Column field="State" header="State" />
          <Column field="Zip" header="Postal Code" />
          <Column field="Phone" header="Work Phone " />
          <Column field="Mobile" header="Mobile" />
          <Column field="Email" header="Email" />
          <Column field="Contact" header="Contact Person" />
          <Column field="CountryCode" header="Country" />
          <Column body={deleteSupplier} header="Delete Supplier" />
          <Column body={editSupplier} header="Edit Supplier Data" />
        </DataTable>
      </div>
    </div>
  );
}
