import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useProgress } from '../../contexts/ProgressContext';

/**
 * A wrapper component that automatically tracks progress when a section is visited
 * Use this for pages that don't use the SectionTemplate component
 * 
 * @param {Object} props - Component props
 * @param {string} props.sectionId - The ID of the current section
 * @param {string} props.subsectionId - Optional subsection ID
 * @param {React.ReactNode} props.children - Child components
 * @returns {React.ReactNode} - The children unchanged
 */
const SectionProgressWrapper = ({ sectionId, subsectionId = 'main', children }) => {
  const { markAsCompleted } = useProgress();
  const location = useLocation();

  useEffect(() => {
    // Mark the section as visited when the component mounts or the path changes
    if (sectionId) {
      markAsCompleted(sectionId, subsectionId);
    }
  }, [sectionId, subsectionId, markAsCompleted, location.pathname]);

  // Just render the children without adding any wrapper elements
  return children;
};

export default SectionProgressWrapper;