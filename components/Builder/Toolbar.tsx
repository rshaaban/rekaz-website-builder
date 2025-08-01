'use client';

import { useBuilderStore } from '@/lib/store';
import { Button } from '../ui/Button';
import { Download, Upload, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export const Toolbar = () => {
  const { sections, importSections, clearSections } = useBuilderStore();

  const handleExport = () => {
    const data = JSON.stringify(sections, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'website-design.json';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Design exported successfully!');
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const text = await file.text();
        try {
          const data = JSON.parse(text);
          importSections(data);
          toast.success('Design imported successfully!');
        } catch {
          toast.error('Invalid file format');
        }
      }
    };
    input.click();
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all sections?')) {
      clearSections();
      toast.success('All sections cleared');
    }
  };

  return (
    <div className="bg-white border-b px-4 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold">Website Builder</h1>
      <div className="flex space-x-2">
        <Button onClick={handleImport} variant="secondary">
          <Upload className="w-4 h-4 mr-2" />
          Import
        </Button>
        <Button onClick={handleExport} disabled={sections.length === 0}>
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
        <Button onClick={handleClear} variant="danger" disabled={sections.length === 0}>
          <Trash2 className="w-4 h-4 mr-2" />
          Clear All
        </Button>
      </div>
    </div>
  );
};