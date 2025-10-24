interface CheckBoxFieldProps {
  label: string;
  id: string;
}

function CheckBoxField({ label, id, ...restProps }: CheckBoxFieldProps) {
  return (
    <>
      <input type="checkbox" name={id} id={id} className="form-checkbox" />
      <label htmlFor="billing_same" className="ml-2">
        {label}
      </label>
    </>
  );
}

export default CheckBoxField;
