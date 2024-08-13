import React, { createContext, useState } from 'react';

const RecentPlaysContext = createContext();

export const RecentPlaysProvider = ({ children }) => {
  const [recentPlays, setRecentPlays] = useState([]);

  const addRecentPlay = (track) => {
    setRecentPlays([track, ...recentPlays.slice(0, 9)]); 
  };

  return (
    <RecentPlaysContext.Provider value={{ recentPlays, addRecentPlay }}>
      {children}
    </RecentPlaysContext.Provider>
  );
};

export const useRecentPlays = () => {
  const context = React.useContext(RecentPlaysContext);
  if (context === undefined) {
    throw new Error('useRecentPlays must be used within a RecentPlaysProvider');
  }
  return context;
};
