import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import MainLayout from "./layouts/MainLayout";

// Main Pages
import DashboardMetrics from "./caxuxcompliance dash.jsx";
import TaskManagementInline from "./CaxusCompliance TM.jsx";
import TeamsPageInline from "./caxusTeamsPage.jsx";
import ComplianceCalendarPage from "./caxuscompliancecalendar.jsx";
import NoticeManagement from "./caxuscomplianceNM.jsx";
import DocumentsRepository from "./pages/DocumentsRepository.jsx";
import GSTCompliances from "./GSTCompliances.jsx";
import CaxusAuth from "./CaxusComplianceLogin.jsx";
import CaxusCompliance from "./caxuscompliance reg.jsx";
import PasswordVaultInline from "./caxusPasswordVault.jsx";
import { PageTitle, Paragraph } from "./components/Typography";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App min-h-screen bg-gray-100 font-sans">
          <Routes>
            {/* Public Routes - Redirect to dashboard if already authenticated */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <CaxusAuth />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <CaxusCompliance />
                </PublicRoute>
              }
            />

            {/* Protected Routes - Require authentication */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardMetrics />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/vault"
                element={
                  <ProtectedRoute>
                    <PasswordVaultInline />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/tasks"
                element={
                  <ProtectedRoute>
                    <TaskManagementInline />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/teams"
                element={
                  <ProtectedRoute>
                    <TeamsPageInline />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/caxus/calendar"
                element={
                  <ProtectedRoute>
                    <ComplianceCalendarPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/notices"
                element={
                  <ProtectedRoute>
                    <NoticeManagement />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/documents"
                element={
                  <ProtectedRoute>
                    <DocumentsRepository />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/gst-compliances"
                element={
                  <ProtectedRoute>
                    <GSTCompliances />
                  </ProtectedRoute>
                }
              />

              {/* Removed standalone Password page; Password Vault (/vault) remains */}

              <Route
                path="/mca"
                element={
                  <ProtectedRoute>
                    <div className="p-8 text-center min-h-screen flex items-center justify-center">
                      <div>
                        <PageTitle>MCA Compliances</PageTitle>
                        <Paragraph>Coming Soon</Paragraph>
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/education"
                element={
                  <ProtectedRoute>
                    <div className="p-8 text-center min-h-screen flex items-center justify-center">
                      <div>
                        <PageTitle>User Education</PageTitle>
                        <Paragraph>Coming Soon</Paragraph>
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* 404 Catch-all Route */}
            <Route
              path="*"
              element={
                <div className="p-8 text-center min-h-screen flex items-center justify-center">
                  <h1 className="text-4xl text-red-500">
                    404 - Page Not Found
                  </h1>
                </div>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
