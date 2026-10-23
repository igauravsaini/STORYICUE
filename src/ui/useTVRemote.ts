import { useEffect } from 'react';

export type TVKey = 'left' | 'right' | 'up' | 'down' | 'select' | 'back' | 'menu' | 'playpause';

export interface TVKeyEvent {
  key: TVKey;
  rawType: string;
}

export const useTVRemote = (
  onKey: (event: TVKeyEvent) => void,
  enabled: boolean = true
) => {
  useEffect(() => {
    if (!enabled) return;

    let handlerInstance: any = null;

    try {
      const Kepler = require('@amazon-devices/react-native-kepler');
      const TVEventHandler = Kepler.TVEventHandler;

      if (TVEventHandler) {
        handlerInstance = new TVEventHandler();
        handlerInstance.enable(null, (_cmp: any, data: any) => {
          if (!data) return;

          // Only fire on key down (eventKeyAction === 0 or undefined, ignore key up eventKeyAction === 1)
          if (data.eventKeyAction !== undefined && data.eventKeyAction !== 0) {
            return;
          }

          const type = (data.eventType || '').toLowerCase();
          let key: TVKey | null = null;

          if (type === 'left') key = 'left';
          else if (type === 'right') key = 'right';
          else if (type === 'up') key = 'up';
          else if (type === 'down') key = 'down';
          else if (type === 'select' || type === 'enter') key = 'select';
          else if (type === 'back') key = 'back';
          else if (type === 'menu') key = 'menu';
          else if (type === 'playpause') key = 'playpause';

          if (key) {
            onKey({ key, rawType: type });
          }
        });
      }
    } catch {
      // Graceful fallback if TVEventHandler is not supported in environment
    }

    return () => {
      if (handlerInstance) {
        try {
          handlerInstance.disable();
        } catch {
          // ignore
        }
      }
    };
  }, [onKey, enabled]);
};
