import React, { useState, useEffect, createContext, useContext } from 'react';
import { Text, Box } from '@chakra-ui/react';

interface VisitorStats {
  total: number;
  daily: number;
  weekly: number;
  monthly: number;
  quarterly: number;
  locations: { [key: string]: number };
  lastUpdate?: string;
  lastWeekStart?: string;
  lastMonthStart?: string;
  lastQuarterStart?: string;
}

interface VisitorContextType {
  stats: VisitorStats;
  updateStats: (location: string) => void;
}

const defaultStats: VisitorStats = {
  total: 0,
  daily: 0,
  weekly: 0,
  monthly: 0,
  quarterly: 0,
  locations: {}
};

export const VisitorContext = createContext<VisitorContextType>({
  stats: defaultStats,
  updateStats: () => {}
});

export const useVisitorStats = () => useContext(VisitorContext);

const VisitorCounter: React.FC = () => {
  const [stats, setStats] = useState<VisitorStats>(defaultStats);

  const updateStats = (location: string) => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay())).toISOString().split('T')[0];
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
    const quarterStart = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1).toISOString().split('T')[0];

    const storedStats = localStorage.getItem('visitorStats');
    const currentStats = storedStats ? JSON.parse(storedStats) : defaultStats;

    const newStats = {
      total: currentStats.total + 1,
      daily: currentStats.daily + 1,
      weekly: currentStats.weekly + 1,
      monthly: currentStats.monthly + 1,
      quarterly: currentStats.quarterly + 1,
      locations: {
        ...currentStats.locations,
        [location]: (currentStats.locations[location] || 0) + 1
      }
    };

    // Reset counters if period has changed
    if (currentStats.lastUpdate !== today) {
      newStats.daily = 1;
    }
    if (currentStats.lastWeekStart !== weekStart) {
      newStats.weekly = 1;
    }
    if (currentStats.lastMonthStart !== monthStart) {
      newStats.monthly = 1;
    }
    if (currentStats.lastQuarterStart !== quarterStart) {
      newStats.quarterly = 1;
    }

    newStats.lastUpdate = today;
    newStats.lastWeekStart = weekStart;
    newStats.lastMonthStart = monthStart;
    newStats.lastQuarterStart = quarterStart;

    localStorage.setItem('visitorStats', JSON.stringify(newStats));
    setStats(newStats);
  };

  useEffect(() => {
    // Get visitor's location using a free IP geolocation service
    fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(data => {
        const location = `${data.country_name} (${data.country_code})`;
        updateStats(location);
      })
      .catch(() => {
        // Fallback to "Unknown" if location fetch fails
        updateStats('Unknown');
      });
  }, []);

  return (
    <VisitorContext.Provider value={{ stats, updateStats }}>
      <Box>
        <Text fontSize="sm" color="gray.500">
          Visitors: {stats.total.toLocaleString()}
        </Text>
      </Box>
    </VisitorContext.Provider>
  );
};

export default VisitorCounter; 