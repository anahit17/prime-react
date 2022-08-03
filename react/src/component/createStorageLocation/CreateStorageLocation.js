import axios from "axios";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setStorageLocation } from "../../store/storagelocation/action";
import { setWarehouse } from "../../store/warehouse/action";

export default function CreateStorageLocation() {
  const { warehouseData } = useSelector((state) => state.warehouseData);
  const [whId, setWhId] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    await axios
      .post(`${process.env.REACT_APP_API_URL}/addNewStorageLocation`, data)
      .then((res) => {
        dispatch(setStorageLocation(res.data.storageLocation.reverse()));
        navigate("/storageLocation");
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(data);
    reset();
  };

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  useEffect(() => {
    let id = [];
    warehouseData.map((el, i) => {
      id.push(el.id);
      setWhId(id);
    });
  }, [warehouseData]);

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

  return (
    <div className="form-demo">
      <div className="flex justify-content-center">
        <div className="card">
          <h4 className="text-center">Create Storage Location</h4>
          <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
            <div className="field">
              <span className="p-float-label">
                <Controller
                  name="StorLoc"
                  control={control}
                  rules={{ required: "*Stor Loc is required" }}
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
                  htmlFor="StorLoc"
                  className={classNames({ "p-error": errors.StorLoc })}
                >
                  *Stor Loc
                </label>
              </span>
              {getFormErrorMessage("StorLoc")}
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
                <label htmlFor="WhId">Whse Id</label>
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
                <label htmlFor="Status">Status</label>
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
                <label htmlFor="Rotate">Rotation</label>
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
                <label htmlFor="StorType">Storage Type</label>
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
                <label htmlFor="SeqPick">Pick Seq</label>
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
                <label htmlFor="SeqDrop">Drop Seq</label>
              </span>
            </div>

            <Button type="submit" label="Submit" className="mt-2" />
          </form>
        </div>
      </div>
    </div>
  );
}
