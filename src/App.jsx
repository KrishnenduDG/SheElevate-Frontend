import { businessLabel, userLabel } from "@/constants";
import { MasterLayout } from "@/layouts";
import {
  BusinessHomePage,
  BusinessProfilePage,
  BusinessRegistrationForm,
  HomePage,
  UserRegistrationForm,
  WorkspaceCreationForm,
  WorkspaceDetailsPage,
} from "@/pages";
import { Route, Routes } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import UserProfilePage from "./pages/UserProfilePage";

const App = () => {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path="/" element={<HomePage />} />

        <Route path="/register" element={<RegistrationPage />} />

        <Route path={`${businessLabel}/`} element={<BusinessHomePage />} />
        <Route
          path={`${businessLabel}/:username`}
          element={<BusinessProfilePage />}
        />

        <Route path={`${userLabel}/:username`} element={<UserProfilePage />} />

        <Route
          path={`${businessLabel}/register`}
          element={<BusinessRegistrationForm />}
        />

        <Route
          path={`${userLabel}/register`}
          element={<UserRegistrationForm />}
        />

        <Route path={`workspace/create`} element={<WorkspaceCreationForm />} />
        <Route
          path={`workspace/:username/:workspaceName`}
          element={<WorkspaceDetailsPage />}
        />
        <Route path="/contact-us" element={<h1>Contact Us</h1>} />
      </Route>
    </Routes>
  );
};

export default App;
