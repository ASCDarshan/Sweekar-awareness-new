import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Button,
  Avatar,
  CircularProgress,
  useTheme,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { Link as RouterLink } from "react-router-dom";

import ProgressIndicator from "../ui/ProgressIndicator";
import { useProgress } from "../../contexts/ProgressContext";

const ProfileCard = styled(Card)(({ theme }) => ({
  overflow: "visible",
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
}));

const ProfileHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  background: theme.palette.gradients?.primary,
  color: theme.palette.primary.contrastText,
  borderTopLeftRadius: theme.shape.borderRadius,
  borderTopRightRadius: theme.shape.borderRadius,
  position: "relative",
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 100,
  height: 100,
  border: `4px solid ${theme.palette.background.paper}`,
  boxShadow: theme.shadows[2],
  position: "absolute",
  bottom: -50,
  left: 30,
  backgroundColor: theme.palette.background.default,
}));

const ProgressContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(2),
}));

const ResetButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: 10,
  right: 10,
  color: theme.palette.primary.contrastText,
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
}));

const BadgeContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(2),
  justifyContent: "center",
  margin: theme.spacing(2, 0),
}));

const Badge = styled(Box)(({ theme, unlocked }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: unlocked
    ? theme.palette.background.card
    : theme.palette.background.default,
  boxShadow: unlocked ? theme.shadows[1] : "none",
  opacity: unlocked ? 1 : 0.6,
  transition: "all 0.2s ease",
}));

const BadgeIcon = styled(Box)(({ theme, unlocked }) => ({
  width: 50,
  height: 50,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: unlocked
    ? theme.palette.secondary.main
    : theme.palette.background.card,
  marginBottom: theme.spacing(1),
}));

const badges = [
  {
    id: "started",
    name: "First Steps",
    description: "Started the learning journey",
    icon: "🚀",
    threshold: 0,
  },
  {
    id: "basics",
    name: "Basics Mastered",
    description: "Completed the introduction and history sections",
    icon: "📚",
    threshold: 25,
  },
  {
    id: "halfway",
    name: "Halfway There",
    description: "Completed 50% of the tutorial",
    icon: "🏃",
    threshold: 50,
  },
  {
    id: "explorer",
    name: "LGBTQAI+ Explorer",
    description: "Completed 75% of the tutorial",
    icon: "🔍",
    threshold: 75,
  },
  {
    id: "champion",
    name: "Ally Champion",
    description: "Completed the entire tutorial",
    icon: "🏆",
    threshold: 100,
  },
];

const ProfileCompletion = () => {
  const theme = useTheme();
  const { sections, getOverallProgress, getSectionCompletion, resetProgress } =
    useProgress();

  const [openDialog, setOpenDialog] = useState(false);

  const overallProgress = getOverallProgress();

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleReset = () => {
    resetProgress();
    setOpenDialog(false);
  };

  return (
    <>
      <ProfileCard>
        <ProfileHeader>
          <Typography variant="h5">Your Learning Progress</Typography>
          <Typography variant="body2">
            Track your educational journey through the LGBTQAI+ awareness
            tutorial
          </Typography>
          <ResetButton
            onClick={handleOpenDialog}
            size="small"
            title="Reset Progress"
          >
            <RestartAltIcon fontSize="small" />
          </ResetButton>
          <ProfileAvatar>
            <Typography variant="h4" color="primary">
              {Math.floor(overallProgress)}%
            </Typography>
          </ProfileAvatar>
        </ProfileHeader>

        <CardContent sx={{ pt: 7 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <ProgressContainer>
                <Box
                  sx={{ position: "relative", display: "inline-flex", mb: 2 }}
                >
                  <CircularProgress
                    variant="determinate"
                    value={overallProgress}
                    size={120}
                    thickness={4}
                    sx={{
                      color: theme.palette.primary.main,
                      "& .MuiCircularProgress-circle": {
                        strokeLinecap: "round",
                      },
                    }}
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: "absolute",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <EmojiEventsIcon
                      color="primary"
                      fontSize="large"
                      sx={{ opacity: overallProgress >= 100 ? 1 : 0.5 }}
                    />
                  </Box>
                </Box>
                <Typography variant="h6">Overall Progress</Typography>
                <Typography variant="body2" color="text.secondary">
                  {overallProgress >= 100
                    ? "Congratulations on completing the tutorial!"
                    : `${Math.floor(overallProgress)}% Complete`}
                </Typography>
              </ProgressContainer>

              <BadgeContainer>
                {badges.map((badge) => (
                  <Badge
                    key={badge.id}
                    unlocked={overallProgress >= badge.threshold ? 1 : 0}
                  >
                    <BadgeIcon
                      unlocked={overallProgress >= badge.threshold ? 1 : 0}
                    >
                      <Typography variant="h5" component="span">
                        {badge.icon}
                      </Typography>
                    </BadgeIcon>
                    <Typography variant="subtitle2" align="center">
                      {badge.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      align="center"
                    >
                      {badge.threshold}%
                    </Typography>
                  </Badge>
                ))}
              </BadgeContainer>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Section Progress
              </Typography>

              {sections.map((section) => (
                <ProgressIndicator
                  key={section.id}
                  label={section.title}
                  value={getSectionCompletion(section.id)}
                />
              ))}

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  component={RouterLink}
                  to="/"
                  variant="outlined"
                  color="primary"
                  sx={{ mr: 1 }}
                >
                  Go to Home
                </Button>
                <Button
                  component={RouterLink}
                  to={overallProgress < 100 ? "/introduction" : "/glossary"}
                  variant="contained"
                  color="primary"
                >
                  {overallProgress < 100
                    ? "Continue Learning"
                    : "Explore Glossary"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </ProfileCard>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Reset Progress?</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to reset your progress? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleReset} color="error">
            Reset
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfileCompletion;
