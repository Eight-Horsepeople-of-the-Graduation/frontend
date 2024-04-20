
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/Home";
import ListsPage from "./pages/Lists/Lists";
import ProfilePage from "./pages/Profile/Profile";
import MyBooksPage from "./pages/MyBooks/MyBooks";
import SingleBookPage from "./pages/MyBooks/SingleBook/SingleBook";
import SingleListPage from "./pages/Lists/SingleList/SingleList";
import PageNotFoundPage from "./pages/PageNotFound/PageNotFoundPage";
import CurrentlyReadingPage from "./pages/Lists/SingleList/SpecialLists/CurrentlyReadingPage/CurrentlyReadingPage";
import WantToReadPage from "./pages/Lists/SingleList/SpecialLists/WantToReadPage/WantToReadPage";
import DoneReadingPage from "./pages/Lists/SingleList/SpecialLists/DoneReadingPage/DoneReadingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomePage />} path="/" />

        <Route element={<ListsPage />} path="/lists" />

        <Route element={<SingleListPage />} path="/lists/:listId" />

        <Route element={<CurrentlyReadingPage />} path="/lists/current" />

        <Route element={<WantToReadPage />} path="/lists/to-read" />

        <Route element={<DoneReadingPage />} path="/lists/done" />

        <Route element={<MyBooksPage />} path="/books" />

        <Route element={<SingleBookPage />} path="/books/:bookId" />

        <Route element={<ProfilePage />} path="/profile/:username" />

        <Route path="/*" element={<PageNotFoundPage />} />
      </Routes>
    </BrowserRouter>

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

      <CustomModal isModalOpen={isModalOpen} closeModal={closeModal}>
        <h1>Modal Content</h1>
        <p>This is a modal content</p>
      </CustomModal>
      <p>Test</p>
      <button onClick={openModal}>Open Modal</button>
      <button onClick={closeModal}>Close Modal</button>

    </>

  );
}

export default App;
