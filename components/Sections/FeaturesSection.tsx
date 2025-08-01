'use client';

import { Section } from '@/lib/types';

interface FeaturesSectionProps {
  section: Section;
  isPreview?: boolean;
}

export const FeaturesSection = ({ section, isPreview = false }: FeaturesSectionProps) => {
  const { title, features } = section.content;

  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features?.map((feature: { title: string; description: string }, index: number) => (
            <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};