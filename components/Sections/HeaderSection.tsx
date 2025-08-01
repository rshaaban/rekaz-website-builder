'use client';

import { Section } from '@/lib/types';

interface HeaderSectionProps {
  section: Section;
  isPreview?: boolean;
}

export const HeaderSection = ({ section, isPreview = false }: HeaderSectionProps) => {
  const { logo, links } = section.content;

  return (
    <header className={`w-full bg-white border-b ${isPreview ? '' : 'shadow-sm'}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">{logo}</div>
          <nav className="hidden md:flex space-x-6">
            {links?.map((link: string, index: number) => (
              <a
                key={index}
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>
          <div className="md:hidden">
            <button className="text-gray-600">☰</button>
          </div>
        </div>
      </div>
    </header>
  );
};