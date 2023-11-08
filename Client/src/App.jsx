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
import { CoursesAndHole } from "./pages/CoursesAndHoles";
import { TournamentPage } from "./pages/TournamentPage";
import { PlayerPage } from "./pages/PlayerPage";
import { Divider } from "@nextui-org/react";
import { CoursePageId } from "./pages/CoursePageId";
import { Categorias } from "./pages/Categorias";


function App() {
  return (
    <BrowserRouter>
    <div>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#18181b",
            color: "#fff",
          },
        }}
      />
      <Navigation />
      <Divider />
      <div className="flex h-screen">
        <div className="w-[300px]">
          <SideBar />
        </div>
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<TournamentsPage />} />
            <Route path="/tournaments" element={<TournamentsPage />} />
            <Route path="/tournaments-create" element={<TournamentsFormPage />}/>
            <Route path="/tournaments/:id" element={<TournamentPage />} />
            <Route path="/tournaments/:id/edit" element={<TournamentsFormPage />} />
            <Route path="/tournaments/:id/players" element={<TournamentandPLayer />} />  
            <Route path="/tournaments/:id/categories" element={ <Categorias />} />  
            <Route path="/tournaments/:id/addplayers" element={<PlayersListForTournament />} />  
            <Route path="/players" element={<PlayersPage />} />
            <Route path="/players-create" element={<PlayersFormPage />} />
            <Route path="/players/:id" element={<PlayerPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:id" element={<CoursePageId />} />
            <Route path="/courses/:id/holes" element={<CoursesAndHole />} />
            <Route path="/courses-create" element={<CoursesFormPage />} />
            <Route path="/categories/:id" element={<CategoriesFormPage />} />  
            <Route path="/categories/" element={<Categorias />} />  
          </Routes>
        </div>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;