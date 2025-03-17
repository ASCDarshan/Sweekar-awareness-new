import data from '../data';

/**
 * Get a specific section by ID
 * @param {string} sectionId - The ID of the section to retrieve
 * @returns {Object|null} - The section data or null if not found
 */
export const getSection = (sectionId) => {
  // Check each data object for the requested section
  if (data.historicalData && sectionId === 'historical') {
    return data.historicalData;
  }
  
  if (data.identitiesData && sectionId === 'identities') {
    return data.identitiesData;
  }
  
  if (data.legalData && sectionId === 'legal') {
    return data.legalData;
  }
  
  if (data.challengesData && sectionId === 'challenges') {
    return data.challengesData;
  }
  
  if (data.socialData && sectionId === 'progress') {
    return data.socialData.progress;
  }
  
  if (data.resourcesData && sectionId === 'resources') {
    return data.resourcesData;
  }
  
  return null;
}