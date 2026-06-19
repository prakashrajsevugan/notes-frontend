import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddNote from "./pages/AddNote";
import EditNote from "./pages/EditNote";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import Loading from "./pages/Loading";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Loading />}
            />

            <Route
                path="/landing"
                element={<Landing />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/loading"
                element={<Loading />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/add-note"
                element={
                    <ProtectedRoute>
                        <AddNote />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/edit-note/:id"
                element={
                    <ProtectedRoute>
                        <EditNote />
                    </ProtectedRoute>
                }
            />

            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>

    );

}

export default App;