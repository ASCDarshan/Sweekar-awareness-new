import { useMemo } from "react";
import { getSection } from "../utils/dataUtils";

/**
 * Custom hook to access section data
 * @param {string} sectionId - The ID of the section
 * @param {string} subsectionId - Optional subsection ID to retrieve specific content
 * @returns {Object} - Object containing section data and loading state
 */
const useSectionData = (sectionId, subsectionId = null) => {
  const sectionData = useMemo(() => {
    // Get the entire section
    const section = getSection(sectionId);

    if (!section) {
      return { data: null, isLoading: false, error: "Section not found" };
    }

    // If a subsection is requested, try to find it
    if (subsectionId) {
      // Check various possible structures to find the subsection
      const subsection =
        section[subsectionId] ||
        (section.sections &&
          section.sections.find((s) => s.id === subsectionId)) ||
        (section.periods && section.periods.find((p) => p.id === subsectionId));

      if (!subsection) {
        return {
          data: section,
          subsection: null,
          isLoading: false,
          error: "Subsection not found",
        };
      }

      return {
        data: section,
        subsection,
        isLoading: false,
        error: null,
      };
    }

    return { data: section, isLoading: false, error: null };
  }, [sectionId, subsectionId]);

  return sectionData;
};

export default useSectionData;
