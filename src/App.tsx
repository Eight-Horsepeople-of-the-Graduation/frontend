import { useState } from "react";
import CustomModal from "./components/UI/CustomModal/CustomModal";
import { Button, Container, Grid } from "@mui/material";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Container
        style={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CustomModal isModalOpen={isModalOpen} closeModal={closeModal}>
          <h1>Modal Content</h1>
          <p>This is a modal content</p>
        </CustomModal>

        <Grid container spacing={1} style={{ width: "25%" }}>
          <Grid item xs={6}>
            <Button variant="contained" onClick={openModal}>
              Open Modal
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="outlined" onClick={closeModal}>
              Close Modal
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
