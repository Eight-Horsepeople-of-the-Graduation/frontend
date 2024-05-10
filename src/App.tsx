import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/Home";
import ListsPage from "./pages/Lists/Lists";
import ProfilePage from "./pages/Profile/Profile";
import LibraryPage from "./pages/MyBooks/LibraryPage";
import SingleBookPage from "./pages/MyBooks/SingleBook/SingleBookPage";
import SingleListPage from "./pages/Lists/SingleList/SingleList";
import PageNotFoundPage from "./pages/PageNotFound/PageNotFoundPage";
import CurrentlyReadingPage from "./pages/Lists/SingleList/SpecialLists/CurrentlyReadingPage/CurrentlyReadingPage";
import WantToReadPage from "./pages/Lists/SingleList/SpecialLists/WantToReadPage/WantToReadPage";
import DoneReadingPage from "./pages/Lists/SingleList/SpecialLists/DoneReadingPage/DoneReadingPage";
import CustomAlert from "./components/UI/CustomAlert/CustomAlert";
import AllChallengesPage from "./pages/ReadingChallenges/AllChallengesPage/AllChallengesPage";
import SingleChallengePage from "./pages/ReadingChallenges/SingleChallengePage/SingleChallengePage";
import CreateListModal from "./components/Modals/CreateListModal/CreateListModal";
import CreateReadingChallengeModal from "./components/Modals/CreateReadingChallengeModal/CreateReadingChallengeModal";

function App() {
  return (
    <>
      <CustomAlert />
      <CreateListModal />
      <CreateReadingChallengeModal />
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

          <Route element={<AllChallengesPage />} path="/challenges" />
          <Route
            element={<div>Single Challenge</div>}
            path="/challenges/:challengeId"
          />
          <Route
            element={<SingleChallengePage />}
            path="/challenges/:challengeId"
          />

          <Route path="/*" element={<PageNotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
