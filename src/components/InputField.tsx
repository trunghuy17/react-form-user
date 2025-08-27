import clsx from "clsx";

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  className?: string;
}

function InputField({
  id,
  label,
  type = "text",
  className = "",
  ...restProps
}: InputFieldProps) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        name={id}
        id={id}
        className={clsx(
          "h-10 border mt-1 rounded px-4 w-full bg-gray-50",
          className
        )}
        defaultValue=""
        {...restProps}
      />
    </>
  );
}

export default InputField;
