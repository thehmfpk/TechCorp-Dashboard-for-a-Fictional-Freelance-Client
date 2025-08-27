import { useState, useMemo } from 'react';
import { Project } from '../types';

export const useSearch = (projects: Project[]) => {
  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    return projects.filter(project =>
      project.name.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.tasks.some(task => task.name.toLowerCase().includes(query)) ||
      project.tags.some(tag => tag.toLowerCase().includes(query))
    ).slice(0, 10); // Limit to top 10 results
  }, [projects, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    hasResults: searchResults.length > 0,
  };
};