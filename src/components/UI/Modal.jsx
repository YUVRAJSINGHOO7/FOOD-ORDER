import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, onClose, className = "" }) {
  const dialog = useRef();
  useEffect(() => {
    // it is recommanded to lock-in the value i.e, "dialog.current" to a constant
    const modal = dialog.current; // we always have to access .current() property when using useRefs()
    if (open) {
      modal.showModal(); //  and .showModal() is the built-in method that can be executed on the dialog element to show it / to open it programmetically.
    }

    // a clean-up function => it only runs when the effect function is going to run again. here whenever the "open" prop value changes => the clean-up function will run.
    return () => modal.close();
  }, [open]);
  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}> {/* here the "onClose" is used to fix the bug when we press the "ESCAPE" key on keyboard */}
      {children}
    </dialog>, // <dialog></dialog> is the best element for displaying overlays, beacuse it handles a lot of complexity for us
    document.getElementById("modal")
  );
}

// <dialog></dialog> element also have a prop called "open". but we are not using it like this => <dialog open={open}>{children}</dialog>, because by doing this we miss out certain features
// we wanna open <dialog></dialog> element programmetically, not by setting open={open}
// opening <dialog></dialog> element programmetically => displays a back drop.

// portal is a feature that REACT offers us, so that we can use this Modal component from any where in our component tree but we will inject the dialog when it's visible in a specific area of the real DOM that we as a developer control upfront
// we are going to inject it in <div id="modal"></div> (index.html). that's where we are going to inject those <dialog></dialog> element, when we create and open them with the Modal component
// the 1st argument in createPortal() is where the jsx content that should be portaled somewhere else and that should be rendered by this component
// 2nd argument is the code that selects an element in the real DOM(index.html), which ofcourse is the <div id="modal"></div>
