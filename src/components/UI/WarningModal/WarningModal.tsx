import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomModal from "../CustomModal/CustomModal";
import classes from "./WarningModal.module.css";
import { Box, Button } from "@mui/material";
import { faWarning } from "@fortawesome/free-solid-svg-icons";

interface WarningModalProps {
  modalOpen: boolean;
  closeModal: () => void;
  onConfirm: () => void;
  onCancel?: () => void;
  warningMessage: string;
  confermText?: string;
  cancelText?: string;
  confirmButtonDisabled?: boolean;
}

const WarningModal = ({
  modalOpen,
  closeModal,
  onConfirm,
  warningMessage,
  confermText,
  cancelText,
  confirmButtonDisabled,
}: WarningModalProps) => {
  const buttonSx = {
    width: "128px",
    height: "42px",
  };

  return (
    <CustomModal isModalOpen={modalOpen} closeModal={closeModal}>
      <div className={classes.Modal}>
        <div className={classes.Warning}>
          <FontAwesomeIcon icon={faWarning} />
          <p>{warningMessage}</p>
        </div>
        <Box
          className={classes.Controlers}
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Button
            autoFocus
            sx={{
              ...buttonSx,
              color: "white",
              backgroundColor: "var(--dark-error-color) !important",
            }}
            disabled={confirmButtonDisabled}
            variant="contained"
            color="error"
            onClick={onConfirm}
          >
            {confermText ? confermText : "Confirm"}
          </Button>
          <Button
            sx={buttonSx}
            onClick={() => {
              closeModal();
            }}
            variant="text"
            color="primary"
          >
            {cancelText ? cancelText : "Cancel"}
          </Button>
        </Box>
      </div>
    </CustomModal>
  );
};

export default WarningModal;
