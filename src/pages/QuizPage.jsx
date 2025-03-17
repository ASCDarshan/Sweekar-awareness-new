import React, { useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import SectionTemplate from '../components/sections/SectionTemplate';
import Quiz from '../components/tutorial/Quiz';
import { useProgress } from '../contexts/ProgressContext';

import { historicalQuiz } from '../data/quizzes/historicalQuiz';

const quizzes = {
  historical: historicalQuiz,
};

const navigationMap = {
  historical: {
    prev: { path: '/history/timeline', label: 'Timeline' },
    next: { path: '/identities', label: 'Identities & Terminologies' },
  },
};

const QuizPage = () => {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const { markAsCompleted } = useProgress();

  const quiz = quizzes[sectionId];

  useEffect(() => {
  }, [sectionId]);

  if (!quiz) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h4" color="error" gutterBottom>
          Quiz Not Found
        </Typography>
        <Typography variant="body1">
          The quiz for this section is not available yet.
        </Typography>
      </Box>
    );
  }

  const handleQuizComplete = () => {
    markAsCompleted(sectionId, 'quiz');


    setTimeout(() => {
      if (navigationMap[sectionId]?.next) {
        navigate(navigationMap[sectionId].next.path);
      }
    }, 5000);
  };

  return (
    <SectionTemplate
      sectionId={sectionId}
      title={`${quiz.title}`}
      subtitle="Test your knowledge and understanding"
      introduction={{
        title: "Knowledge Check",
        description: quiz.description || "Answer the following questions to test your understanding of this section."
      }}
      subsections={[]}
      activeSubsection="quiz"
      prevLink={navigationMap[sectionId]?.prev}
      nextLink={navigationMap[sectionId]?.next}
    >
      <Quiz
        questions={quiz.questions}
        onComplete={handleQuizComplete}
        sectionId={sectionId}
      />
    </SectionTemplate>
  );
};

export default QuizPage;