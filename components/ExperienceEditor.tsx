'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Plus } from 'lucide-react';
import ExperienceEntry from './ExperienceEntry';
import { WorkExperience } from '@/types';

const ExperienceEditor = () => {
  const [experiences, setExperiences] = useState<WorkExperience[]>([]);

  const addExperience = () => {
    const newExperience: WorkExperience = {
      id: uuidv4(),
      name: '',
      position: '',
      city: '',
      country: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    setExperiences([...experiences, newExperience]);
  };

  const updateExperience = (id: string, updates: Partial<WorkExperience>) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, ...updates } : exp
    ));
  };

  const deleteExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const moveExperience = (id: string, direction: 'up' | 'down') => {
    const index = experiences.findIndex(exp => exp.id === id);
    if (index === -1) return;
    
    const newExperiences = [...experiences];
    if (direction === 'up' && index > 0) {
      [newExperiences[index], newExperiences[index - 1]] = 
      [newExperiences[index - 1], newExperiences[index]];
    } else if (direction === 'down' && index < experiences.length - 1) {
      [newExperiences[index], newExperiences[index + 1]] = 
      [newExperiences[index + 1], newExperiences[index]];
    }
    
    setExperiences(newExperiences);
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-6 md:py-8 bg-white/80 backdrop-blur-sm shadow-lg rounded-xl flex flex-col items-center">
      <div className="mb-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">Professional Experience</h2>
        <p className="text-sm sm:text-base text-gray-600">Add your work experience, starting with your most recent position.</p>
      </div>

      <div className="space-y-4 w-full">
        {experiences.map((experience) => (
          <ExperienceEntry
            key={experience.id}
            experience={experience}
            onUpdate={updateExperience}
            onDelete={deleteExperience}
            onMoveUp={() => moveExperience(experience.id, 'up')}
            onMoveDown={() => moveExperience(experience.id, 'down')}
            isFirst={experiences.indexOf(experience) === 0}
            isLast={experiences.indexOf(experience) === experiences.length - 1}
          />
        ))}
      </div>

      <div className="flex-1">
          <button
            onClick={addExperience}
            className="mt-6 flex items-center justify-center w-full p-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Experience
          </button>
        <div className="w-[34px]"></div>
      </div>
    </div>
  );
};

export default ExperienceEditor;
