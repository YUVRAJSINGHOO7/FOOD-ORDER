export default function Button({ children, textOnly, className, ...props }) {  // The textOnly prop on a button is not a standard HTML or React prop but is commonly used in UI component libraries (like Material-UI or custom design systems) to style buttons without a background or border, making them appear as plain text.
  let cssClasses = textOnly ? "text-button" : "button";
  cssClasses += " " + className;
  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
}

// How textOnly Works:
// When "textOnly" is "true", the button removes any background, border, or shadow.
// It typically inherits text color from its parent.
// Often used for minimal or secondary actions (e.g., "Cancel" or "Learn more" links).
// by-default "textOnly" is "true"
// just add "textOnly" on a button
