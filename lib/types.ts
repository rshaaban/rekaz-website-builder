export interface Section {
  id: string;
  type: 'header' | 'hero' | 'features' | 'footer';
  content: {
    [key: string]: string | string[] | { title: string; description: string }[] | undefined;
  };
}

export interface SectionTemplate {
  type: Section['type'];
  name: string;
  icon: string;
  defaultContent: Section['content'];
}