import classes from "./CustomModal.module.css";

interface customModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}
const CustomModal = (props: customModalProps) => {
  const { isModalOpen, closeModal, children } = props;

  return (
    isModalOpen && (
      <section onClick={closeModal} className={classes.fade}>
        <article autoFocus className={classes.modal}>
          {children}
        </article>
      </section>
    )
  );
};

export default CustomModal;
