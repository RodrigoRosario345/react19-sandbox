import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "@/routes/routes.constants";
import CharactersPage from "@/pages/characters";
import { Navigation } from "@/components";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import AuthPage from "@/pages/AuthPage";
import { TaskPage } from "@/pages/TaskPage";
import { MoviePage } from "@/pages/MoviePage";
import { PlanetPage } from "@/pages/PlanetPage";
import { MovieContainer, MovieCreateForm, MovieEditForm } from "@/components/MoviesSupabase";


function AppRouter() {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path={ROUTES.AUTH} element={<AuthPage />} />
                <Route path={ROUTES.HOME} element={<HomePage />} />
                <Route path={ROUTES.TASK} element={<TaskPage />} />
                <Route path={ROUTES.MOVIES} element={<MoviePage />}>
                    <Route index element={<MovieContainer />} /> 
                    {/* <Route path=":id" element={<MovieDetail />} />  */}
                    <Route path="create" element={<MovieCreateForm />} /> 
                    <Route path="edit" element={<MovieEditForm />} /> 
                </Route>
                <Route path={ROUTES.CHARACTERS} element={<CharactersPage />} />
                <Route path={ROUTES.PLANETS} element={<PlanetPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );

}

export default AppRouter;
