
import React from 'react';

interface QuizButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  disabled?: boolean;
}

export const QuizButton: React.FC<QuizButtonProps> = ({ 
  onClick, 
  children, 
  variant = 'primary', 
  className = '',
  disabled = false
}) => {
  const baseStyles = "px-6 py-3 rounded-full font-bold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:active:scale-100";
  const variants = {
    primary: "bg-[#009999] text-white hover:bg-[#00b3b3] shadow-lg shadow-[#009999]/20",
    secondary: "bg-white text-black hover:bg-gray-100",
    outline: "border-2 border-[#009999] text-[#009999] hover:bg-[#009999]/10"
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
