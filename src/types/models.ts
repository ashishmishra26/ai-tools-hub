export type ModelCategory = 'text' | 'image' | 'audio' | 'analysis' | 'creative' | 'all';

export interface AIModel {
  id: string;
  title: string;
  description: string;
  category: ModelCategory;
  icon: string;
  inputType: 'text' | 'image' | 'both';
  inputLabel: string;
  inputPlaceholder: string;
  buttonText: string;
}