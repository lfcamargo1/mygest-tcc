import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Home from "./Pages/Home/Home";


export default function Router() {
    return(
        <Routes>
            <Route path="/" element={ <Login/> } /> 
            <Route path="/register" element={ <Register /> } /> 
            <Route path="/home" element={ <Home /> } /> 
        </Routes>
    )
}