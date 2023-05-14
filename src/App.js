import { Routes, Route, BrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Text } from "@chakra-ui/react";
import { Amplify } from "aws-amplify";

import AuthDependentRoute from "./components/AuthDependentRoute";
import awsconfig from "./aws-exports";
import PageLayout from "./components/PageLayout";

const LandingPage = lazy(() => import("./pages/landing-page"));
const LoginSignupPage = lazy(() => import("./pages/login-signup-page"));
const FeedPage = lazy(() => import("./pages/feed-page"));
const ProfilePage = lazy(() => import("./pages/profile-page"));
const PatientRecordsPage = lazy(() => import("./pages/patient-records-page"));
const EventsPage = lazy(() => import("./pages/events-page"));

Amplify.configure(awsconfig);

const App = () => {
  return (
    <Suspense fallback={<Text>Loading ...</Text>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="events" element={<EventsPage />} />

            <Route
              path="login-signup"
              element={
                <AuthDependentRoute isAuthPage>
                  <LoginSignupPage />
                </AuthDependentRoute>
              }
            />
            <Route
              path="feed"
              element={
                <AuthDependentRoute>
                  <FeedPage />
                </AuthDependentRoute>
              }
            />
            <Route
              path="profile"
              element={
                <AuthDependentRoute>
                  <ProfilePage />
                </AuthDependentRoute>
              }
            />
            <Route
              path="patient-records"
              element={
                <AuthDependentRoute>
                  <PatientRecordsPage />
                </AuthDependentRoute>
              }
            />
            <Route path="*" element={<Text>No page found</Text>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
