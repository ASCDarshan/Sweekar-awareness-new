import React, { useState } from 'react';
import {
  Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl,
  Button, Paper, Stepper, Step, StepLabel, Alert, Card
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { useProgress } from '../../contexts/ProgressContext';

const QuizPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  background: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
}));

const QuestionCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  background: theme.palette.background.default,
}));

const ResultBox = styled(Box)(({ theme, correct }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  backgroundColor: correct
    ? theme.palette.tertiary.light
    : theme.palette.accent1.light,
  color: correct
    ? theme.palette.tertiary.dark
    : theme.palette.accent1.dark,
}));

const Option = styled(FormControlLabel)(({ theme, isSelected, isCorrect, isWrong }) => ({
  width: '100%',
  margin: 0,
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.2s ease',
  marginBottom: theme.spacing(1),
  ...(isSelected && {
    backgroundColor: theme.palette.primary.light + '30',
  }),
  ...(isCorrect && {
    backgroundColor: theme.palette.tertiary.light + '40',
    border: `1px solid ${theme.palette.tertiary.main}`,
  }),
  ...(isWrong && {
    backgroundColor: theme.palette.accent1.light + '40',
    border: `1px solid ${theme.palette.accent1.main}`,
  }),
  '&:hover': {
    backgroundColor: theme.palette.primary.light + '20',
  },
}));

const Quiz = ({ questions, onComplete }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = questions[activeStep];

  const handleAnswerSelect = (event) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [activeStep]: event.target.value
    });
  };

  const handleCheck = () => {
    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    if (activeStep === questions.length - 1) {
      setQuizCompleted(true);
      if (onComplete) {
        onComplete(calculateScore());
      }
    } else {
      setActiveStep(prevStep => prevStep + 1);
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;

    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    return (correctAnswers / questions.length) * 100;
  };

  const isAnswerSelected = selectedAnswers[activeStep] !== undefined;
  const isAnswerCorrect = selectedAnswers[activeStep] === currentQuestion?.correctAnswer;

  if (quizCompleted) {
    const score = calculateScore();
    const passed = score >= 70;

    return (
      <QuizPaper>
        <Typography variant="h5" gutterBottom>
          Quiz Results
        </Typography>

        <Box sx={{ textAlign: 'center', my: 4 }}>
          <Typography variant="h3" color={passed ? 'tertiary.main' : 'accent1.main'}>
            {Math.round(score)}%
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            You answered {Object.values(selectedAnswers).filter((answer, index) =>
              answer === questions[index].correctAnswer
            ).length} out of {questions.length} questions correctly.
          </Typography>
        </Box>

        <Alert severity={passed ? "success" : "info"} sx={{ mb: 3 }}>
          {passed
            ? "Great job! You've demonstrated a good understanding of this section."
            : "Keep learning! Review the section content and try again."}
        </Alert>

        <Typography variant="h6" gutterBottom>
          Question Review:
        </Typography>

        {questions.map((question, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              {index + 1}. {question.question}
            </Typography>
            <Typography
              variant="body2"
              color={selectedAnswers[index] === question.correctAnswer ? 'tertiary.main' : 'accent1.main'}
            >
              Your answer: {question.options[selectedAnswers[index]]}
              {selectedAnswers[index] !== question.correctAnswer && (
                <Typography component="span" color="tertiary.main" sx={{ display: 'block' }}>
                  Correct answer: {question.options[question.correctAnswer]}
                </Typography>
              )}
            </Typography>
          </Box>
        ))}
      </QuizPaper>
    );
  }

  return (
    <QuizPaper>
      <Typography variant="h5" gutterBottom>
        Knowledge Check
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {questions.map((question, index) => (
          <Step key={index}>
            <StepLabel></StepLabel>
          </Step>
        ))}
      </Stepper>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <QuestionCard>
            <Typography variant="h6" gutterBottom>
              {currentQuestion.question}
            </Typography>

            <FormControl component="fieldset" fullWidth sx={{ mt: 2 }}>
              <RadioGroup
                value={selectedAnswers[activeStep] || ''}
                onChange={handleAnswerSelect}
              >
                {Object.entries(currentQuestion.options).map(([key, value]) => (
                  <Option
                    key={key}
                    value={key}
                    control={<Radio />}
                    label={value}
                    isSelected={selectedAnswers[activeStep] === key}
                    isCorrect={showFeedback && key === currentQuestion.correctAnswer}
                    isWrong={showFeedback && selectedAnswers[activeStep] === key && key !== currentQuestion.correctAnswer}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </QuestionCard>

          {showFeedback && (
            <ResultBox correct={isAnswerCorrect}>
              {isAnswerCorrect ? (
                <>
                  <CheckCircleIcon sx={{ mr: 1 }} />
                  <Typography variant="body1">
                    Correct! {currentQuestion.explanation}
                  </Typography>
                </>
              ) : (
                <>
                  <ErrorIcon sx={{ mr: 1 }} />
                  <Typography variant="body1">
                    Not quite. The correct answer is "{currentQuestion.options[currentQuestion.correctAnswer]}".
                    {currentQuestion.explanation}
                  </Typography>
                </>
              )}
            </ResultBox>
          )}
        </motion.div>
      </AnimatePresence>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button
          disabled={activeStep === 0}
          onClick={() => {
            setShowFeedback(false);
            setActiveStep(prevStep => prevStep - 1);
          }}
          variant="outlined"
        >
          Previous
        </Button>

        {!showFeedback ? (
          <Button
            variant="contained"
            color="primary"
            disabled={!isAnswerSelected}
            onClick={handleCheck}
          >
            Check Answer
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
          >
            {activeStep === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </Button>
        )}
      </Box>
    </QuizPaper>
  );
};

export default Quiz;