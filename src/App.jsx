/* eslint-disable react/prop-types */
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { theme } from "./theme/theme";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import HomePage from "./pages/HomePage";
import IntroductionPage from "./pages/IntroductionPage";
import IdentityPage from "./pages/IdentityPage";
import LegalPage from "./pages/LegalPage";
import HistoricalPage from "./pages/HistoricalPage";
import QuizPage from "./pages/QuizPage";
import GlossaryPage from "./pages/GlossaryPage";
import ResourcesPage from "./pages/ResourcesPage";
import { ProgressProvider } from "./contexts/ProgressContext";
import Layout from "./components/layout/Layout";
import ChallengesPage from "./pages/ChallengesPage";
import SocialPage from "./pages/SocialPage";

const ErrorPage = () => (
  <div>
    <h1>404 - Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
  </div>
);
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <ProgressProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/introduction" element={<IntroductionPage />} />
                <Route path="/history" element={<HistoricalPage />} />
                <Route
                  path="/history/:subsectionId"
                  element={<HistoricalPage />}
                />
                <Route
                  path="/identities"
                  element={
                    <IdentityPage title="Sexual Orientation & Gender Identity" />
                  }
                />
                <Route
                  path="/legal"
                  element={<LegalPage title="Legal Landscape" />}
                />
                <Route
                  path="/challenges"
                  element={<ChallengesPage title="Social Challenges" />}
                />
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="/social" element={<SocialPage />} />
                <Route path="/glossary" element={<GlossaryPage />} />
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </Layout>
          </Router>
        </ProgressProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
