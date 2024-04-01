import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Home Page</h1>} />
      <Route path="/contact-us" element={<h1>Contact Us</h1>} />
    </Routes>
  );
};

export default App;
