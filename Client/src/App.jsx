import { Navigation } from "./components/Navigation";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TournamentsPage } from "./pages/TournamentsPage";
import { TournamentsFormPage } from "./pages/TournamentsFormPage";
import { PlayersPage } from "./pages/PlayersPage";
import { PlayersFormPage } from "./pages/PlayersFormPage";
import { HomePage } from "./pages/HomePage";
import { SideBar } from "./components/SideBar";
import { CoursesPage } from "./pages/CoursesPage";
import { CoursesFormPage } from "./pages/CoursesFormPage";
import { CategoriesFormPage } from "./pages/CategoriesFormPage";
import { TournamentandPLayer } from "./pages/TournamentAndPlayer";
import { PlayersListForTournament } from "./components/PlayersListForTournament";
import { CoursesAndHole } from "./pages/CoursesAndHoles";
import { TournamentPage } from "./pages/TournamentPageId";
import { Divider } from "@nextui-org/react";
import { CoursePageId } from "./pages/CoursePageId";
import { Categorias } from "./pages/Categorias";
import { TournamentCategories } from "./pages/TournamentCategories";
import { TournamentCategoriesPage } from "./pages/TournamentAndCategories";
import { CategoryListForTournament } from "./components/CategoriesListForTournament";
import { AddHolesInCourse } from "./pages/AddHolesInCourse";
import { HolesFormUpdate } from "./pages/FormPageForUpdateHole";
import { HolesForScorecards } from "./pages/HolesForPlayers";
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
        <div className="w-1/4 sm:w-1/5 md:w-1/6 lg:w-1/8 xl:w-1/10">
          <SideBar />
        </div>
        <div className="flex-1 p-6 bg-black ">
          <Routes>
            <Route path="/" element={<TournamentsPage />} />
            <Route path="/tournaments" element={<TournamentsPage />} />
            <Route path="/tournaments-create" element={<TournamentsFormPage />}/>
            <Route path="/tournaments/:id" element={<TournamentPage />} />
            <Route path="/tournaments/:id/edit" element={<TournamentsFormPage />} />
            <Route path="/tournaments/:id/players" element={<TournamentandPLayer />} />  
            <Route path="/tournaments/:id/categories" element={<TournamentCategoriesPage />} />  
            <Route path="/tournaments/:id/addCategory" element={ <CategoryListForTournament />} />  
            <Route path="/tournaments/:id/addplayers" element={<PlayersListForTournament />} />  
            <Route path="/tournaments/:id/result/:scoreId" element={<HolesForScorecards />} />  
            <Route path="/players" element={<PlayersPage />} />
            <Route path="/players-create" element={<PlayersFormPage />} />
            <Route path="/players/:id" element={<PlayersFormPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:id" element={<CoursePageId />} />
            <Route path="/courses/:id/holes" element={<AddHolesInCourse />} />
            <Route path="/courses/:courseid/EditHole/:holeId" element={<HolesFormUpdate />} />
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
