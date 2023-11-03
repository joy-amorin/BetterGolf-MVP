import { Navigation } from "./components/Navigation";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TournamentsPage } from "./pages/TournamentsPage";
import { TournamentsFormPage } from "./pages/TournamentsFormPage";
import { PlayersPage } from "./pages/PlayersPage";
import { PlayersFormPage } from "./pages/PlayersFormPage";
import { HomePage } from "./pages/HomePage";
/* import { ResultsPage } from "./pages/ResultsPage"; */
import { SideBar } from "./components/SideBar";
import { CoursesPage } from "./pages/CoursesPage";
import { CoursesFormPage } from "./pages/CoursesFormPage";
import { CategoriesFormPage } from "./pages/CategoriesFormPage";
import { TournamentandPLayer } from "./pages/TournamentandPLayer";
import { PlayersListForTournament } from "./components/PlayersListForTournament";
import { CoursesAndHole } from "./pages/HolesInCourses";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="flex h-screen">
        <div className="w-[300px]">
          <SideBar />
        </div>
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tournaments" element={<TournamentsPage />} />
            <Route path="/tournaments-create" element={<TournamentsFormPage />}/>
            <Route path="/tournaments/:id" element={<TournamentsFormPage />} />
            <Route path="/tournaments/:id/players" element={<TournamentandPLayer />} />  
            <Route path="/tournaments/:id/addplayers" element={<PlayersListForTournament />} />  
            <Route path="/players" element={<PlayersPage />} />
            <Route path="/players-create" element={<PlayersFormPage />} />
            <Route path="/players/:id" element={<PlayersFormPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:id" element={<CoursesFormPage />} />
            <Route path="/courses/:id/holes" element={<CoursesAndHole />} />
            <Route path="/courses-create" element={<CoursesFormPage />} />
            <Route path="/categories/:id" element={<CategoriesFormPage />} />  
            
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
