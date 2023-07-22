import React from 'react';

export interface LayoutVisibilityContextType {
  layoutVisible: boolean;
  setLayoutVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleCommit: () => void; 
}

// Initialize the context with an empty object
export const LayoutVisibilityContext = React.createContext<LayoutVisibilityContextType | undefined>(undefined);
