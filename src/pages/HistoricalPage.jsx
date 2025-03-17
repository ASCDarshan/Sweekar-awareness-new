// In your HistoricalPage.jsx
import React, { useEffect } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  useTheme,
} from "@mui/material";

import { useParams, Navigate, Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SectionTemplate from "../components/sections/SectionTemplate";
import { historicalData } from "../data";
import InteractiveTimeline from "../components/tutorial/InteractiveTimeline";
import { useProgress } from "../contexts/ProgressContext";

const TimelinePaper = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  background: `linear-gradient(to bottom, ${theme.palette.primary.light}10, ${theme.palette.background.paper})`,
}));

const PeriodCard = styled(Card)(({ theme, sectionId }) => {
  const colorMap = {
    ancient: `${theme.palette.info.light}15`,
    colonial: `${theme.palette.warning.light}15`,
    activism: `${theme.palette.success.light}15`,
    timeline: `${theme.palette.secondary.light}15`,
  };

  return {
    marginBottom: theme.spacing(4),
    overflow: "visible",
    background: `linear-gradient(to bottom, ${colorMap[sectionId] || theme.palette.primary.light
      }20, ${theme.palette.background.paper})`,
  };
});

const PeriodHeader = styled(Box)(({ theme, sectionId }) => {
  const colorMap = {
    ancient: theme.palette.info.main,
    colonial: theme.palette.warning.main,
    activism: theme.palette.success.main,
    timeline: theme.palette.secondary.main,
  };

  return {
    padding: theme.spacing(2),
    background:
      colorMap[sectionId] ||
      theme.palette.gradients?.primary ||
      theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
  };
});

const ActiveSubsection = styled(Box)(({ theme, isActive }) => ({
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  transition: "background-color 0.3s ease",
  backgroundColor: isActive ? theme.palette.primary.light : "transparent",
  "&:hover": {
    backgroundColor: isActive
      ? theme.palette.primary.light
      : theme.palette.action.hover,
  },
  marginBottom: theme.spacing(1),
}));

const NavigationButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  alignSelf: "flex-end",
}));

const CardFooter = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  paddingTop: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  marginTop: theme.spacing(3),
}));

const subsections = [
  {
    id: "ancient",
    title: "Ancient India",
    path: "/history/ancient",
    description: "Gender and sexual diversity in ancient Indian history",
  },
  {
    id: "colonial",
    title: "Colonial Era",
    path: "/history/colonial",
    description: "The impact of British colonialism on LGBTQAI+ rights",
  },
  {
    id: "activism",
    title: "Modern Activism",
    path: "/history/activism",
    description: "The emergence and growth of LGBTQAI+ activism",
  },
  {
    id: "timeline",
    title: "Timeline",
    path: "/history/timeline",
    description: "Key milestones in the journey for LGBTQAI+ rights",
  },
];

const HistoricalPage = () => {
  const theme = useTheme();
  const { subsectionId } = useParams();
  const { markPageAsVisited } = useProgress();

  useEffect(() => {
    markPageAsVisited("/identities");
  }, []);

  if (!subsectionId) {
    return <Navigate to="/history/ancient" />;
  }

  const activePeriod = historicalData.periods.find(
    (period) => period.id === subsectionId
  );

  const getNextSection = () => {
    const currentIndex = subsections.findIndex(
      (subsection) => subsection.id === subsectionId
    );

    if (currentIndex < subsections.length - 1) {
      return subsections[currentIndex + 1];
    }

    return { path: "/identities", title: "Identities & Terminologies" };
  };

  const nextSection = getNextSection();

  const renderSubsections = () => {
    return subsections.map((subsection) => (
      <ActiveSubsection
        key={subsection.id}
        isActive={subsection.id === subsectionId}
        component={RouterLink}
        to={subsection.path}
        sx={{ display: "block", textDecoration: "none" }}
      >
        <Typography
          variant="subtitle1"
          component="div"
          sx={{
            fontWeight: subsection.id === subsectionId ? "bold" : "normal",
            color:
              subsection.id === subsectionId ? "primary.dark" : "text.primary",
          }}
        >
          {subsection.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subsection.description}
        </Typography>
      </ActiveSubsection>
    ));
  };

  const renderContent = () => {
    if (subsectionId === "timeline") {
      return (
        <TimelinePaper>
          <Typography variant="h5" gutterBottom>
            LGBTQAI+ Rights Timeline in India
          </Typography>

          <Box sx={{ my: 4 }}>
            <InteractiveTimeline events={historicalData.timeline} />
          </Box>

          <CardFooter>
            <NavigationButton
              variant="contained"
              color="primary"
              component={RouterLink}
              to={nextSection.path}
              endIcon={<ArrowForwardIcon />}
            >
              Next: {nextSection.title}
            </NavigationButton>
          </CardFooter>
        </TimelinePaper>
      );
    }

    if (activePeriod) {
      return (
        <PeriodCard sectionId={subsectionId}>
          <PeriodHeader sectionId={subsectionId}>
            <Typography variant="h5">{activePeriod.title}</Typography>
          </PeriodHeader>
          <CardContent>
            <Typography variant="body1" paragraph>
              {activePeriod.description}
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Key Points
            </Typography>

            {activePeriod.keyPoints.map((point, index) => (
              <Box
                key={index}
                sx={{
                  mb: 2,
                  p: 2,
                  borderRadius: 1,
                  borderLeft: `4px solid ${theme.palette.primary.main}`,
                  bgcolor: `rgba(${theme.palette.primary.main.replace(
                    /[^\d,]/g,
                    ""
                  )}, 0.05)`,
                }}
              >
                <Typography variant="body1">{point.text}</Typography>
                <Typography variant="caption" color="text.secondary">
                  Source: {point.source}
                </Typography>
              </Box>
            ))}

            <CardFooter>
              <NavigationButton
                variant="contained"
                color="primary"
                component={RouterLink}
                to={nextSection.path}
                endIcon={<ArrowForwardIcon />}
              >
                Next: {nextSection.title}
              </NavigationButton>
            </CardFooter>
          </CardContent>
        </PeriodCard>
      );
    }

    return (
      <Box>
        <Typography variant="h5" color="error">
          Content for this section is not available.
        </Typography>

        <CardFooter>
          <NavigationButton
            variant="contained"
            color="primary"
            component={RouterLink}
            to={nextSection.path}
            endIcon={<ArrowForwardIcon />}
          >
            Next: {nextSection.title}
          </NavigationButton>
        </CardFooter>
      </Box>
    );
  };

  return (
    <SectionTemplate
      sectionId="historical"
      title="Historical Context of LGBTQAI+ Advocacy in India"
      subtitle="From ancient acceptance to modern struggles and victories"
      introduction={historicalData.introduction}
      subsections={subsections}
      activeSubsection={subsectionId}
      prevLink={{ path: "/introduction", label: "Introduction" }}
      nextLink={{ path: "/identities", label: "Identities & Terminologies" }}
      renderCustomSubsections={renderSubsections}
    >
      {renderContent()}
    </SectionTemplate>
  );
};

export default HistoricalPage;
