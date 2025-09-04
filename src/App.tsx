import { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import SelectField from "./components/SelectField";
import Table from "./components/Table";
import type { IUser } from "./types/type";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import CheckBoxField from "./components/CheckBoxField";

interface IFormInput {
  full_name: string;
  email: string;
  address: string;
  city: string;
  country: string;
  state: string;
  billing: boolean;
}

function App() {
  const [dataSource, setDataSource] = useState<IUser[] | null>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      full_name: "",
      email: "",
      address: "",
      city: "",
      country: "",
      state: "",
      billing: false,
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    //Mode: add user
    const newItem = {
      id: Date.now(),
      full_name: data.full_name,
      email: data.email,
      address: data.address,
      city: data.city,
      country: data.country,
      state: data.state,
    };
    if (!userId) {
      const newDataSource = [...(dataSource || []), newItem];
      setDataSource(newDataSource as IUser[]);
      reset();

      toast.success("Add Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    if (!dataSource) return;
    const indexUser = dataSource?.findIndex((item) => item.id == userId);
    if (indexUser === -1) return;
    dataSource[indexUser].full_name = data.full_name;
    dataSource[indexUser].email = data.email;
    dataSource[indexUser].address = data.address;
    dataSource[indexUser].city = data.city;
    dataSource[indexUser].country = data.country;
    dataSource[indexUser].state = data.state;
    dataSource[indexUser].billing = data.billing;
    setDataSource(dataSource as IUser[]);
    reset();

    toast.success("Update Successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  function handleDelete(id: number) {
    if (!dataSource) return;
    const newUsers = dataSource?.filter((item) => item.id !== id);
    setDataSource(newUsers);

    toast.success("Delete Successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  function handleEdit(id: number) {
    if (!dataSource) return;
    setUserId(id);
    const user = dataSource.find((item) => item.id == id);
    if (!user) return;

    setValue("full_name", user.full_name);
    setValue("email", user.email);
    setValue("address", user.address);
    setValue("city", user.city);
    setValue("country", user.country);
    setValue("state", user.state);
    setValue("billing", user.billing);
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex-col items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Personal Details</p>
                <p>Please fill out all the fields.</p>
              </div>

              <div className="lg:col-span-2">
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    {/* Full Name */}
                    <div className="md:col-span-5">
                      <Controller
                        name="full_name"
                        control={control}
                        rules={{
                          required: "This field is required.",
                          maxLength: {
                            value: 20,
                            message: "Must be 20 characters or less.",
                          },
                          minLength: {
                            value: 6,
                            message: "Must be at least 6 characters.",
                          },
                        }}
                        render={({ field }) => (
                          <InputField
                            id="full_name"
                            label="Full Name"
                            {...field}
                          />
                        )}
                      />
                      {errors && errors.full_name?.message && (
                        <div className="text-red-900">
                          {errors.full_name.message}
                        </div>
                      )}
                    </div>

                    {/* Email */}
                    <div className="md:col-span-5">
                      <Controller
                        name="email"
                        control={control}
                        rules={{
                          required: "This field is required.",
                          maxLength: {
                            value: 50,
                            message: "Must be 50 characters or less.",
                          },
                          minLength: {
                            value: 6,
                            message: "Must be at least 6 characters.",
                          },
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email address.",
                          },
                        }}
                        render={({ field }) => (
                          <InputField id="email" label="Email" {...field} />
                        )}
                      />
                      {errors && errors.email?.message && (
                        <div className="text-red-900">
                          {errors.email.message}
                        </div>
                      )}
                    </div>

                    {/* Address */}
                    <div className="md:col-span-3">
                      <Controller
                        name="address"
                        control={control}
                        rules={{
                          required: "This field is required.",
                          maxLength: {
                            value: 150,
                            message: "Must be 150 characters or less.",
                          },
                          minLength: {
                            value: 2,
                            message: "Must be at least 2 characters.",
                          },
                        }}
                        render={({ field }) => (
                          <InputField
                            id="address"
                            label="Address / Street"
                            {...field}
                          />
                        )}
                      />
                      {errors && errors.address?.message && (
                        <div className="text-red-900">
                          {errors.address.message}
                        </div>
                      )}
                    </div>

                    {/* City */}
                    <div className="md:col-span-2">
                      <Controller
                        name="city"
                        control={control}
                        rules={{
                          required: "This field is required.",
                          maxLength: {
                            value: 20,
                            message: "Must be 20 characters or less.",
                          },
                          minLength: {
                            value: 2,
                            message: "Must be at least 2 characters.",
                          },
                        }}
                        render={({ field }) => (
                          <InputField id="city" label="City" {...field} />
                        )}
                      />
                      {errors && errors.city?.message && (
                        <div className="text-red-900">
                          {errors.city.message}
                        </div>
                      )}
                    </div>

                    {/* Country */}
                    <div className="md:col-span-2">
                      <Controller
                        name="country"
                        control={control}
                        rules={{
                          required: "This field is required.",
                        }}
                        render={({ field }) => (
                          <SelectField
                            {...field}
                            id="country"
                            label="Country / region"
                            options={[
                              { label: "United States", value: "US" },
                              { label: "CANADA", value: "CA" },
                              { label: "Viet Nam", value: "VN" },
                            ]}
                          />
                        )}
                      />
                      {errors && errors.country?.message && (
                        <div className="text-red-900">
                          {errors.country?.message}
                        </div>
                      )}
                    </div>

                    {/* State */}
                    <div className="md:col-span-2">
                      <Controller
                        name="state"
                        control={control}
                        rules={{
                          required: "This field is required.",
                        }}
                        render={({ field }) => (
                          <SelectField
                            {...field}
                            id="state"
                            label="State / Province"
                            options={[
                              { label: "Phu Nhuan", value: "Phu nhuan" },
                              { label: "Q1", value: "Q1" },
                              { label: "Q2", value: "Q2" },
                            ]}
                          />
                        )}
                      />
                      {errors && errors.state?.message && (
                        <div className="text-red-900">
                          {errors.state?.message}
                        </div>
                      )}
                    </div>

                    {/* Billing */}
                    <div className="md:col-span-5">
                      <div className="">
                        <Controller
                          name="billing"
                          control={control}
                          render={({ field }) => (
                            <CheckBoxField
                              id="billing"
                              label="My billing address is different than above."
                              {...field}
                            />
                          )}
                        />
                      </div>
                    </div>
                    {/* Submit */}
                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <button
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*  Table render information user  */}
      <div className="container max-w-screen-lg mx-auto w-full relative overflow-x-auto">
        <Table
          tableHeaders={[
            "Full name",
            "Email Adress",
            "Address",
            "City",
            "Country",
            "State",
            "Action",
          ]}
          dataSource={dataSource || []}
          renderRow={(data: IUser) => {
            return (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {data.full_name}
                </th>
                <td className="px-6 py-4">{data.email}</td>
                <td className="px-6 py-4">{data.address}</td>
                <td className="px-6 py-4">{data.city}</td>
                <td className="px-6 py-4">{data.country}</td>
                <td className="px-6 py-4">{data.state}</td>
                <td className="px-6 py-4">
                  <div className="flex">
                    <button
                      type="button"
                      className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-2 py-1 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      onClick={() => handleEdit(data.id)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-2 py-1 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      onClick={() => handleDelete(data.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          }}
        />
      </div>
    </div>
  );
}

export default App;
