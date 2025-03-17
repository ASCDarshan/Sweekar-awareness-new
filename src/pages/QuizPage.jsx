import React, { useState, useEffect } from "react";
import { Typography, Box, Tabs, Tab, styled, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SectionTemplate from "../components/sections/SectionTemplate";
import Quiz from "../components/tutorial/Quiz";
import { useProgress } from "../contexts/ProgressContext";

import { historicalQuiz } from "../data/quizzes/historicalQuiz";
import { identitiesQuiz } from "../data/quizzes/historicalQuiz";

const StyledTab = styled(Tab)(({ theme, active }) => ({
  fontWeight: active ? 'bold' : 'normal',
  color: active ? theme.palette.primary.main : 'inherit',
  borderBottom: active ? `2px solid ${theme.palette.primary.main}` : 'none',
}));

const quizzes = {
  historical: historicalQuiz,
  identities: identitiesQuiz,
  legal: null,
  challenges: null,
  resources: null,
  social: null,
  glossary: null,
};

const subsections = [
  { title: "Historical", id: "historical" },
  { title: "Identities", id: "identities" },
  { title: "Legal", id: "legal" },
  { title: "Challenges", id: "challenges" },
  { title: "Resources", id: "resources" },
  { title: "Social", id: "social" },
  { title: "Glossary", id: "glossary" },
];

const QuizPage = () => {
  const { markAsCompleted, markPageAsVisited, getSectionCompletion } = useProgress();

  const [activeTab, setActiveTab] = useState("historical");
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizKey, setQuizKey] = useState(0);
  const [completedSections, setCompletedSections] = useState({});

  useEffect(() => {
    markPageAsVisited("/quiz");

    const initialCompletedSections = {};
    subsections.forEach(section => {
      if (quizzes[section.id]) {
        initialCompletedSections[section.id] = getSectionCompletion(section.id) > 0;
      }
    });
    setCompletedSections(initialCompletedSections);
  }, []);

  const currentQuiz = quizzes[activeTab] || quizzes.historical;

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setQuizCompleted(completedSections[newValue] || false);
    setQuizKey(prevKey => prevKey + 1);
  };

  const handleQuizComplete = () => {
    markAsCompleted(activeTab, "quiz");
    setQuizCompleted(true);

    setCompletedSections(prev => ({
      ...prev,
      [activeTab]: true
    }));
  };

  const handleNextSection = () => {
    const currentIndex = subsections.findIndex(section => section.id === activeTab);

    let nextIndex = currentIndex + 1;
    while (nextIndex < subsections.length && !quizzes[subsections[nextIndex].id]) {
      nextIndex++;
    }

    if (nextIndex < subsections.length) {
      const nextSectionId = subsections[nextIndex].id;
      setActiveTab(nextSectionId);
      setQuizCompleted(completedSections[nextSectionId] || false);
      setQuizKey(prevKey => prevKey + 1);
    }
  };

  const availableSections = subsections.filter(section => quizzes[section.id]).length;
  const completedCount = Object.values(completedSections).filter(Boolean).length;
  const progressPercentage = availableSections > 0 ? (completedCount / availableSections) * 100 : 0;

  const currentIndex = subsections.findIndex(section => section.id === activeTab);
  let nextSectionLabel = "Next Section";

  for (let i = currentIndex + 1; i < subsections.length; i++) {
    if (quizzes[subsections[i].id]) {
      nextSectionLabel = `Next: ${subsections[i].title}`;
      break;
    }
  }

  return (
    <SectionTemplate
      sectionId={activeTab}
      title={"Quiz Context of LGBTQAI+ Advocacy in India"}
      subtitle="Test your knowledge and understanding"
      introduction={{
        title: "Knowledge Check",
        description:
          currentQuiz?.description ||
          "Answer the following questions to test your understanding of this section.",
      }}
      activeSubsection="quiz"
      progress={progressPercentage}
      renderCustomSubsections={() => (
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="quiz section tabs"
          >
            {subsections.map((section) => (
              <StyledTab
                key={section.id}
                label={section.title}
                value={section.id}
                active={activeTab === section.id ? 1 : 0}
                disabled={!quizzes[section.id]}
                icon={completedSections[section.id] ? "✓" : null}
                iconPosition="end"
              />
            ))}
          </Tabs>
        </Box>
      )}
    >
      {currentQuiz ? (
        <>
          <Quiz
            key={`quiz-${activeTab}-${quizKey}`}
            questions={currentQuiz?.questions}
            sectionId={activeTab}
            onComplete={handleQuizComplete}
          />

          {quizCompleted && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
              <Button
                variant="contained"
                color="primary"
                endIcon={<ArrowForwardIcon />}
                onClick={handleNextSection}
                disabled={currentIndex === subsections.length - 1 ||
                  !subsections.slice(currentIndex + 1).some(s => quizzes[s.id])}
              >
                {nextSectionLabel}
              </Button>
            </Box>
          )}
        </>
      ) : (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6">
            This quiz section is coming soon!
          </Typography>
        </Box>
      )}
    </SectionTemplate>
  );
};

export default QuizPage;