'use client';

import { Section } from '@/lib/types';

interface FooterSectionProps {
  section: Section;
  isPreview?: boolean;
}

export const FooterSection = ({ section }: FooterSectionProps) => {
  const { copyright, links } = section.content;
  const typedLinks = links as string[];

  return (
    <footer className="w-full bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">{copyright as string}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {typedLinks?.map((link, index) => (
              <a
                key={index}
                href="#"
                className="text-sm hover:text-gray-300 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};