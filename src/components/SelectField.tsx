import clsx from "clsx";
import type { IOptionItem } from "../types/type";

interface SelectFieldProps extends React.PropsWithChildren {
  id: string;
  label: string;
  type?: string;
  className?: string;
  options: IOptionItem[];
}

function SelectField({
  id,
  label,
  type = "text",
  className = "",
  options = [],
  ...restProps
}: SelectFieldProps) {
  return (
    <>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <select
        id={id}
        className={clsx(
          "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",
          className
        )}
        {...restProps}
      >
        <option selected>Choose a option</option>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </>
  );
}

export default SelectField;
