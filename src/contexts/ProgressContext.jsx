import React, { createContext, useState, useContext, useEffect } from "react";
import localforage from "localforage";

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
};

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

const totalContentCount = sections.reduce(
  (total, section) => total + section.subsections.length,
  0
);

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [completedContent, setCompletedContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const savedProgress = await localforage.getItem("tutorialProgress");
        if (savedProgress) {
          setCompletedContent(savedProgress);
        }
      } catch (error) {
        console.error("Error loading progress:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, []);

  useEffect(() => {
    const saveProgress = async () => {
      if (!loading) {
        try {
          await localforage.setItem("tutorialProgress", completedContent);
        } catch (error) {
          console.error("Error saving progress:", error);
        }
      }
    };

    saveProgress();
  }, [completedContent, loading]);

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

  const getOverallProgress = () => {
    const completedCount = Object.keys(completedContent).length;
    return (completedCount / totalContentCount) * 100;
  };

  const resetProgress = async () => {
    setCompletedContent({});
    try {
      await localforage.removeItem("tutorialProgress");
    } catch (error) {
      console.error("Error resetting progress:", error);
    }
  };

  return (
    <ProgressContext.Provider
      value={{
        sections,
        markAsCompleted,
        isCompleted,
        getSectionCompletion,
        getOverallProgress,
        resetProgress,
        loading,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export default ProgressContext;