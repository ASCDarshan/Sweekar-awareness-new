import React from 'react';
import { Box, LinearProgress, Typography, styled } from '@mui/material';

const ProgressContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  width: '100%',
}));

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  backgroundColor: theme.palette.background.paper,
  '& .MuiLinearProgress-bar': {
    borderRadius: 5,
    backgroundImage: theme.rainbowTheme.gradients?.rainbow,
  },
}));

const ProgressLabel = styled(Typography)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(0.5),
}));

const ProgressIndicator = ({ label, value, showPercentage = true }) => {
  return (
    <ProgressContainer>
      <ProgressLabel variant="body2" color="textSecondary">
        <span>{label}</span>
        {showPercentage && <span>{Math.round(value)}%</span>}
      </ProgressLabel>
      <StyledLinearProgress variant="determinate" value={value} />
    </ProgressContainer>
  );
};

export default ProgressIndicator;