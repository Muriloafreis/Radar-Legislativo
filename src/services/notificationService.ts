import { LegislativeAlert, NotificationSettings } from '../types/legislative';

class NotificationService {
  private audioCtx: AudioContext | null = null;

  public requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      return Promise.resolve('denied' as NotificationPermission);
    }
    return Notification.requestPermission();
  }

  public getPermissionStatus(): NotificationPermission {
    if (!('Notification' in window)) {
      return 'denied';
    }
    return Notification.permission;
  }

  public playSubtleNotificationSound() {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.audioCtx) {
        this.audioCtx = new AudioContextClass();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, this.audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, this.audioCtx.currentTime + 0.12); // A5

      gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.28);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.3);
    } catch {
      // AudioContext may be restricted by user agent before gesture
    }
  }

  public notifyUser(alert: LegislativeAlert, settings: NotificationSettings) {
    if (settings.enableSound) {
      this.playSubtleNotificationSound();
    }

    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(`[Radar Legislativo] ${alert.title}`, {
          body: alert.description,
          icon: '/favicon.ico',
          badge: '/favicon.ico',
          tag: alert.id
        });
      } catch {
        // Fallback for environments where constructor fails
      }
    }
  }
}

export const notificationService = new NotificationService();
