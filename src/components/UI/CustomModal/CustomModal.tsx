import { useEffect } from "react";
import classes from "./CustomModal.module.css";

interface customModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

const CustomModal = (props: customModalProps) => {
  const { isModalOpen, closeModal, children } = props;

  const handleSectionClick = (event: React.MouseEvent<HTMLOptionElement>) => {
    // Prevent click propagation to children if it's not a direct click on the section
    if (event.target !== event.currentTarget) {
      return;
    }

    closeModal();
  };

  useEffect(() => {
    // Handle Escape key press to close modal
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    // Add event listener on modal open and remove on close
    if (isModalOpen) {
      document.addEventListener("keydown", handleEscape);
    } else {
      document.removeEventListener("keydown", handleEscape);
    }

    // Cleanup function (optional)
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isModalOpen, closeModal]); // Dependency array ensures listener updates

  return (
    isModalOpen && (
      <section onClick={handleSectionClick} className={classes.fade}>
        <article autoFocus className={classes.modal}>
          {children}
        </article>
      </section>
    )
  );
};

export default CustomModal;
