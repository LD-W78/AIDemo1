/*
 * Title: Types - 类型定义
 * filepath: /src/types.ts
 * description: 类型定义
 */

export type ArtStyle = 
  | 'watercolor' 
  | 'oil' 
  | 'pixel' 
  | 'cyberpunk' 
  | 'sketch' 
  | 'abstract'
  | 'vangogh'
  | 'miyazaki'
  | 'ink'
  | 'manga'
  | 'neon'
  | 'impressionist'
  | 'cubism'
  | 'popart'
  | 'ukiyoe'
  | 'steampunk'
  | 'lineart'
  | '3drender'
  | 'origami'
  | 'lowpoly'
  | 'chalk'
  | 'pastel'
  | 'graffiti'
  | 'papercut';

export interface Point {
  x: number;
  y: number;
}

export interface ArtStyleConfig {
  id: ArtStyle;
  name: string;
  icon: string;
  description: string;
  category: 'classic' | 'modern' | 'anime' | 'traditional' | '3d' | 'fantasy' | 'minimal';
}
