import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useProgress } from '../../contexts/ProgressContext';

/**
 * 
 * @param {Object} props
 * @param {string} props.sectionId
 * @param {string} props.subsectionId 
 * @param {React.ReactNode} props.children
 * @returns {React.ReactNode} 
 */
const SectionProgressWrapper = ({ sectionId, subsectionId = 'main', children }) => {
  const { markAsCompleted } = useProgress();
  const location = useLocation();

  useEffect(() => {
    if (sectionId) {
      markAsCompleted(sectionId, subsectionId);
    }
  }, [sectionId, subsectionId, markAsCompleted, location.pathname]);

  return children;
};

export default SectionProgressWrapper;