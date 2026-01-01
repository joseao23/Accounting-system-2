import React, { useEffect, useState } from 'react';
import { Member } from '../types';

interface Props {
  member: Member;
  isAttending: boolean;
  isBirthday: boolean;
  onToggleAttendance: (id: string) => void;
}

const AttendanceRow: React.FC<Props> = ({ 
  member, 
  isAttending, 
  isBirthday, 
  onToggleAttendance 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  // Trigger animation when attendance status changes
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 400); // Matches CSS duration
    return () => clearTimeout(timer);
  }, [isAttending]);

  return (
    <div className={`flex items-center justify-between p-3 border-4 transition-all duration-300 transform-gpu ${
      isAttending 
        ? 'bg-white border-black active-row-glow' 
        : 'bg-gray-100 border-gray-300 opacity-60'
    } ${isAnimating ? 'animate-row-bounce z-10' : 'z-0'} shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]`}>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 flex items-center justify-center border-2 border-black font-bold text-xs mario-font transition-all duration-300 transform ${
          isAttending 
            ? 'bg-[#FBD000] text-black scale-100 rotate-0' 
            : 'bg-gray-300 text-gray-500 scale-90 rotate-12'
        }`}>
          {isAttending ? '?' : 'X'}
        </div>
        <div className="flex flex-col">
          <span className={`font-bold text-lg transition-colors duration-300 leading-none ${isAttending ? 'text-gray-900' : 'text-gray-400'}`} style={{ fontFamily: '"Microsoft JhengHei", "Heiti TC", sans-serif' }}>
            {member.name}
          </span>
          {isBirthday && (
            <span className="text-[10px] mt-1 flex items-center gap-1">
              <span className="animate-bounce">🎂</span>
              <span className="text-pink-600 font-bold" style={{ fontFamily: '"Microsoft JhengHei", "Heiti TC", sans-serif' }}>壽星</span>
            </span>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button 
          onClick={() => onToggleAttendance(member.id)}
          className={`px-3 py-1.5 border-2 border-black font-bold text-[10px] mario-font transition-all duration-200 active:scale-95 hover:brightness-110 ${
            isAttending 
              ? 'bg-[#43B047] text-white shadow-[2px_2px_0_0_#1a4a1b]' 
              : 'bg-gray-400 text-white shadow-[2px_2px_0_0_#2a2a2a]'
          }`}
        >
          {isAttending ? 'OK' : 'OFF'}
        </button>
      </div>
    </div>
  );
};

export default AttendanceRow;