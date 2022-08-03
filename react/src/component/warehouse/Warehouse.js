import axios from "axios";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Checkbox } from "primereact/checkbox";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteWarehouseData,
  setWarehouse,
  updateWarehouse,
} from "../../store/warehouse/action";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Controller, useForm } from "react-hook-form";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";

export default function Warehouse() {
  const { warehouseData } = useSelector((state) => state.warehouseData);
  const [warehouseDataArr, setWarehouseDataArr] = useState([]);
  const [deleteRowData, setDeleteRowData] = useState(null);
  const [editRowData, setEditRowData] = useState({});
  const [countries, setCountries] = useState([]);
  const toast = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [displayResponsive, setDisplayResponsive] = useState(false);

  const defaultValues = {
    WhId: "",
    WhName: "",
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
    FacId: "",
    RulePut: "",
    RulePick: "",
    TaskRep: "",
    TaskMove: "",
    RcvXDock: "",
    RcvWrk: "",
    RcvDayEarly: "",
    RcvDayLate: "",
    RcvDayAct: "",
    RcvOverTol: "",
    RcvOverAct: "",
    RcvQcAct: "",
    IssDirectShip: "",
    IssShortTol: "",
    IssShortAct: "",
    IssGrpPick: "",
    IssGrpDel: "",
    IssCancelAct: "",
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
        `${process.env.REACT_APP_API_URL}/editWarehouse/${editRowData.id}`,
        data
      )
      .then((res) => {
        if (res.data === "updated") {
          dispatch(updateWarehouse({ id: editRowData.id, data: data }));
          navigate("/warehouse");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(data);
    reset();
  };

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
        `${process.env.REACT_APP_API_URL}/destroyWarehouse/${deleteRowData.id}`
      )
      .then((res) => {
        if (res.data === "deleted") {
          dispatch(deleteWarehouseData(deleteRowData.id));
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
  const deleteWarehouse = (rowData) => {
    return (
      <Button
        label="Delete"
        type="button"
        icon="pi pi-trash"
        className="p-button-danger p-button-outlined"
        onClick={() => {
          setDeleteRowData(rowData);
          confirm();
        }}
      />
    );
  };
  const editWarehouse = (rowData) => {
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

  useEffect(() => {
    if (deleteRowData) {
      confirm();
    }
  }, [deleteRowData]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/getWarehouse`)
      .then((res) => {
        dispatch(setWarehouse(res.data.warehouse.reverse()));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    let cloneArr = [];
    warehouseData.map((el) => {
      let element = { ...el, FacId: JSON.parse(el.FacId) };
      cloneArr.push(element);
      setWarehouseDataArr(cloneArr);
    });
  }, [warehouseData]);
  console.log("WarehouseDataArr", warehouseDataArr);
  return (
    <>
      <div className="btn-create">
        <Button
          icon="pi pi-fw pi-user"
          label="Create a new Warehouse"
          onClick={() => navigate("/warehouse/create")}
        />
      </div>
      <Toast ref={toast} />
      <ConfirmDialog />
      <Dialog
        header="Edit Warehouse Information"
        visible={displayResponsive}
        onHide={() => onHide("displayResponsive")}
        breakpoints={{ "960px": "75vw" }}
        style={{ width: "50vw" }}
        footer={renderFooter("displayResponsive")}
      >
        <div className="form-demo">
          <div className="flex justify-content-center">
            <div className="card">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-fluid form-edited"
              >
                <div className="field">
                  <span className="p-float-label">
                    <Controller
                      name="WhId"
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
                    <label htmlFor="WhId">*Whse Id</label>
                  </span>
                </div>

                <div className="field">
                  <span className="p-float-label">
                    <Controller
                      name="WhName"
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
                    <label htmlFor="WhName">*Whse Name</label>
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
                    <label htmlFor="Addr1">Address 1</label>
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
                    <label htmlFor="Addr2">Address 2</label>
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
                    <label htmlFor="Addr3">Address 3</label>
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
                    <label htmlFor="City">City</label>
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
                    <label htmlFor="State">State</label>
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
                    <label htmlFor="Zip">Postal Code</label>
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
                    <label htmlFor="Phone">Work Phone</label>
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
                    <label htmlFor="Mobile">Mobile</label>
                  </span>
                </div>

                <div className="field">
                  <span className="p-float-label p-input-icon-right">
                    <i className="pi pi-envelope" />
                    <Controller
                      name="Email"
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
                    <label htmlFor="Email">Email*</label>
                  </span>
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
                    <label htmlFor="Contact">Contact Person</label>
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
                          // optionLabel="name"
                        />
                      )}
                    />
                    <label htmlFor="CountryCode">Country</label>
                  </span>
                </div>

                <div className="field">
                  <span className="p-float-label">
                    <Controller
                      name="FacId "
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
                    <label htmlFor="FacId ">Facility</label>
                  </span>
                </div>

                <div className="field">
                  <span className="p-float-label">
                    <Controller
                      name="RulePut"
                      control={control}
                      render={({ field }) => (
                        <Dropdown
                          id={field.name}
                          value={field.value}
                          onChange={(e) => field.onChange(e.value)}
                          // options={countries}
                          optionLabel="name"
                        />
                      )}
                    />
                    <label htmlFor="RulePut">*Default Put Rule</label>
                  </span>
                </div>

                <div className="field">
                  <span className="p-float-label">
                    <Controller
                      name="RulePick"
                      control={control}
                      render={({ field }) => (
                        <Dropdown
                          id={field.name}
                          value={field.value}
                          onChange={(e) => field.onChange(e.value)}
                          // options={countries}
                          optionLabel="name"
                        />
                      )}
                    />
                    <label htmlFor="RulePick">*Default Pick Rule</label>
                  </span>
                </div>

                <div className="field">
                  <span className="p-float-label">
                    <Controller
                      name="TaskRep"
                      control={control}
                      render={({ field }) => (
                        <Dropdown
                          id={field.name}
                          value={field.value}
                          onChange={(e) => field.onChange(e.value)}
                          // options={countries}
                          optionLabel="name"
                        />
                      )}
                    />
                    <label htmlFor="TaskRep">*Default Replinish task</label>
                  </span>
                </div>

                <div className="field">
                  <span className="p-float-label">
                    <Controller
                      name="TaskMove"
                      control={control}
                      render={({ field }) => (
                        <Dropdown
                          id={field.name}
                          value={field.value}
                          onChange={(e) => field.onChange(e.value)}
                          // options={countries}
                          optionLabel="name"
                        />
                      )}
                    />
                    <label htmlFor="TaskMove">*Default Move Task</label>
                  </span>
                </div>

                <div className="field-checkbox">
                  <Controller
                    name="RcvXDock"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Checkbox
                        inputId={field.name}
                        onChange={(e) => field.onChange(e.checked)}
                        checked={field.value}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                      />
                    )}
                  />
                  <label htmlFor="RcvXDock">Allow Cross Dock*</label>
                </div>

                <div className="field">
                  <span className="p-float-label">
                    <Controller
                      name="RcvWrk"
                      control={control}
                      render={({ field }) => (
                        <Dropdown
                          id={field.name}
                          value={field.value}
                          onChange={(e) => field.onChange(e.value)}
                          // options={countries}
                          optionLabel="name"
                        />
                      )}
                    />
                    <label htmlFor="RcvWrk">*Default Inbound Plan</label>
                  </span>
                </div>

                <div className="field-checkbox">
                  <Controller
                    name="RcvDayEarly"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Checkbox
                        inputId={field.name}
                        onChange={(e) => field.onChange(e.checked)}
                        checked={field.value}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                      />
                    )}
                  />
                  <label htmlFor="RcvDayEarly">Allow early receive*</label>
                </div>

                <div className="field-checkbox">
                  <Controller
                    name="RcvDayLate"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Checkbox
                        inputId={field.name}
                        onChange={(e) => field.onChange(e.checked)}
                        checked={field.value}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                      />
                    )}
                  />
                  <label htmlFor="RcvDayLate">Allow late receive*</label>
                </div>

                <div className="field">
                  <span className="p-float-label">
                    <Controller
                      name="RcvDayAct"
                      control={control}
                      render={({ field }) => (
                        <Dropdown
                          id={field.name}
                          value={field.value}
                          onChange={(e) => field.onChange(e.value)}
                          // options={countries}
                          optionLabel="name"
                        />
                      )}
                    />
                    <label htmlFor="RcvDayAct">
                      *Early/late receive action
                    </label>
                  </span>
                </div>

                <div className="field">
                  <span className="p-float-label">
                    <Controller
                      name="RcvOverTol"
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
                    <label htmlFor="RcvOverTol">
                      *Default over receive qty
                    </label>
                  </span>
                </div>

                <div className="field">
                  <span className="p-float-label">
                    <Controller
                      name="RcvOverAct"
                      control={control}
                      render={({ field }) => (
                        <Dropdown
                          id={field.name}
                          value={field.value}
                          onChange={(e) => field.onChange(e.value)}
                          // options={countries}
                          optionLabel="name"
                        />
                      )}
                    />
                    <label htmlFor="RcvOverAct">*Over receive action</label>
                  </span>
                </div>

                <div className="field">
                  <span className="p-float-label">
                    <Controller
                      name="RcvQcAct"
                      control={control}
                      render={({ field }) => (
                        <Dropdown
                          id={field.name}
                          value={field.value}
                          onChange={(e) => field.onChange(e.value)}
                          // options={countries}
                          optionLabel="name"
                        />
                      )}
                    />
                    <label htmlFor="RcvQcAct">*Inspection action</label>
                  </span>
                </div>

                <div className="field-checkbox">
                  <Controller
                    name="IssDirectShip"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Checkbox
                        inputId={field.name}
                        onChange={(e) => field.onChange(e.checked)}
                        checked={field.value}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                      />
                    )}
                  />
                  <label htmlFor="IssDirectShip">Allowed direct ship*</label>
                </div>

                <div className="field">
                  <span className="p-float-label">
                    <Controller
                      name="IssShortTol"
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
                    <label htmlFor="IssShortTol">
                      *Shortage pick tolerance
                    </label>
                  </span>
                </div>

                <div className="field">
                  <span className="p-float-label">
                    <Controller
                      name="IssShortAct"
                      control={control}
                      render={({ field }) => (
                        <Dropdown
                          id={field.name}
                          value={field.value}
                          onChange={(e) => field.onChange(e.value)}
                          // options={countries}
                          optionLabel="name"
                        />
                      )}
                    />
                    <label htmlFor="IssShortAct">*Shortage pick action</label>
                  </span>
                </div>

                <div className="field">
                  <span className="p-float-label">
                    <Controller
                      name="IssGrpPick"
                      control={control}
                      render={({ field }) => (
                        <Dropdown
                          id={field.name}
                          value={field.value}
                          onChange={(e) => field.onChange(e.value)}
                          // options={countries}
                          optionLabel="name"
                        />
                      )}
                    />
                    <label htmlFor="IssGrpPick">*Default pick slip group</label>
                  </span>
                </div>

                <div className="field">
                  <span className="p-float-label">
                    <Controller
                      name="IssGrpDel"
                      control={control}
                      render={({ field }) => (
                        <Dropdown
                          id={field.name}
                          value={field.value}
                          onChange={(e) => field.onChange(e.value)}
                          // options={countries}
                          optionLabel="name"
                        />
                      )}
                    />
                    <label htmlFor="IssGrpDel">*Default delivery group</label>
                  </span>
                </div>

                <div className="field">
                  <span className="p-float-label">
                    <Controller
                      name="IssCancelAct"
                      control={control}
                      render={({ field }) => (
                        <Dropdown
                          id={field.name}
                          value={field.value}
                          onChange={(e) => field.onChange(e.value)}
                          // options={countries}
                          optionLabel="name"
                        />
                      )}
                    />
                    <label htmlFor="IssCancelAct">
                      *Cancel shipment action
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
        value={warehouseData}
        header="Warehouse"
        responsiveLayout="scroll"
      >
        <Column field="id" header="No" />
        <Column field="WhId" header="Whse Id" />
        <Column field="WhName" header="Whse Name" />
        <Column field="Addr1" header="Address 1" />
        <Column field="Addr2" header="Address 2" />
        <Column field="Addr3" header="Address 3" />
        <Column field="City" header="City" />
        <Column field="State" header="State" />
        <Column field="Zip" header="Postal Code" />
        <Column field="Phone" header="Work Phone" />
        <Column field="Mobile" header="Mobile" />
        <Column field="Email" header="Email" />
        <Column field="Contact" header="Contact Person" />
        <Column field="CountryCode" header="Country" />
        <Column field="FacId" header="Facility" />
        <Column field="RulePut" header="Default Put Rule" />
        <Column field="RulePick" header="Default Pick Rule" />
        <Column field="TaskRep" header="Default Replinish task" />
        <Column field="TaskMove" header="Default Move Task" />
        <Column field="RcvXDock" header="Allow Cross Dock" />
        <Column field="RcvWrk" header="Default Inbound Plan" />
        <Column field="RcvDayEarly" header="Allow early receive" />
        <Column field="RcvDayLate" header=" Allow late receive" />
        <Column field="RcvDayAct" header=" Early/late receive action" />
        <Column field="RcvOverTol" header="Default over receive qty" />
        <Column field="RcvOverAct " header="Over receive action" />
        <Column field="RcvQcAct" header="Inspection action" />
        <Column field="IssDirectShip" header="allowed direct ship" />
        <Column field="IssShortTol" header="Shortage pick tolerance" />
        <Column field="IssShortAct" header="Shortage pick action" />
        <Column field="IssGrpPick" header="Default pick slip group" />
        <Column field="IssGrpDel" header=" Default delivery group" />
        <Column field="IssCancelAct" header="Cancel shipment action" />
        <Column body={deleteWarehouse} header="Delete Warehouse" />
        <Column body={editWarehouse} header="Edit Warehouse" />
      </DataTable>
    </>
  );
}
