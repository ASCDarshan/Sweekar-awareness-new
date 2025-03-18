import { createContext, useContext, useState } from "react";

const ProgressContext = createContext();

const sections = [
  {
    id: "introduction",
    title: "Introduction",
    subsections: ["welcome", "overview"],
  },
  {
    id: "historical",
    title: "Historical Context",
    subsections: ["ancient", "colonial", "activism", "timeline"],
  },
  {
    id: "identities",
    title: "Sexual Orientation & Gender Identity",
    subsections: ["orientation", "gender", "spectrum"],
  },
  {
    id: "legal",
    title: "Legal Landscape",
    subsections: ["landmark_cases", "current_challenges", "transgender_rights"],
  },
  {
    id: "challenges",
    title: "Social Challenges",
    subsections: [
      "stigma",
      "mental_health",
      "religious_cultural",
      "healthcare",
      "education",
    ],
  },
  {
    id: "progress",
    title: "Progress & Developments",
    subsections: [
      "visibility",
      "urban_acceptance",
      "organizations",
      "corporate",
    ],
  },
  {
    id: "resources",
    title: "Resources & Support",
    subsections: [
      "organizations",
      "helplines",
      "online_resources",
      "legal_support",
    ],
  },
];

export const ProgressProvider = ({ children }) => {
  const totalSteps = 8;
  const [visitedPages, setVisitedPages] = useState(new Set());
  const [completedContent, setCompletedContent] = useState({});

  const markAsCompleted = (sectionId, subsectionId) => {
    if (completedContent[`${sectionId}_${subsectionId}`]) {
      return;
    }

    setCompletedContent((prev) => ({
      ...prev,
      [`${sectionId}_${subsectionId}`]: true,
    }));
  };

  const isCompleted = (sectionId, subsectionId) => {
    return !!completedContent[`${sectionId}_${subsectionId}`];
  };

  const getSectionCompletion = (sectionId) => {
    const section = sections.find((s) => s.id === sectionId);
    if (!section) return 0;

    const completedSubsections = section.subsections.filter((subsection) =>
      isCompleted(sectionId, subsection)
    ).length;

    return (completedSubsections / section.subsections.length) * 100;
  };

  const markPageAsVisited = (page) => {
    setVisitedPages((prev) => new Set([...prev, page]));
  };

  const getOverallProgress = () => {
    return (visitedPages.size / totalSteps) * 100;
  };

  return (
    <ProgressContext.Provider
      value={{
        getOverallProgress,
        markPageAsVisited,
        markAsCompleted,
        getSectionCompletion,
        isCompleted,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);
