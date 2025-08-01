export interface Section {
  id: string;
  type: 'header' | 'hero' | 'features' | 'footer';
  content: Record<string, unknown>;
}

export interface SectionTemplate {
  type: Section['type'];
  name: string;
  icon: string;
  defaultContent: Section['content'];
}