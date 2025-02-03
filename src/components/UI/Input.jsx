export default function Input({ label, id, ...props }) {
  return (
    <p className="control">
      <label htmlFor={id}> {/* label is connected to input using "htmlFor" prop for label and "id" prop for "input" */}
        {label}
      </label>
      <input type="text" name={id} id={id} {...props} required />
    </p>
  );
}
