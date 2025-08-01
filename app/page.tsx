'use client';

import { Toolbar } from '@/components/Builder/Toolbar';
import { SectionLibrary } from '@/components/Builder/SectionLibrary';
import { PreviewArea } from '@/components/Builder/PreviewArea';
import { Toaster } from 'react-hot-toast';

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <Toolbar />
      <div className="flex-1 flex overflow-hidden">
        <SectionLibrary />
        <PreviewArea />
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}