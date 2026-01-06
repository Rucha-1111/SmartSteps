import { BrowserRouter, Routes, Route } from "react-router-dom";
import Subjects from "./pages/Subjects";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main page to select subjects */}
        <Route path="/" element={<Subjects />} />

        {/* Quiz page */}
        <Route path="/quiz" element={<Quiz />} />

        {/* Results page */}
        <Route path="/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
