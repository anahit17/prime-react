import axios from "axios";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { classNames } from "primereact/utils";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setWarehouse } from "../../store/warehouse/action";
import { MultiSelect } from "primereact/multiselect";

export default function CreateWarehouse() {
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fakeData =['1','2','4','5','6','7','8','19','11','14']
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
    await axios
      .post(`${process.env.REACT_APP_API_URL}/addNewWarehouse`, data)
      .then((res) => {
        dispatch(setWarehouse(res.data.warehouse.reverse()));
        navigate("/warehouse");
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
    <div className="form-demo">
      <div className="flex justify-content-center">
        <div className="card-edited">
          <h5 className="text-center">Create new Warehouse</h5>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-fluid form-edited"
          >
            <div className="form-columns">
              <div className="field">
                <span className="p-float-label">
                  <Controller
                    name="WhId"
                    control={control}
                    rules={{ required: "*Whse Id is required" }}
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
                    htmlFor="WhId"
                    className={classNames({ "p-error": errors.WhId })}
                  >
                    *Whse Id
                  </label>
                </span>
                {getFormErrorMessage("WhId")}
              </div>

              <div className="field">
                <span className="p-float-label">
                  <Controller
                    name="WhName"
                    control={control}
                    rules={{ required: "*Whse Name is required" }}
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
                    htmlFor="WhName"
                    className={classNames({ "p-error": errors.WhName })}
                  >
                    *Whse Name
                  </label>
                </span>
                {getFormErrorMessage("WhName")}
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
                    rules={{
                      required: "*Email is required.",
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
                    Email*
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
                      />
                    )}
                  />
                  <label htmlFor="CountryCode">Country</label>
                </span>
              </div>

              <div className="field">
                <span className="p-float-label">
                  <Controller
                    name="FacId"
                    control={control}
                    render={({ field }) => (
                      <MultiSelect
                        id={field.name}
                        value={field.value}
                        options={fakeData}
                        onChange={(e) => field.onChange(e.value)}
                      
                      />
                    )}
                  />
                  <label htmlFor="FacId">Facility</label>
                </span>
              </div>

              <div className="field">
                <span className="p-float-label">
                  <Controller
                    name="RulePut"
                    control={control}
                    rules={{ required: "*Default Put Rule is required" }}
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
                    htmlFor="RulePut"
                    className={classNames({ "p-error": errors.RulePut })}
                  >
                    *Default Put Rule
                  </label>
                </span>
                {getFormErrorMessage("RulePut")}
              </div>

              <div className="field">
                <span className="p-float-label">
                  <Controller
                    name="RulePick"
                    control={control}
                    rules={{ required: "*Default Pick Rule is required" }}
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
                    htmlFor="RulePick"
                    className={classNames({ "p-error": errors.RulePick })}
                  >
                    *Default Pick Rule
                  </label>
                </span>
                {getFormErrorMessage("RulePick")}
              </div>
            </div>

            <div className="form-columns">
              <div className="field">
                <span className="p-float-label">
                  <Controller
                    name="TaskRep"
                    control={control}
                    rules={{ required: "*Default Replinish task is required" }}
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
                    htmlFor="TaskRep"
                    className={classNames({ "p-error": errors.TaskRep })}
                  >
                    *Default Replinish task
                  </label>
                </span>
                {getFormErrorMessage("TaskRep")}
              </div>

              <div className="field">
                <span className="p-float-label">
                  <Controller
                    name="TaskMove"
                    control={control}
                    rules={{ required: "*Default Move Task is required" }}
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
                    htmlFor="TaskMove"
                    className={classNames({ "p-error": errors.TaskMove })}
                  >
                    *Default Move Task
                  </label>
                </span>
                {getFormErrorMessage("TaskMove")}
              </div>

              <div className="field-checkbox">
                <Controller
                  name="RcvXDock"
                  control={control}
                  rules={{ required: true }}
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
                <label
                  htmlFor="RcvXDock"
                  className={classNames({ "p-error": errors.RcvXDock })}
                >
                  Allow Cross Dock*
                </label>
              </div>

              <div className="field">
                <span className="p-float-label">
                  <Controller
                    name="RcvWrk"
                    control={control}
                    rules={{ required: "*Default Inbound Plan is required" }}
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
                    htmlFor="RcvWrk"
                    className={classNames({ "p-error": errors.RcvWrk })}
                  >
                    *Default Inbound Plan
                  </label>
                </span>
                {getFormErrorMessage("RcvWrk")}
              </div>

              <div className="field-checkbox">
                <Controller
                  name="RcvDayEarly"
                  control={control}
                  rules={{ required: true }}
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
                <label
                  htmlFor="RcvDayEarly"
                  className={classNames({ "p-error": errors.RcvDayEarly })}
                >
                  Allow early receive*
                </label>
              </div>

              <div className="field-checkbox">
                <Controller
                  name="RcvDayLate"
                  control={control}
                  rules={{ required: true }}
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
                <label
                  htmlFor="RcvDayLate"
                  className={classNames({ "p-error": errors.RcvDayLate })}
                >
                  Allow late receive*
                </label>
              </div>

              <div className="field">
                <span className="p-float-label">
                  <Controller
                    name="RcvDayAct"
                    control={control}
                    rules={{
                      required: "*Early/late receive action is required",
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
                    htmlFor="RcvDayAct"
                    className={classNames({ "p-error": errors.RcvDayAct })}
                  >
                    *Early/late receive action
                  </label>
                </span>
                {getFormErrorMessage("RcvDayAct")}
              </div>

              <div className="field">
                <span className="p-float-label">
                  <Controller
                    name="RcvOverTol"
                    control={control}
                    rules={{
                      required: "*Default over receive qty is required",
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
                    htmlFor="RcvOverTol"
                    className={classNames({ "p-error": errors.RcvOverTol })}
                  >
                    *Default over receive qty
                  </label>
                </span>
                {getFormErrorMessage("RcvOverTol")}
              </div>

              <div className="field">
                <span className="p-float-label">
                  <Controller
                    name="RcvOverAct"
                    control={control}
                    rules={{ required: "*Over receive action is required" }}
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
                    htmlFor="RcvOverAct"
                    className={classNames({ "p-error": errors.RcvOverAct })}
                  >
                    *Over receive action
                  </label>
                </span>
                {getFormErrorMessage("RcvOverAct")}
              </div>

              <div className="field">
                <span className="p-float-label">
                  <Controller
                    name="RcvQcAct"
                    control={control}
                    rules={{ required: "*Inspection action is required" }}
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
                    htmlFor="RcvQcAct"
                    className={classNames({ "p-error": errors.RcvQcAct })}
                  >
                    *Inspection action
                  </label>
                </span>
                {getFormErrorMessage("RcvQcAct")}
              </div>

              <div className="field-checkbox">
                <Controller
                  name="IssDirectShip"
                  control={control}
                  rules={{ required: true }}
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
                <label
                  htmlFor="IssDirectShip"
                  className={classNames({ "p-error": errors.IssDirectShip })}
                >
                  Allowed direct ship*
                </label>
              </div>

              <div className="field">
                <span className="p-float-label">
                  <Controller
                    name="IssShortTol"
                    control={control}
                    rules={{ required: "*Shortage pick tolerance is required" }}
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
                    htmlFor="IssShortTol"
                    className={classNames({ "p-error": errors.IssShortTol })}
                  >
                    *Shortage pick tolerance
                  </label>
                </span>
                {getFormErrorMessage("IssShortTol")}
              </div>

              <div className="field">
                <span className="p-float-label">
                  <Controller
                    name="IssShortAct"
                    control={control}
                    rules={{ required: "*Shortage pick action is required" }}
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
                    htmlFor="IssShortAct"
                    className={classNames({ "p-error": errors.IssShortAct })}
                  >
                    *Shortage pick action
                  </label>
                </span>
                {getFormErrorMessage("IssShortAct")}
              </div>

              <div className="field">
                <span className="p-float-label">
                  <Controller
                    name="IssGrpPick"
                    control={control}
                    rules={{ required: "*Default pick slip group is required" }}
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
                    htmlFor="IssGrpPick"
                    className={classNames({ "p-error": errors.IssGrpPick })}
                  >
                    *Default pick slip group
                  </label>
                </span>
                {getFormErrorMessage("IssGrpPick")}
              </div>

              <div className="field">
                <span className="p-float-label">
                  <Controller
                    name="IssGrpDel"
                    control={control}
                    rules={{ required: "*Default delivery group is required" }}
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
                    htmlFor="IssGrpDel"
                    className={classNames({ "p-error": errors.IssGrpDel })}
                  >
                    *Default delivery group
                  </label>
                </span>
                {getFormErrorMessage("IssGrpDel")}
              </div>

              <div className="field">
                <span className="p-float-label">
                  <Controller
                    name="IssCancelAct"
                    control={control}
                    rules={{ required: "*Cancel shipment action is required" }}
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
                    htmlFor="IssCancelAct"
                    className={classNames({ "p-error": errors.IssCancelAct })}
                  >
                    *Cancel shipment action
                  </label>
                </span>
                {getFormErrorMessage("IssCancelAct")}
              </div>
              <Button type="submit" label="Submit" className="mt-2" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
