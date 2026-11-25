import { IconName } from './pixel-icon';

export type AppId = 'about' | 'experience' | 'projects' | 'system' | 'terminal' | 'contact' | 'bin';

export interface AppDef {
  id: AppId;
  /** Label under the desktop icon and in the Start menu. */
  label: string;
  /** Text in the window's title bar. */
  title: string;
  icon: IconName;
  width: number;
  height: number;
  /** Where the window first appears, as a fraction of the free desktop. */
  at: [x: number, y: number];
}

export const APPS: Record<AppId, AppDef> = {
  about: { id: 'about', label: 'About me', title: 'About_me.txt', icon: 'notepad', width: 720, height: 700, at: [0.5, 0.45] },
  experience: { id: 'experience', label: 'Experience', title: 'Experience', icon: 'folder', width: 760, height: 540, at: [0.3, 0.1] },
  projects: { id: 'projects', label: 'Projects', title: 'Projects', icon: 'briefcase', width: 780, height: 580, at: [0.42, 0.16] },
  system: { id: 'system', label: 'System properties', title: 'System properties', icon: 'computer', width: 480, height: 520, at: [0.55, 0.08] },
  terminal: { id: 'terminal', label: 'Terminal', title: 'EBONY-DOS prompt', icon: 'terminal', width: 600, height: 380, at: [0.36, 0.3] },
  contact: { id: 'contact', label: 'Contact', title: 'Say hello', icon: 'mail', width: 420, height: 380, at: [0.6, 0.22] },
  bin: { id: 'bin', label: 'Recycle bin', title: 'Recycle bin', icon: 'bin', width: 420, height: 300, at: [0.66, 0.4] },
};

/** Desktop icon order, top to bottom. */
export const DESKTOP_ORDER: AppId[] = ['about', 'experience', 'projects', 'system', 'terminal', 'contact', 'bin'];
