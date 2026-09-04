import React from 'react';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

interface ProjectTimelineProps {
  currentStatus: string;
}

const TIMELINE_STAGES = [
  { id: 'submitted', label: 'Project Started', description: 'Request received' },
  { id: 'planning', label: 'Requirement Review', description: 'Reviewing your needs' },
  { id: 'planning_site', label: 'Site Inspection', description: 'Evaluating the space' },
  { id: 'design', label: 'Design Phase', description: 'Creating 3D renders & plans' },
  { id: 'quotation', label: 'Quotation', description: 'Finalizing costs' },
  { id: 'approval', label: 'Client Approval', description: 'Awaiting your sign-off' },
  { id: 'in progress', label: 'Execution', description: 'Work in progress' },
  { id: 'completed', label: 'Completed', description: 'Project handed over' }
];

export function ProjectTimeline({ currentStatus }: ProjectTimelineProps) {
  
  // Mapping Firestore status to the highest timeline index reached
  const getActiveIndex = () => {
    const status = currentStatus?.toLowerCase() || 'submitted';
    switch (status) {
      case 'submitted': return 0;
      case 'planning': return 1; // Or 2 depending on granular updates later
      case 'design': return 3;
      case 'quotation': return 4;
      case 'in progress': return 6;
      case 'completed': return 7;
      default: return 0;
    }
  };

  const activeIndex = getActiveIndex();

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mt-8">
      <h2 className="text-xl font-bold text-brand-navy mb-8 flex items-center gap-2">
        <Clock className="text-brand-yellow" size={24} />
        Project Timeline
      </h2>

      <div className="relative">
        {/* Continuous Line */}
        <div className="absolute top-0 bottom-0 left-[15px] w-0.5 bg-gray-100 rounded-full hidden sm:block"></div>
        
        {/* Progress Line */}
        <div 
          className="absolute top-0 left-[15px] w-0.5 bg-brand-yellow rounded-full transition-all duration-1000 hidden sm:block"
          style={{ height: `${(activeIndex / (TIMELINE_STAGES.length - 1)) * 100}%` }}
        ></div>

        <div className="space-y-6 relative">
          {TIMELINE_STAGES.map((stage, idx) => {
            const isCompleted = idx < activeIndex;
            const isActive = idx === activeIndex;
            const isPending = idx > activeIndex;

            return (
              <div key={stage.id} className={`flex items-start gap-4 ${isPending ? 'opacity-50' : 'opacity-100'}`}>
                
                {/* Icon */}
                <div className="relative z-10 bg-white pt-1">
                  {isCompleted ? (
                    <CheckCircle2 size={32} className="text-emerald-500 fill-emerald-50" />
                  ) : isActive ? (
                    <div className="w-8 h-8 rounded-full border-4 border-brand-yellow bg-white animate-pulse shadow-[0_0_10px_rgba(241,184,33,0.5)]"></div>
                  ) : (
                    <Circle size={32} className="text-gray-300" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-2">
                  <h4 className={`font-bold text-lg ${isActive ? 'text-brand-navy' : isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                    {stage.label}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">{stage.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
