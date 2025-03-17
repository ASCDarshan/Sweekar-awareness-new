import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

// Layout
import Layout from './components/layout/Layout';

// Pages
import HomePage from './pages/HomePage';
import IntroductionPage from './pages/IntroductionPage';
import HistoricalPage from './pages/HistoricalPage';
import QuizPage from './pages/QuizPage';
import GlossaryPage from './pages/GlossaryPage';
import ProgressPage from './pages/ProgressPage';
import ResourcesPage from './pages/ResourcesPage';

// Error page
const ErrorPage = () => (
  <div>
    <h1>404 - Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
  </div>
);

// Placeholder pages for sections that haven't been implemented yet
const PlaceholderPage = ({ title }) => (
  <div>
    <h2>{title}</h2>
    <p>This section is under development.</p>
  </div>
);

// Create router with layout wrapper
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Layout><ErrorPage /></Layout>,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'introduction',
        element: <IntroductionPage />,
      },
      {
        path: 'history',
        element: <Navigate to="/history/ancient" replace />,
      },
      {
        path: 'history/:subsectionId',
        element: <HistoricalPage />,
      },
      {
        path: 'quiz/:sectionId',
        element: <QuizPage />,
      },
      {
        path: 'glossary',
        element: <GlossaryPage />,
      },
      {
        path: 'identities',
        element: <PlaceholderPage title="Sexual Orientation & Gender Identity" />,
      },
      {
        path: 'legal',
        element: <PlaceholderPage title="Legal Landscape" />,
      },
      {
        path: 'challenges',
        element: <PlaceholderPage title="Social Challenges" />,
      },
      {
        path: 'progress',
        element: <PlaceholderPage title="Progress & Developments" />,
      },
      {
        path: 'profile',
        element: <ProgressPage />,
      },
      {
        path: 'resources',
        element: <ResourcesPage />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;