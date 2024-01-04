import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import ExercicePage from "./pages/ExercicePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LearnPage from "./pages/LearnPage";

function App() {
  return (
    <>
      <Container>
        <BrowserRouter>
          <div>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Routes>
              <Route
                path="/exercice/:exerId"
                element={<ExercicePage />}
              ></Route>
              <Route path="/learn" element={<LearnPage />}></Route>
              <Route path="/" element={<MainPage />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </Container>
    </>
  );
}

export default App;
