import { useEffect, useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import SelectField from "./components/SelectField";
import type { IUser } from "./types/type";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import CheckBoxField from "./components/CheckBoxField";
import UserList from "./components/UserList";

interface IFormInput {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  city: string;
  country: string;
  state: string;
  billing: boolean;
  role: string;
}

export interface IMetadata {
  limit: number;
  page: number;
  total: number;
}

function App() {
  const [dataSource, setDataSource] = useState<IUser[] | null>([]);
  const [userId, setUserId] = useState<string | null>("");
  const [metadata, setMetadata] = useState<IMetadata>({
    limit: 0,
    page: 1,
    total: 0,
  });
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      address: "",
      city: "",
      country: "",
      state: "",
      role: "",
      billing: false,
    },
  });

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(
        "https://tony-auth-express-vdee.vercel.app/api/user?page=1&limit=1000"
      );
      const data = await res.json();
      const users = data.data.map((item: IUser) => {
        return {
          ...item,
          first_name: item.first_name,
          last_name: item.last_name,
          address: item.address,
          email: item.email,
          city: item.city,
          country: item.country,
          state: item.state,
          role: item.role,
        };
      });
      setDataSource(users);
      setMetadata({
        limit: data.limit,
        page: data.page,
        total: data.total,
      });
    }
    fetchUser();
  }, []);

  const onNextPage = () => {
    setMetadata((prevState) => {
      return {
        ...prevState,
        page: (prevState?.page || 0) + 1,
      };
    });
  };

  const onPrevPage = () => {
    setMetadata((prevState) => {
      return {
        ...prevState,
        page: (prevState?.page || 0) - 1,
      };
    });
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    // mode: add
    if (!userId) {
      try {
        const newItem = {
          id: Date.now(),
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          address: data.address,
          city: data.city,
          country: data.country,
          state: data.state,
          role: data.role,
          password: "123456",
        };
        const bodyData = {
          data: {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            role: data.role,
            state: data.state,
            country: data.country,
            address: data.address,
            city: data.city,
            password: "123456",
          },
        };
        // call api to create new user
        const res = await fetch(
          "https://tony-auth-express-vdee.vercel.app/api/user/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyData),
          }
        );
        // const newDatasource = [...(dataSource || []), newItem];
        // setDataSource(newDatasource as IUser[]);
        // reset();

        const result = await res.json();
        if (!res.ok) throw new Error(result.message || "Signup failed");

        const createdUser = result.data; 

        setDataSource([...(dataSource || []), createdUser]);
        reset();

        toast.success("Add Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          theme: "light",
        });
      } catch (err) {
        toast.error("Can not add new item", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          theme: "light",
        });
      }

      return;
    }

    if (!dataSource) return;

    // mode: edit
    const indexUser = dataSource.findIndex((item) => item._id === userId);

    if (indexUser === -1) return;
    dataSource[indexUser].first_name = data.first_name;
    dataSource[indexUser].last_name = data.last_name;
    dataSource[indexUser].email = data.email;
    dataSource[indexUser].address = data.address;
    dataSource[indexUser].city = data.city;
    dataSource[indexUser].country = data.country;
    dataSource[indexUser].state = data.state;
    dataSource[indexUser].role = data.role;
    dataSource[indexUser].billing = data.billing;

    setDataSource(dataSource as IUser[]);
    reset();

    toast.success("Update Successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      theme: "light",
    });
  };

  function handleEdit(id: string) {
    console.log("Edit ID:", id);
    if (!dataSource) return;

    setUserId(id);

    const user = dataSource.find((item) => item.id === id);
    if (!user) return;

    setValue("first_name", user.first_name);
    setValue("last_name", user.last_name);
    setValue("email", user.email);
    setValue("address", user.address);
    setValue("city", user.city);
    setValue("country", user.country);
    setValue("state", user.state);
    setValue("role", user.role);
    setValue("billing", user.billing);
  }

  async function handleDelete(id: string) {
    if (!dataSource) return;

    try {
      const response = await fetch(
        `https://tony-auth-express-vdee.vercel.app/api/user/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();

      if (!data.isSucess) {
        toast.error("Can not delete", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          theme: "light",
        });
        return;
      }
      const newUsers = dataSource.filter((item) => item._id !== id);
      setDataSource(newUsers);

      toast.success("Delete Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        theme: "light",
      });
    } catch (err) {
      toast.error("Can not delete", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        theme: "light",
      });
    }
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
                    <div className="md:col-span-2">
                      <Controller
                        name="first_name"
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
                            id="first_name"
                            label="First name"
                            {...field}
                          />
                        )}
                      />
                      {errors && errors.first_name?.message && (
                        <div className="text-red-900">
                          {errors.first_name.message}
                        </div>
                      )}
                    </div>
                    <div className="md:col-span-3">
                      <Controller
                        name="last_name"
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
                            id="last_name"
                            label="Last name"
                            {...field}
                          />
                        )}
                      />
                      {errors && errors.last_name?.message && (
                        <div className="text-red-900">
                          {errors.last_name.message}
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

                    {/* ROle */}
                    <div className="md:col-span-2">
                      <Controller
                        name="role"
                        control={control}
                        rules={{
                          required: "This field is required.",
                        }}
                        render={({ field }) => (
                          <SelectField
                            {...field}
                            id="role"
                            label="Role"
                            options={[
                              { label: "Admin", value: "admin" },
                              { label: "Operator", value: "operator" },
                              { label: "Member", value: "member" },
                            ]}
                          />
                        )}
                      />
                      {errors && errors.role?.message && (
                        <div className="text-red-900">
                          {errors.role?.message}
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
        <div className="container max-w-screen-lg mx-auto w-full relative overflow-x-auto">
          <UserList
            dataSource={dataSource || []}
            metadata={metadata}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            onNextPage={onNextPage}
            onPrevPage={onPrevPage}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
