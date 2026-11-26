export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: 'download' | 'zap' | 'image' | 'refresh' | 'shield' | 'globe' | 'video' | 'playlist' | 'scissors' | 'layers' | 'sparkles' | 'bot' | 'convert' | 'box' | 'captions' | 'queue' | 'cpu' | 'sliders';
}

export interface Screenshot {
  id: string;
  url: string;
  label: string;
  caption: string;
}

export type ThemeName = 'Byte' | 'Black' | 'Red Laki' | 'Hacker' | 'Dracula' | 'Vice Week';

export interface ThemeData {
  name: ThemeName;
  accent: string;
  description: string;
  screenshots: Screenshot[];
  pluginScreenshots: Screenshot[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface FeedbackItem {
  id: string;
  author: string;
  role: string;
  stars: number;
  text: string;
  url: string;
  caption: string;
  source?: 'discord' | 'x' | 'youtube';
  videoId?: string;
  startSeconds?: number;
  videoUrl?: string;
  tweetUrl?: string;
  avatar?: string;
}
