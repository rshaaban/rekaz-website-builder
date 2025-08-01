'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useBuilderStore } from '@/lib/store';
import { Section } from '@/lib/types';
import { Button } from '../ui/Button';
import { X } from 'lucide-react';

interface EditModalProps {
  section: Section;
  onClose: () => void;
}

export const EditModal = ({ section, onClose }: EditModalProps) => {
  const updateSection = useBuilderStore((state) => state.updateSection);
  const [content, setContent] = useState(section.content);

  const handleSave = () => {
    updateSection(section.id, content);
    onClose();
  };

  const renderEditFields = () => {
    switch (section.type) {
      case 'header':
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">Logo Text</label>
              <input
                type="text"
                value={content.logo}
                onChange={(e) => setContent({ ...content, logo: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Navigation Links (comma-separated)</label>
              <input
                type="text"
                value={content.links.join(', ')}
                onChange={(e) => setContent({ ...content, links: e.target.value.split(', ') })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </>
        );
      case 'hero':
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={content.title}
                onChange={(e) => setContent({ ...content, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Subtitle</label>
              <input
                type="text"
                value={content.subtitle}
                onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Button Text</label>
              <input
                type="text"
                value={content.buttonText}
                onChange={(e) => setContent({ ...content, buttonText: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Image URL</label>
              <input
                type="text"
                value={content.imageUrl}
                onChange={(e) => setContent({ ...content, imageUrl: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </>
        );
      case 'features':
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">Section Title</label>
              <input
                type="text"
                value={content.title}
                onChange={(e) => setContent({ ...content, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            {content.features.map((feature: any, index: number) => (
              <div key={index} className="border p-3 rounded-lg">
                <h4 className="font-medium mb-2">Feature {index + 1}</h4>
                <input
                  type="text"
                  placeholder="Title"
                  value={feature.title}
                  onChange={(e) => {
                    const newFeatures = [...content.features];
                    newFeatures[index] = { ...feature, title: e.target.value };
                    setContent({ ...content, features: newFeatures });
                  }}
                  className="w-full px-3 py-2 border rounded-lg mb-2"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={feature.description}
                  onChange={(e) => {
                    const newFeatures = [...content.features];
                    newFeatures[index] = { ...feature, description: e.target.value };
                    setContent({ ...content, features: newFeatures });
                  }}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            ))}
          </>
        );
      case 'footer':
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">Copyright Text</label>
              <input
                type="text"
                value={content.copyright}
                onChange={(e) => setContent({ ...content, copyright: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Footer Links (comma-separated)</label>
              <input
                type="text"
                value={content.links.join(', ')}
                onChange={(e) => setContent({ ...content, links: e.target.value.split(', ') })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit {section.type}</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          {renderEditFields()}
        </div>
        
        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </motion.div>
    </div>
  );
};