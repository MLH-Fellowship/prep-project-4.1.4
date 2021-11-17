import "./App.css";
import MainPage from "./Pages/MainPage/MainPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
