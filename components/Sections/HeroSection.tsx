'use client';

import { Section } from '@/lib/types';

interface HeroSectionProps {
  section: Section;
  isPreview?: boolean;
}

export const HeroSection = ({ section, isPreview = false }: HeroSectionProps) => {
  const { title, subtitle, buttonText, imageUrl } = section.content;

  return (
    <section className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {title}
            </h1>
            <p className="text-xl text-gray-600 mb-6">{subtitle}</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              {buttonText}
            </button>
          </div>
          <div className="relative h-64 md:h-96">
            <img
              src={imageUrl}
              alt="Hero"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};