import { Route, Routes } from "react-router-dom";
import "./App.css";
import Error from "./Pages/Components/Error";
import NavBar from "./Pages/Components/Navbar";
import Home from "./Pages/Home";
import Images from "./Pages/Images";
import Pages from "./Pages/Pages";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Error />
      <Routes>
        <Route path="home" element={<Home />}></Route>
        <Route path="pages" element={<Pages />}></Route>
        <Route path="images" element={<Images />}></Route>
      </Routes>
    </div>
  );
}

export default App;
