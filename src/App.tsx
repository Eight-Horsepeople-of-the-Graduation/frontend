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
import CustomAlert from "./components/UI/CustomAlert/CustomAlert";
import { useAppDispatch } from "./redux/hooks";
import { showAlert } from "./redux/features/alerts/alertsSlice";
import { useState } from "react";
import CreateListModal from "./components/Modals/CreateListModal/CreateListModal";

function App() {
  const dispatch = useAppDispatch();
  const [isCreatingList, sitIsCreatingList] = useState(false);

  const createNewList = () => sitIsCreatingList(true);
  const closeCreateListModal = () => sitIsCreatingList(false);

  return (
    <>

      <CustomAlert />
      <CreateListModal isCreatingList={isCreatingList} closeCreateListModal={closeCreateListModal} />


      <button onClick={() => {
        dispatch(showAlert({ message: "Test", severity: "success" }))
      }}>Add alert</button>
      <button onClick={createNewList}>Create new list</button>
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
    </>
  );
}
export default App;
