import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import AboutPage from "./components/AboutPage";
import { ChatbotPage } from "./components/ChatbotPage";
import { HomePage } from "./components/HomePage";
import { Navbar } from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SessionContext } from "./contexts/sessionContext";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";


function App() {
  const queryClient = new QueryClient();

  return (
    <SessionContext.Provider value={{ sessionId: crypto.randomUUID() }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Navbar />
          <div className="main-content-container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/chatbot" element={<ChatbotPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/details" element={<div>Details Page</div>} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </SessionContext.Provider>
  );
}

export default App;
