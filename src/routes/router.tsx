import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "@/routes/routes.constants";
import CharactersPage from "@/pages/characters";
import PlanetsPage from "@/pages/planets";
import { Navigation } from "@/components";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import AuthPage from "@/pages/AuthPage";
import { TaskPage } from "@/pages/TaskPage";
import { MoviePage } from "@/pages/MoviePage";

function AppRouter() {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path={ROUTES.AUTH} element={<AuthPage />} />
                <Route path={ROUTES.HOME} element={<HomePage />} />
                <Route path={ROUTES.TASK} element={<TaskPage />} />
                <Route path={ROUTES.MOVIES} element={<MoviePage />} />
                <Route path={ROUTES.CHARACTERS} element={<CharactersPage />} />
                <Route path={ROUTES.PLANETS} element={<PlanetsPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );

}

export default AppRouter;
