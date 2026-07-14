export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: 'download' | 'zap' | 'image' | 'refresh' | 'shield' | 'globe' | 'video' | 'playlist' | 'scissors' | 'layers' | 'sparkles' | 'bot' | 'convert' | 'box' | 'captions' | 'queue' | 'cpu' | 'sliders';
}

export interface Screenshot {
  id: string;
  url: string;
  caption: string;
}

export type ThemeName = 'Byte' | 'Black' | 'Light' | 'Red Laki' | 'Hacker' | 'Dracula';

export interface ThemeData {
  name: ThemeName;
  description: string;
  screenshots: Screenshot[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
