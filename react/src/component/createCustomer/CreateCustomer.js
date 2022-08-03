import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCustomers } from "../../store/customer/action";
import { useNavigate } from "react-router-dom";
export default function CreateCustomer() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [countries, setCountries] = useState([]);

  const defaultValues = {
    CusCode: "",
    CusName: "",
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
    await axios
      .post(`${process.env.REACT_APP_API_URL}/addNewCustomer`, data)
      .then((res) => {
        dispatch(setCustomers(res.data.customers.reverse()));
        navigate("/customer");

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
        <div className="card">
          <h5 className="text-center">Create Customer</h5>
          <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
            <div className="field">
              <span className="p-float-label">
                <Controller
                  name="CusCode"
                  control={control}
                  rules={{ required: "*Customer Code is required" }}
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
                  htmlFor="CusCode"
                  className={classNames({ "p-error": errors.CusCode })}
                >
                  *Customer Code
                </label>
              </span>
              {getFormErrorMessage("CusCode")}
            </div>

            <div className="field">
              <span className="p-float-label">
                <Controller
                  name="CusName"
                  control={control}
                  rules={{ required: "*Customer Name is required" }}
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
                  htmlFor="CusName"
                  className={classNames({ "p-error": errors.CusName })}
                >
                  *Customer Name
                </label>
              </span>
              {getFormErrorMessage("CusName")}
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
                      message: "Invalid email address. E.g. example@email.com",
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
            <Button type="submit" label="Submit" className="mt-2" />
          </form>
        </div>
      </div>
    </div>
  );
}
