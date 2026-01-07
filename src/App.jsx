// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import Components
import Layout from './components/Layout';

// Import Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import DashboardPage from './pages/DashboardPage';
import NewsArticlePage from './pages/lessons/NewsArticlePage';
import VocabularyPage from './pages/lessons/VocabularyPage';
import IdiomPage from './pages/lessons/IdiomPage';
import BainurVocabularyPage from './pages/lessons/BainurVocabularyPage';
import YusukeStrategicCommunication from './pages/student-lessons/YusukeStrategicCommunication';

// Import the lesson routes (FIX: Capitalized filename)
import { lessonRoutes } from './LessonRoutes.jsx';

const DASHBOARD_PATH = 'teacher-portal-231340';
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Main Pages */}
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />

        {/* --- DYNAMIC ROUTES --- */}
        <Route path={DASHBOARD_PATH} element={<DashboardPage />} />
        <Route path="news/:slug/:level" element={<NewsArticlePage />} />
        <Route path="vocabulary/:lessonId" element={<VocabularyPage />} />
        <Route path="idioms/:lessonId" element={<IdiomPage />} />
        <Route path="bainur-vocabulary/:lessonId" element={<BainurVocabularyPage />} />
        <Route path="student-lessons/yusuke/1-7-2026" element={<YusukeStrategicCommunication />} />

        {/* Dynamically generate lesson routes */}
        {lessonRoutes.map(route => (
            <Route key={route.path} path={route.path} element={route.component} />
        ))}
      </Route>
    </Routes>
  );
}