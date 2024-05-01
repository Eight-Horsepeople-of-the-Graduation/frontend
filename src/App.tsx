import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/Home";
import ListsPage from "./pages/Lists/Lists";
import ProfilePage from "./pages/Profile/Profile";
import LibraryPage from "./pages/MyBooks/LibraryPage";
import SingleBookPage from "./pages/MyBooks/SingleBook/SingleBook";
import SingleListPage from "./pages/Lists/SingleList/SingleList";
import PageNotFoundPage from "./pages/PageNotFound/PageNotFoundPage";
import CurrentlyReadingPage from "./pages/Lists/SingleList/SpecialLists/CurrentlyReadingPage/CurrentlyReadingPage";
import WantToReadPage from "./pages/Lists/SingleList/SpecialLists/WantToReadPage/WantToReadPage";
import DoneReadingPage from "./pages/Lists/SingleList/SpecialLists/DoneReadingPage/DoneReadingPage";
import CustomAlert from "./components/UI/CustomAlert/CustomAlert";

function App() {
  return (
    <>
      <CustomAlert />
      <BrowserRouter>
        <Routes>
          <Route element={<HomePage />} path="/" />

          <Route element={<ListsPage />} path="/lists" />

          <Route element={<SingleListPage />} path="/lists/:listId" />

          <Route element={<CurrentlyReadingPage />} path="/lists/current" />

          <Route element={<WantToReadPage />} path="/lists/to-read" />

          <Route element={<DoneReadingPage />} path="/lists/done" />

          <Route element={<LibraryPage />} path="/library" />

          <Route element={<SingleBookPage />} path="/books/:bookId" />

          <Route element={<ProfilePage />} path="/profile/:username" />

          <Route path="/*" element={<PageNotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
