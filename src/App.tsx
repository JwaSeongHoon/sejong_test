/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AdminTask, DocType, InstitutionCategory, NavPath } from './types';
import { INITIAL_CALENDAR_EVENTS } from './data/mockData';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { LoginView } from './components/views/LoginView';
import { DashboardView } from './components/views/DashboardView';
import { CalendarView } from './components/views/CalendarView';
import { AiDocsView } from './components/views/AiDocsView';
import { AiChatView } from './components/views/AiChatView';
import { ResourcesView } from './components/views/ResourcesView';
import { AnalyticsView } from './components/views/AnalyticsView';
import { UsersView } from './components/views/UsersView';
import { SettingsView } from './components/views/SettingsView';
import { NewTaskModal } from './components/modals/NewTaskModal';
import { CommandPaletteModal } from './components/modals/CommandPaletteModal';
import { NotificationDrawer } from './components/modals/NotificationDrawer';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentPath, setCurrentPath] = useState<NavPath>('dashboard');
  const [tasks, setTasks] = useState<AdminTask[]>(INITIAL_CALENDAR_EVENTS);
  const [selectedInstitutionId, setSelectedInstitutionId] = useState<string>('all');

  // Modals & Drawers
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [newTaskInitialDate, setNewTaskInitialDate] = useState<string | undefined>();
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Cross-view state (e.g. from task to AI Docs)
  const [aiDocTopic, setAiDocTopic] = useState<string | undefined>();
  const [aiDocType, setAiDocType] = useState<DocType>('가정통신문');

  // Global Keyboard Shortcuts (⌘K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (path: NavPath) => {
    if (path === 'login') {
      setIsAuthenticated(false);
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (_role: InstitutionCategory, _id: string) => {
    setIsAuthenticated(true);
    setCurrentPath('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPath('login');
  };

  const handleOpenNewTaskModal = (initialDate?: string) => {
    setNewTaskInitialDate(initialDate);
    setIsNewTaskModalOpen(true);
  };

  const handleAddTask = (newTask: AdminTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleToggleTaskComplete = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const nextStatus = t.status === 'completed' ? 'in_progress' : 'completed';
          return {
            ...t,
            status: nextStatus,
            dDay: nextStatus === 'completed' ? '완료' : 'D-1',
          };
        }
        return t;
      })
    );
  };

  const handleAiAssistClick = (task: AdminTask) => {
    setAiDocTopic(task.title);
    if (task.title.includes('가정통신문')) {
      setAiDocType('가정통신문');
    } else if (task.title.includes('정산') || task.title.includes('공문')) {
      setAiDocType('공문 초안');
    } else if (task.title.includes('실사') || task.title.includes('보고')) {
      setAiDocType('업무보고서');
    } else {
      setAiDocType('학부모 안내문');
    }
    setCurrentPath('ai-docs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If not authenticated or on login view, render the official Authentication Portal (Screen 01)
  if (!isAuthenticated || currentPath === 'login') {
    return <LoginView onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-background font-sans antialiased text-on-surface">
      {/* 1. Left Navigation Rail (Screen 02 / 03 / 05 Sidebar) */}
      <Sidebar
        currentPath={currentPath}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        pendingCount={tasks.filter((t) => t.status !== 'completed').length}
      />

      {/* 2. Top Header Utility Bar */}
      <Header
        currentPath={currentPath}
        onNavigate={handleNavigate}
        selectedInstitutionId={selectedInstitutionId}
        onSelectInstitution={setSelectedInstitutionId}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenNotifications={() => setIsNotificationOpen(true)}
      />

      {/* 3. Main Workspace Area */}
      <main className="pl-64 pt-16 min-h-screen pb-12">
        {currentPath === 'dashboard' && (
          <DashboardView
            tasks={tasks}
            onNavigate={handleNavigate}
            onOpenNewTaskModal={() => handleOpenNewTaskModal('2024-11-20')}
            onToggleTaskComplete={handleToggleTaskComplete}
            onAiAssistClick={handleAiAssistClick}
            selectedInstitutionId={selectedInstitutionId}
          />
        )}

        {currentPath === 'calendar' && (
          <CalendarView
            events={tasks}
            onOpenNewTaskModal={handleOpenNewTaskModal}
            onToggleTaskComplete={handleToggleTaskComplete}
            onAiAssistClick={handleAiAssistClick}
            selectedInstitutionId={selectedInstitutionId}
            onSelectInstitution={setSelectedInstitutionId}
          />
        )}

        {currentPath === 'ai-docs' && (
          <AiDocsView
            initialTopic={aiDocTopic}
            initialDocType={aiDocType}
          />
        )}

        {currentPath === 'ai-chat' && <AiChatView />}

        {currentPath === 'resources' && <ResourcesView />}

        {currentPath === 'analytics' && <AnalyticsView />}

        {currentPath === 'users' && <UsersView />}

        {currentPath === 'settings' && <SettingsView />}
      </main>

      {/* 4. Global Modals & Drawers */}
      <NewTaskModal
        isOpen={isNewTaskModalOpen}
        onClose={() => setIsNewTaskModalOpen(false)}
        onAddTask={handleAddTask}
        initialDate={newTaskInitialDate}
      />

      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={handleNavigate}
      />

      <NotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
