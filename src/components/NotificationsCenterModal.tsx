import React from 'react';
import {
  X,
  Bell,
  Volume2,
  VolumeX,
  CheckCheck,
  AlertTriangle,
  Flame,
  Radio,
  Sliders,
  Settings
} from 'lucide-react';
import { LegislativeAlert, NotificationSettings, House } from '../types/legislative';
import { notificationService } from '../services/notificationService';

interface NotificationsCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: LegislativeAlert[];
  settings: NotificationSettings;
  onUpdateSettings: (newSettings: NotificationSettings) => void;
  onMarkAsRead: (alertId: string) => void;
  onMarkAllAsRead: () => void;
  onSelectProjectByCode: (code: string) => void;
}

export const NotificationsCenterModal: React.FC<NotificationsCenterModalProps> = ({
  isOpen,
  onClose,
  alerts,
  settings,
  onUpdateSettings,
  onMarkAsRead,
  onMarkAllAsRead,
  onSelectProjectByCode
}) => {
  if (!isOpen) return null;

  const handleRequestBrowserPermission = async () => {
    const res = await notificationService.requestPermission();
    if (res === 'granted') {
      notificationService.playSubtleNotificationSound();
    }
  };

  const toggleSound = () => {
    onUpdateSettings({
      ...settings,
      enableSound: !settings.enableSound
    });
  };

  const toggleUrgencyAlerts = () => {
    onUpdateSettings({
      ...settings,
      enableUrgencyAlerts: !settings.enableUrgencyAlerts
    });
  };

  const toggleVotingLiveAlerts = () => {
    onUpdateSettings({
      ...settings,
      enableVotingLiveAlerts: !settings.enableVotingLiveAlerts
    });
  };

  const toggleIdeologyDivergence = () => {
    onUpdateSettings({
      ...settings,
      enableIdeologyDivergenceAlerts: !settings.enableIdeologyDivergenceAlerts
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200">
        {/* Top Header */}
        <div className="bg-slate-900 text-white p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Central de Alertas & Notificações</h3>
              <p className="text-xs text-slate-400">Notificações automáticas do Senado e da Câmara dos Deputados</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Browser Permission Banner */}
        <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <span>Notificações no Navegador:</span>
            <span className="font-semibold text-slate-900">
              {'Notification' in window && Notification.permission === 'granted' ? 'Ativadas' : 'Desativadas'}
            </span>
          </div>

          {'Notification' in window && Notification.permission !== 'granted' && (
            <button
              onClick={handleRequestBrowserPermission}
              className="px-3 py-1 rounded font-semibold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 transition-colors"
            >
              Permitir Alertas no Desktop
            </button>
          )}

          <button
            onClick={toggleSound}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-medium"
            title="Alternar som das notificações"
          >
            {settings.enableSound ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Som Ativado</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                <span>Sem Som</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Settings Bar */}
        <div className="px-5 py-2.5 bg-slate-100/70 border-b border-slate-200 flex flex-wrap items-center gap-4 text-xs">
          <span className="font-semibold text-slate-600">Disparar ao vivo:</span>

          <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
            <input
              type="checkbox"
              checked={settings.enableUrgencyAlerts}
              onChange={toggleUrgencyAlerts}
              className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span>Urgência de Votação</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
            <input
              type="checkbox"
              checked={settings.enableVotingLiveAlerts}
              onChange={toggleVotingLiveAlerts}
              className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span>Início de Votação Nominal</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
            <input
              type="checkbox"
              checked={settings.enableIdeologyDivergenceAlerts}
              onChange={toggleIdeologyDivergence}
              className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span>Divergência Ideológica</span>
          </label>
        </div>

        {/* Notification Feed */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          <div className="flex items-center justify-between text-xs text-slate-500 pb-1">
            <span>Últimos Avisos Registrados ({alerts.length})</span>
            {alerts.some(a => !a.isRead) && (
              <button
                onClick={onMarkAllAsRead}
                className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1 hover:underline"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Marcar todos como lidos</span>
              </button>
            )}
          </div>

          {alerts.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              Nenhuma notificação recente no momento.
            </div>
          ) : (
            alerts.map((alert) => (
              <div
                key={alert.id}
                onClick={() => onMarkAsRead(alert.id)}
                className={`p-3.5 rounded-xl border transition-all text-xs space-y-1.5 cursor-pointer ${
                  alert.isRead
                    ? 'bg-white border-slate-200 opacity-80'
                    : 'bg-emerald-50/40 border-emerald-300 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {alert.type === 'urgency' ? (
                      <Flame className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    ) : alert.type === 'voting_started' ? (
                      <Radio className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    )}

                    <h4 className="font-bold text-slate-900 text-sm">
                      {alert.title}
                    </h4>
                  </div>

                  <span className="text-[11px] font-mono text-slate-400 tabular-nums shrink-0">
                    {alert.timestamp}
                  </span>
                </div>

                <p className="text-slate-600 leading-relaxed pl-5">
                  {alert.description}
                </p>

                {alert.projectCode && (
                  <div className="pl-5 pt-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                        onSelectProjectByCode(alert.projectCode!);
                      }}
                      className="text-emerald-700 font-bold hover:underline"
                    >
                      Acessar pauta {alert.projectCode} →
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-mono">
            Sincronização contínua com Diário Oficial do Congresso
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
