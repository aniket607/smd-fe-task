'use client';

import { useState } from 'react';
import { ChevronUp, ChevronDown, Trash, MoveUp, MoveDown } from 'lucide-react';
import RichTextEditor from './RichTextEditor';
import Input from './Input';
import { WorkExperience } from '@/types';

interface ExperienceEntryProps {
  experience: WorkExperience;
  onUpdate: (id: string, experience: Partial<WorkExperience>) => void;
  onDelete: (id: string) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const ExperienceEntry = ({ 
  experience, 
  onUpdate, 
  onDelete, 
  onMoveUp, 
  onMoveDown, 
  isFirst, 
  isLast 
}: ExperienceEntryProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [currentlyWorkHere, setCurrentlyWorkHere] = useState(experience.endDate === 'Present');

  const handleCurrentlyWorkHere = (checked: boolean) => {
    setCurrentlyWorkHere(checked);
    onUpdate(experience.id, {
      endDate: checked ? 'Present' : '',
      currentlyWorkHere: checked,
    });
  };

  return (
    <div className="flex items-start gap-2 mb-4 w-full">
      <div className="flex-1 border border-gray-200 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-200 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 cursor-pointer w-full hover:bg-gray-50 transition-colors duration-200"
           onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex-1">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">{experience.name || 'New Experience'}</h3>
          <p className="text-gray-600 text-sm mt-0.5">{experience.position}</p>
        </div>
        <div className="flex items-center justify-between gap-2 w-full sm:w-auto mt-2 sm:mt-0">
          <div className='text-xs font-medium mt-1 sm:mt-0'>{experience.startDate} <span className='font-bold text-base'>-</span> {experience.endDate || (currentlyWorkHere ? 'Present' : '')}</div>
          <div className='flex items-center gap-2 ml-2'>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(experience.id);
              }}
              className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors duration-200"
              title="Delete entry"
            >
              <Trash className="w-5 h-5 text-red-500" />
            </button>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </div>
        </div>

      </div>

      {isExpanded && (
        <div className="p-4 sm:p-5 border-t border-gray-100">
          <div className="grid grid-cols-2 col-span-2 gap-3 sm:gap-4 mb-4">
            <Input
              label="Company Name"
              value={experience.name}
              onChange={(value) => onUpdate(experience.id, { name: value })}
              placeholder="Company name"
            />

            <Input
              label="Job Title"
              value={experience.position}
              onChange={(value) => onUpdate(experience.id, { position: value })}
              placeholder="Job title"
            />

            <div className="grid grid-cols-2 col-span-2 gap-3 sm:gap-4">
              <Input
                label="City"
                value={experience.city}
                onChange={(value) => onUpdate(experience.id, { city: value })}
                placeholder="Seattle"
              />
              <Input
                label="Country"
                value={experience.country}
                onChange={(value) => onUpdate(experience.id, { country: value })}
                placeholder="US"
              />
            </div>
          </div>

          {/* start and end date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <Input
              label="Start Date"
              type="month"
              value={experience.startDate}
              onChange={(value) => onUpdate(experience.id, { startDate: value })}
            />

            <Input
              label="End Date"
              type="month"
              value={experience.endDate !== 'Present' ? experience.endDate : ''}
              onChange={(value) => onUpdate(experience.id, { endDate: value })}
              disabled={currentlyWorkHere}
            />
          </div>

          <div className="my-4 flex items-center gap-2">
            <input
              type="checkbox"
              id={`currently-work-${experience.id}`}
              checked={currentlyWorkHere}
              onChange={(e) => handleCurrentlyWorkHere(e.target.checked)}
              className="rounded text-blue-500 focus:ring-blue-500 cursor-pointer"
            />
            <span className="text-sm text-gray-700">I currently work here</span>
          </div>

          {/* Rich Text Editor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Description
            </label>
            <RichTextEditor
              content={experience.description}
              onChange={(content) => onUpdate(experience.id, { description: content })}
            />
          </div>
        </div>
      )}
      </div>
      
      {/* Rearrange Controls Up/Down */}
      <div className="flex flex-col gap-1 pt-2 justify-center">
        {!isFirst && (
          <button
            onClick={onMoveUp}
            className="p-1.5 text-gray-400 hover:text-blue-500 rounded-full hover:bg-blue-50 border border-gray-200 hover:border-blue-200 transition-all duration-200"
            title="Move up"
          >
            <MoveUp className="w-4 h-4" />
          </button>
        )}
        {!isLast && (
          <button
            onClick={onMoveDown}
            className="p-1.5 text-gray-400 hover:text-blue-500 rounded-full hover:bg-blue-50 border border-gray-200 hover:border-blue-200 transition-all duration-200"
            title="Move down"
          >
            <MoveDown className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ExperienceEntry;
