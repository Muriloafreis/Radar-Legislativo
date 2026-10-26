import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LiveSessionTicker } from './components/LiveSessionTicker';
import { ProjectsTracker } from './components/ProjectsTracker';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { PoliticiansTab } from './components/PoliticiansTab';
import { PoliticianDetailModal } from './components/PoliticianDetailModal';
import { CoherenceRadarTab } from './components/CoherenceRadarTab';
import { CitizenVoteSimulatorTab } from './components/CitizenVoteSimulatorTab';
import { NotificationsCenterModal } from './components/NotificationsCenterModal';
import { PoliticalGlossaryModal } from './components/PoliticalGlossaryModal';
import { GovernmentPlanTrackerTab } from './components/GovernmentPlanTrackerTab';
import { OfficialSourcesTab } from './components/OfficialSourcesTab';
import { PublicWorksTab } from './components/PublicWorksTab';
import { ElectoralGuideTab } from './components/ElectoralGuideTab';
import {
  LEGISLATIVE_PROJECTS,
  POLITICIANS_DATABASE,
  INITIAL_ALERTS
} from './data/mockLegislativeData';
import {
  LegislativeProject,
  PoliticianProfile,
  LegislativeAlert,
  NotificationSettings
} from './types/legislative';
import { notificationService } from './services/notificationService';
import { Landmark, Scale, ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'pautas' | 'plano_governo' | 'obras' | 'politicos' | 'coerencia' | 'simulador' | 'guia_eleitoral' | 'fontes'>('pautas');
  const [projects, setProjects] = useState<LegislativeProject[]>(LEGISLATIVE_PROJECTS);
  const [politicians, setPoliticians] = useState<PoliticianProfile[]>(POLITICIANS_DATABASE);
  const [alerts, setAlerts] = useState<LegislativeAlert[]>(INITIAL_ALERTS);

  const [selectedProject, setSelectedProject] = useState<LegislativeProject | null>(null);
  const [selectedPolitician, setSelectedPolitician] = useState<PoliticianProfile | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    enableUrgencyAlerts: true,
    enableVotingLiveAlerts: true,
    enableIdeologyDivergenceAlerts: true,
    enableSound: true,
    selectedThemes: [],
    selectedHouses: ['camara', 'senado', 'congresso']
  });

  const unreadAlertsCount = alerts.filter(a => !a.isRead).length;

  const handleOpenProjectByCode = (code: string) => {
    const cleanCode = code.trim().toLowerCase();
    const found = projects.find(
      p => p.code.toLowerCase().includes(cleanCode) || cleanCode.includes(p.code.toLowerCase())
    );
    if (found) {
      setSelectedProject(found);
    }
  };

  const handleSelectPoliticianById = (id: string) => {
    const found = politicians.find(p => p.id === id);
    if (found) {
      setSelectedPolitician(found);
    }
  };

  const handleMarkAlertAsRead = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, isRead: true } : a));
  };

  const handleMarkAllAlertsAsRead = () => {
    setAlerts(prev => prev.map(a => ({ ...a, isRead: true })));
  };

  // Live simulation trigger
  const handleSimulateLiveEvent = () => {
    setIsSimulating(true);

    setTimeout(() => {
      // Create new event
      const newAlert: LegislativeAlert = {
        id: `alt-${Date.now()}`,
        title: 'Atualização em Tempo Real: Quórum Ampliado na Câmara',
        description: 'Votação nominal do PLP 68/2024 registrou 491 deputados no painel eletrônico. Destaque sobre alíquotas de medicamentos aprovado.',
        timestamp: 'Agora mesmo',
        type: 'voting_started',
        projectCode: 'PLP 68/2024',
        house: 'camara',
        isRead: false
      };

      setAlerts(prev => [newAlert, ...prev]);

      // Update the voting project tally
      setProjects(prev => prev.map(p => {
        if (p.id === 'plp-68-2024' && p.totalVotes) {
          return {
            ...p,
            lastUpdateDate: 'Agora mesmo',
            totalVotes: {
              ...p.totalVotes,
              yes: p.totalVotes.yes + 5,
              no: p.totalVotes.no + 2,
              quorum: 491
            }
          };
        }
        return p;
      }));

      // Trigger automatic notification (sound + desktop notification)
      notificationService.notifyUser(newAlert, notificationSettings);
      setIsSimulating(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Institutional Top Bar Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        alerts={alerts}
        unreadCount={unreadAlertsCount}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onSimulateLiveEvent={handleSimulateLiveEvent}
        isSimulating={isSimulating}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
      />

      {/* Live Active Sessions Ticker (Senado & Camara) */}
      <LiveSessionTicker
        onSelectProjectByCode={handleOpenProjectByCode}
      />

      {/* Main Viewport Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8">
        {activeTab === 'pautas' && (
          <ProjectsTracker
            projects={projects}
            onSelectProject={(project) => setSelectedProject(project)}
            onExplainWithAI={(project) => setSelectedProject(project)}
            onSimulateCitizenVote={(project) => setSelectedProject(project)}
            onSelectPoliticianById={handleSelectPoliticianById}
          />
        )}

        {activeTab === 'plano_governo' && (
          <GovernmentPlanTrackerTab
            onOpenProjectByCode={handleOpenProjectByCode}
          />
        )}

        {activeTab === 'obras' && (
          <PublicWorksTab
            onSelectPoliticianById={handleSelectPoliticianById}
          />
        )}

        {activeTab === 'politicos' && (
          <PoliticiansTab
            politicians={politicians}
            onSelectPolitician={(pol) => setSelectedPolitician(pol)}
            onOpenProjectByCode={handleOpenProjectByCode}
          />
        )}

        {activeTab === 'coerencia' && (
          <CoherenceRadarTab
            politicians={politicians}
            projects={projects}
            onSelectPolitician={(pol) => setSelectedPolitician(pol)}
            onSelectProject={(proj) => setSelectedProject(proj)}
          />
        )}

        {activeTab === 'simulador' && (
          <CitizenVoteSimulatorTab
            projects={projects}
            politicians={politicians}
            onSelectPolitician={(pol) => setSelectedPolitician(pol)}
            onSelectProject={(proj) => setSelectedProject(proj)}
          />
        )}

        {activeTab === 'guia_eleitoral' && (
          <ElectoralGuideTab
            politicians={politicians}
            onSelectPoliticianById={handleSelectPoliticianById}
          />
        )}

        {activeTab === 'fontes' && (
          <OfficialSourcesTab />
        )}
      </main>

      {/* Modal: Project Details & Citizen AI Translation */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectPoliticianById={handleSelectPoliticianById}
      />

      {/* Modal: Politician Proposals & Vote Coherence Summary */}
      <PoliticianDetailModal
        politician={selectedPolitician}
        onClose={() => setSelectedPolitician(null)}
        onOpenProjectByCode={handleOpenProjectByCode}
      />

      {/* Modal: Automatic Notifications Center & Filter Settings */}
      <NotificationsCenterModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        alerts={alerts}
        settings={notificationSettings}
        onUpdateSettings={setNotificationSettings}
        onMarkAsRead={handleMarkAlertAsRead}
        onMarkAllAsRead={handleMarkAllAlertsAsRead}
        onSelectProjectByCode={handleOpenProjectByCode}
      />

      {/* Modal: Political Glossary for everyday citizens */}
      <PoliticalGlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />

      {/* Institutional Editorial Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-8 px-4 sm:px-8 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-white font-bold text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Radar Legislativo Brasil
            </div>
            <p className="text-slate-500">
              Plataforma independente de transparência pública cívica e acompanhamento do Senado Federal e da Câmara dos Deputados.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
            <span>Dados Abertos do Congresso Nacional</span>
            <span>·</span>
            <span>Auditoria Cívica com IA</span>
            <span>·</span>
            <span>Constituição Federal de 1988</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
