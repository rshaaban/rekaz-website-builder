import { create } from 'zustand';
import { Section } from './types';

interface BuilderStore {
  sections: Section[];
  addSection: (type: Section['type']) => void;
  removeSection: (id: string) => void;
  updateSection: (id: string, content: Section['content']) => void;
  reorderSections: (sections: Section[]) => void;
  importSections: (sections: Section[]) => void;
  clearSections: () => void;
}

export const useBuilderStore = create<BuilderStore>((set) => ({
  sections: [],
  
  addSection: (type) => {
    const newSection: Section = {
      id: `${type}-${Date.now()}`,
      type,
      content: getDefaultContent(type),
    };
    
    set((state) => ({
      sections: [...state.sections, newSection],
    }));
  },
  
  removeSection: (id) => {
    set((state) => ({
      sections: state.sections.filter((s) => s.id !== id),
    }));
  },
  
  updateSection: (id, content) => {
    set((state) => ({
      sections: state.sections.map((s) =>
        s.id === id ? { ...s, content } : s
      ),
    }));
  },
  
  reorderSections: (sections) => {
    set({ sections });
  },
  
  importSections: (sections) => {
    set({ sections });
  },
  
  clearSections: () => {
    set({ sections: [] });
  },
}));

function getDefaultContent(type: Section['type']): Section['content'] {
  switch (type) {
    case 'header':
      return {
        logo: 'Your Logo',
        links: ['Home', 'About', 'Services', 'Contact'],
      };
    case 'hero':
      return {
        title: 'Welcome to Our Website',
        subtitle: 'Build amazing websites with ease',
        buttonText: 'Get Started',
        imageUrl: 'https://via.placeholder.com/800x400',
      };
    case 'features':
      return {
        title: 'Our Features',
        features: [
          { title: 'Fast', description: 'Lightning quick performance' },
          { title: 'Secure', description: 'Top-notch security' },
          { title: 'Scalable', description: 'Grows with your needs' },
        ],
      };
    case 'footer':
      return {
        copyright: '© 2024 Your Company. All rights reserved.',
        links: ['Privacy Policy', 'Terms of Service'],
      };
    default:
      return {};
  }
}