'use client';

import { useState } from 'react';
import { Toolbar } from '@/components/Builder/Toolbar';
import { SectionLibrary } from '@/components/Builder/SectionLibrary';
import { PreviewArea } from '@/components/Builder/PreviewArea';
import { Toaster } from 'react-hot-toast';
import { Menu, X } from 'lucide-react';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      <Toolbar />
      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile menu button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Sidebar with mobile overlay */}
        <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block absolute md:relative z-40 h-full`}>
          {/* Mobile overlay */}
          <div 
            className={`${sidebarOpen ? 'block' : 'hidden'} md:hidden fixed inset-0 bg-black bg-opacity-50 z-30`}
            onClick={() => setSidebarOpen(false)}
          />
          {/* Sidebar container with fixed width on mobile */}
          <div className="relative z-40 h-full w-[270px] md:w-auto">
            <SectionLibrary />
          </div>
        </div>
        
        <PreviewArea />
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
}