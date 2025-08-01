'use client';

import { motion } from 'framer-motion';
import { useBuilderStore } from '@/lib/store';
import { SectionTemplate } from '@/lib/types';
import { Layout, Image, Grid3x3, CreditCard } from 'lucide-react';

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

export const SectionLibrary = () => {
  const addSection = useBuilderStore((state) => state.addSection);

  return (
    <div className="w-64 bg-gray-50 p-4 border-r overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Section Library</h2>
      <div className="space-y-2">
        {sectionTemplates.map((template) => {
          const Icon = iconMap[template.icon as keyof typeof iconMap];
          
          return (
            <motion.button
              key={template.type}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => addSection(template.type)}
              className="w-full bg-white p-4 rounded-lg border hover:border-blue-500 hover:shadow-md transition-all text-left flex items-center space-x-3"
            >
              <Icon className="w-5 h-5 text-gray-600" />
              <span className="font-medium">{template.name}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};