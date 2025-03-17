import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Divider,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import SectionHeader from "../ui/SectionHeader";
import ProgressIndicator from "../ui/ProgressIndicator";
import { useProgress } from "../../contexts/ProgressContext";

const ContentPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
}));

const NavigationButtons = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const SubsectionCard = styled(Card)(({ theme, isActive }) => ({
  marginBottom: theme.spacing(2),
  cursor: "pointer",
  transition: "all 0.2s ease",
  ...(isActive && {
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.background.card,
  }),
  "&:hover": {
    transform: "translateX(5px)",
    boxShadow: theme.shadows[2],
  },
}));

const SectionTemplate = ({
  sectionId,
  title,
  subtitle,
  introduction,
  subsections,
  activeSubsection,
  prevLink,
  nextLink,
  children,
  renderCustomSubsections,
}) => {
  const { markAsCompleted, getSectionCompletion } = useProgress();

  useEffect(() => {
    if (activeSubsection) {
      markAsCompleted(sectionId, activeSubsection);
    }
  }, [sectionId, activeSubsection]);

  const progress = getSectionCompletion(sectionId);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SectionHeader title={title} subtitle={subtitle} />

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {introduction && (
            <ContentPaper>
              <Typography variant="h5" gutterBottom>
                {introduction.title || "Introduction"}
              </Typography>
              <Typography variant="body1" paragraph>
                {introduction.description}
              </Typography>
              {introduction.additionalContent && introduction.additionalContent}
            </ContentPaper>
          )}

          {children}

          <NavigationButtons>
            {prevLink && (
              <Button
                component={RouterLink}
                to={prevLink.path}
                variant="outlined"
                startIcon={<ArrowBackIcon />}
              >
                {prevLink.label || "Previous"}
              </Button>
            )}

            <Box sx={{ flexGrow: 1 }} />

            {nextLink && (
              <Button
                component={RouterLink}
                to={nextLink.path}
                variant="contained"
                color="primary"
                endIcon={<ArrowForwardIcon />}
              >
                {nextLink.label || "Next"}
              </Button>
            )}
          </NavigationButtons>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ position: "sticky", top: "100px" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Section Progress
              </Typography>

              <ProgressIndicator label={title} value={progress} />

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1" gutterBottom>
                In This Section
              </Typography>

              {renderCustomSubsections
                ? renderCustomSubsections()
                : subsections.map((subsection) => (
                  <SubsectionCard
                    key={subsection.id}
                    isActive={activeSubsection === subsection.id}
                    component={RouterLink}
                    to={subsection.path}
                  >
                    <CardContent>
                      <Typography variant="subtitle2">
                        {subsection.title}
                      </Typography>
                      {subsection.description && (
                        <Typography variant="body2" color="text.secondary">
                          {subsection.description}
                        </Typography>
                      )}
                    </CardContent>
                  </SubsectionCard>
                ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default SectionTemplate;
