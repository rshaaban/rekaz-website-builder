'use client';

import { motion } from 'framer-motion';
import { useBuilderStore } from '@/lib/store';
import { SectionTemplate } from '@/lib/types';
import { Layout, Image, Grid3x3, CreditCard } from 'lucide-react';

interface SectionLibraryProps {
  onSectionAdd?: () => void;
}

const sectionTemplates: SectionTemplate[] = [
  {
    type: 'header',
    name: 'Header',
    icon: 'Layout',
    defaultContent: {},
  },
  {
    type: 'hero',
    name: 'Hero Section',
    icon: 'Image',
    defaultContent: {},
  },
  {
    type: 'features',
    name: 'Features',
    icon: 'Grid3x3',
    defaultContent: {},
  },
  {
    type: 'footer',
    name: 'Footer',
    icon: 'CreditCard',
    defaultContent: {},
  },
];

const iconMap = {
  Layout,
  Image,
  Grid3x3,
  CreditCard,
};

export const SectionLibrary = ({ onSectionAdd }: SectionLibraryProps) => {
  const addSection = useBuilderStore((state) => state.addSection);

  const handleAddSection = (type: SectionTemplate['type']) => {
    addSection(type);
    // Only call onSectionAdd on mobile (it will close the sidebar)
    if (onSectionAdd && window.innerWidth < 768) {
      onSectionAdd();
    }
  };

  return (
    <div className="w-full md:w-64 bg-gray-50 p-3 md:p-4 border-r overflow-y-auto h-full md:relative absolute left-0 top-0 bg-white md:bg-gray-50 shadow-lg md:shadow-none">
      <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Section Library</h2>
      <div className="grid grid-cols-1 gap-2">
        {sectionTemplates.map((template) => {
          const Icon = iconMap[template.icon as keyof typeof iconMap];
          
          return (
            <motion.button
              key={template.type}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAddSection(template.type)}
              className="w-full bg-white p-3 md:p-4 rounded-lg border hover:border-blue-500 hover:shadow-md transition-all text-left flex items-center space-x-2 md:space-x-3"
            >
              <Icon className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
              <span className="text-sm md:text-base font-medium">{template.name}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};