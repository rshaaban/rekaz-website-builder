'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useBuilderStore } from '@/lib/store';
import { Section } from '@/lib/types';
import { HeaderSection, HeroSection, FeaturesSection, FooterSection } from '../Sections';
import { EditModal } from './EditModal';
import { Trash2, Edit, GripVertical } from 'lucide-react';

const SectionComponents = {
  header: HeaderSection,
  hero: HeroSection,
  features: FeaturesSection,
  footer: FooterSection,
};

interface SortableItemProps {
  section: Section;
  onEdit: () => void;
  onRemove: () => void;
}

const SortableItem = ({ section, onEdit, onRemove }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const Component = SectionComponents[section.type];

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative group"
    >
      <div className="absolute top-1 right-1 md:top-2 md:right-2 z-10 flex space-x-1 md:space-x-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
        <button
          onClick={onEdit}
          className="bg-white p-1.5 md:p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <Edit className="w-3 h-3 md:w-4 md:h-4" />
        </button>
        <button
          onClick={onRemove}
          className="bg-white p-1.5 md:p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow text-red-500"
        >
          <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
        </button>
        <div
          {...attributes}
          {...listeners}
          className="bg-white p-1.5 md:p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-move"
        >
          <GripVertical className="w-3 h-3 md:w-4 md:h-4" />
        </div>
      </div>
      <div className="border-2 border-transparent hover:border-blue-300 transition-colors">
        <Component section={section} isPreview />
      </div>
    </motion.div>
  );
};

export const PreviewArea = () => {
  const { sections, removeSection, reorderSections } = useBuilderStore();
  const [editingSection, setEditingSection] = useState<Section | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over?.id);
      reorderSections(arrayMove(sections, oldIndex, newIndex));
    }
  };

  return (
    <>
      <div className="flex-1 bg-gray-100 overflow-auto">
        <div className="min-h-full bg-white m-2 md:m-4 rounded-lg shadow-lg">
          {sections.length === 0 ? (
            <div className="flex items-center justify-center h-96 text-gray-400 p-4">
              <div className="text-center">
                <p className="text-lg md:text-xl mb-2">No sections yet</p>
                <p className="text-sm md:text-base">Click on a section from the library to start building</p>
              </div>
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={sections.map((s) => s.id)}
                strategy={verticalListSortingStrategy}
              >
                <AnimatePresence>
                  {sections.map((section) => (
                    <SortableItem
                      key={section.id}
                      section={section}
                      onEdit={() => setEditingSection(section)}
                      onRemove={() => removeSection(section.id)}
                    />
                  ))}
                </AnimatePresence>
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>

      {editingSection && (
        <EditModal
          section={editingSection}
          onClose={() => setEditingSection(null)}
        />
      )}
    </>
  );
};