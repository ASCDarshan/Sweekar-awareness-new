// src/data/navigationData.js

/**
 * Application section mapping for consistent navigation between sections
 */
export const sectionNavigation = {
    // Main sections in order
    sections: [
      { id: 'introduction', path: '/introduction', label: 'Introduction' },
      { id: 'history', path: '/history', label: 'Historical Context' },
      { id: 'identities', path: '/identities', label: 'Identities & Terminologies' },
      { id: 'legal', path: '/legal', label: 'Legal Landscape' },
      { id: 'challenges', path: '/challenges', label: 'Social Challenges' },
      { id: 'progress', path: '/progress', label: 'Progress & Developments' },
      { id: 'resources', path: '/resources', label: 'Resources & Support' },
      { id: 'social', path: '/social', label: 'Social Impact' },
      { id: 'glossary', path: '/glossary', label: 'Glossary' }
    ],
    
    /**
     * Get previous section info
     * @param {string} currentSectionId - Current section ID
     * @returns {Object|null} Previous section or null if at first section
     */
    getPrevious: function(currentSectionId) {
      const index = this.sections.findIndex(section => section.id === currentSectionId);
      if (index <= 0) return null;
      return this.sections[index - 1];
    },
    
    /**
     * Get next section info
     * @param {string} currentSectionId - Current section ID
     * @returns {Object|null} Next section or null if at last section
     */
    getNext: function(currentSectionId) {
      const index = this.sections.findIndex(section => section.id === currentSectionId);
      if (index === -1 || index >= this.sections.length - 1) return null;
      return this.sections[index + 1];
    },
    
    /**
     * Get navigation info for a section
     * @param {string} currentSectionId - Current section ID
     * @returns {Object} Navigation info with next and prev properties
     */
    getNavigationFor: function(currentSectionId) {
      return {
        prev: this.getPrevious(currentSectionId),
        next: this.getNext(currentSectionId)
      };
    }
  };
  
  export default sectionNavigation;