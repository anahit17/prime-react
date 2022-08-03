import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  deleteStorageLocationData,
  setStorageLocation,
  updateStorageLocation,
} from "../../store/storagelocation/action";
import { Controller, useForm } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Dialog } from "primereact/dialog";
import { Checkbox } from "primereact/checkbox";

export default function StorageLocation() {
  const { warehouseData } = useSelector((state) => state.warehouseData);
  const { storageLocationData } = useSelector(
    (state) => state.storageLocationData
  );
  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [deleteRowData, setDeleteRowData] = useState(null);
  const [editRowData, setEditRowData] = useState({});
  const [countries, setCountries] = useState([]);
  const [whId, setWhId] = useState([]);
  const toast = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        `${process.env.REACT_APP_API_URL}/destroyStorageLocation/${deleteRowData.id}`
      )
      .then((res) => {
        if (res.data === "deleted") {
          dispatch(deleteStorageLocationData(deleteRowData.id));
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
  const deleteStorageLocation = (rowData) => {
    return (
      <Button
        label="Delete"
        type="button"
        icon="pi pi-trash"
        className="p-button-danger p-button-outlined"
        onClick={() => {
          console.log(rowData);
          confirm();
          setDeleteRowData(rowData);
        }}
      />
    );
  };
  const editStorageLocation = (rowData) => {
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
    StorLoc: "",
    WhId: "",
    Status: "",
    CtrlLpn: "",
    CtrlCtz: "",
    CtrlBlk: "",
    CtrlStc: "",
    Rotate: "",
    StorType: "",
    SeqPick: "",
    SeqDrop: "",
    Contact: "",
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
        `${process.env.REACT_APP_API_URL}/editStorageLocation/${editRowData.id}`,
        data
      )
      .then((res) => {
        if (res.data === "updated") {
          dispatch(updateStorageLocation({ id: editRowData.id, data: data }));
          navigate("/storagelocation");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    reset();
  };

  useEffect(() => {
    let id = [];
    warehouseData.map((el, i) => {
      id.push(el.id);
      setWhId(id);
    });
  }, [warehouseData]);

  useEffect(() => {
    if (deleteRowData) {
      confirm();
    }
  }, [deleteRowData]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/getStorageLocation`)
      .then((res) => {
        dispatch(setStorageLocation(res.data.storageLocation.reverse()));
      })
      .catch((err) => {
        console.log(err);
      });
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
          label="Create new Storage Location"
          onClick={() => navigate("/storagelocation/create")}
        />
      </div>
      <Toast ref={toast} />
      <ConfirmDialog />
      <Dialog
        header="Edit Storage Location"
        visible={displayResponsive}
        onHide={() => onHide("displayResponsive")}
        breakpoints={{ "960px": "75vw" }}
        style={{ width: "50vw" }}
        footer={renderFooter("displayResponsive")}
      >
        <div className="form-demo">
          <div className="flex justify-content-center">
            <div className="card">
              <h4 className="text-center">Edit Storage Location</h4>
              <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                <div className="field">
                  <span className="p-float-label">
                    <Controller
                      name="StorLoc"
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
                    <label htmlFor="StorLoc">
                      {editRowData.StorLoc === ""
                        ? "Stor Loc"
                        : editRowData.StorLoc}
                      Stor Loc
                    </label>
                  </span>
                </div>

                <div className="field">
                  <span className="p-float-label">
                    <Controller
                      name="WhId"
                      control={control}
                      render={({ field }) => (
                        <Dropdown
                          id={field.name}
                          value={field.value}
                          onChange={(e) => field.onChange(e.value)}
                          options={whId}
                        />
                      )}
                    />
                    <label htmlFor="WhId">
                      {editRowData.whId === "" ? "Whs Id" : editRowData.whId}
                    </label>
                  </span>
                </div>

                <div className="field">
                  <span className="p-float-label">
                    <Controller
                      name="Status"
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
                    <label htmlFor="Status">
                      {editRowData.Status === ""
                        ? "Status"
                        : editRowData.Status}
                    </label>
                  </span>
                </div>

                <div className="field-checkbox">
                  <Controller
                    name="CtrlLpn"
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
                  <label htmlFor="CtrlLpn">LPN Controll</label>
                </div>

                <div className="field-checkbox">
                  <Controller
                    name="CtrlCtz"
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
                  <label htmlFor="CtrlCtz">Cartonization</label>
                </div>

                <div className="field-checkbox">
                  <Controller
                    name="CtrlBlk"
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
                  <label htmlFor="CtrlBlk">Allow Bulk Pick</label>
                </div>

                <div className="field-checkbox">
                  <Controller
                    name="CtrlStc"
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
                  <label htmlFor="CtrlStc">Allow Stock Count</label>
                </div>

                <div className="field">
                  <span className="p-float-label">
                    <Controller
                      name="Rotate"
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
                    <label htmlFor="Rotate">
                      {editRowData.Rotate === ""
                        ? "Rotation"
                        : editRowData.Rotate}
                    </label>
                  </span>
                </div>

                <div className="field">
                  <span className="p-float-label">
                    <Controller
                      name="StorType"
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
                    <label htmlFor="StorType">
                      {editRowData.StorType === ""
                        ? "Storage Type"
                        : editRowData.StorType}
                    </label>
                  </span>
                </div>

                <div className="field">
                  <span className="p-float-label">
                    <Controller
                      name="SeqPick"
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
                    <label htmlFor="SeqPick">
                      {editRowData.SeqPick === ""
                        ? "Pick Seq"
                        : editRowData.SeqPick}
                    </label>
                  </span>
                </div>

                <div className="field">
                  <span className="p-float-label">
                    <Controller
                      name="SeqDrop"
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
                    <label htmlFor="SeqDrop">
                      {editRowData.SeqDrop === ""
                        ? "Drop Seq"
                        : editRowData.SeqDrop}
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
        value={storageLocationData}
        header="Storage Locations"
        responsiveLayout="scroll"
      >
        <Column field="StorLoc" header="Stor Loc" />
        <Column field="WhId" header="Whse Id" />
        <Column field="Status" header="Status" />
        <Column field="CtrlLpn" header="LPN Controll" />
        <Column field="CtrlCtz" header="Cartonization" />
        <Column field="CtrlBlk" header="Allow Bulk Pick" />
        <Column field="CtrlStc" header="Allow Stock Count" />
        <Column field="Rotate" header="Rotation" />
        <Column field="StorType" header="Storage Type" />
        <Column field="SeqPick" header="Pick Seq" />
        <Column field="SeqDrop" header="Drop Seq" />
        <Column body={deleteStorageLocation} header="Delete StorageLocation" />
        <Column body={editStorageLocation} header="Edit StorageLocation" />
      </DataTable>
    </div>
  );
}
