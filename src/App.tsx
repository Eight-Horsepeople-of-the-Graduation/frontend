import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/Home";
import ListsPage from "./pages/Lists/Lists";
import ProfilePage from "./pages/Profile/Profile";
import LibraryPage from "./pages/MyBooks/LibraryPage";
import SingleBookPage from "./pages/SingleBook/SingleBookPage";
import SingleListPage from "./pages/Lists/SingleList/SingleListPage";
import PageNotFoundPage from "./pages/PageNotFound/PageNotFoundPage";
import CurrentlyReadingPage from "./pages/Lists/SingleList/SpecialLists/CurrentlyReadingPage/CurrentlyReadingPage";
import WantToReadPage from "./pages/Lists/SingleList/SpecialLists/WantToReadPage/WantToReadPage";
import DoneReadingPage from "./pages/Lists/SingleList/SpecialLists/DoneReadingPage/DoneReadingPage";
import CustomAlert from "./components/UI/CustomAlert/CustomAlert";
import AllChallengesPage from "./pages/ReadingChallenges/AllChallengesPage/AllChallengesPage";
import CreateListModal from "./components/Modals/CreateListModal/CreateListModal";
import CreateReadingChallengeModal from "./components/Modals/CreateReadingChallengeModal/CreateReadingChallengeModal";
import AddBookToListsModal from "./components/Modals/AddBookToListsModal/AddBookToListsModal";
import RemoveBookFromListModal from "./components/Modals/RemoveBookFromListModal/RemoveBookFromListModal";
import LoadingSpinner from "./components/UI/LoadingSpinner/LoadingSpinner";
import EditProfilePage from "./pages/Profile/EditProfilePage/EditProfilePage";
import { useAppSelector } from "./redux/hooks";
import RemoveChallengeModal from "./components/Modals/RemoveChallengeModal/RemoveChallengeModal";
import DeleteListModal from "./components/Modals/DeleteListModal/DeleteListModal";

function App() {
  const modalsStates = useAppSelector((state) => state.modals);
  return (
    <>
      <CustomAlert />
      <LoadingSpinner />
      <CreateListModal />
      <CreateReadingChallengeModal />
      <RemoveChallengeModal />
      {modalsStates.bookToRemoveFromListId &&
        modalsStates.listToRemoveBookFromId && <RemoveBookFromListModal />}
      {modalsStates.bookToAddToListId && <AddBookToListsModal />}

      {modalsStates.listToDeleteId && <DeleteListModal />}
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

          <Route element={<EditProfilePage />} path="/profile/:username/edit" />

          <Route element={<AllChallengesPage />} path="/challenges" />

          <Route path="/*" element={<PageNotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
