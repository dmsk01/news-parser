import { Channels } from 'main/preload';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        send(arg0: string): unknown;
        sendMessage(channel: Channels, args: unknown[]): void;
        on(
          channel: string,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: string, func: (...args: unknown[]) => void): void;
        invoke<P extends any[], R>(channel: string, ...args: P): Promise<R>;
        handle<P extends any[],R>(channel: Channels, func:(...args: P)): Promise<R>;
      };
    };
  }
}

export {};
