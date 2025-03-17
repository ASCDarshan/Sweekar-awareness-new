/* eslint-disable no-constant-binary-expression */
import React from "react";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Container,
  useTheme,
} from "@mui/material";
import { motion } from 'framer-motion';
import SectionHeader from "../components/ui/SectionHeader";
import ProfileCompletion from "../components/tutorial/ProfileCompletion"; // Updated import path
import { useProgress } from "../contexts/ProgressContext";

const getSubsectionDescription = (section) => {
  switch (section.id) {
    case "introduction":
      return "Get familiar with the tutorial structure and understand the learning objectives.";
    case "historical":
      return "Explore the rich history of gender and sexual diversity in India from ancient times to modern activism.";
    case "identities":
      return "Learn about different sexual orientations, gender identities, and the spectrum of human diversity.";
    case "legal":
      return "Understand the legal landscape including landmark court cases and current challenges for LGBTQAI+ rights in India.";
    case "challenges":
      return "Examine the social stigma, discrimination, mental health challenges, and other issues faced by the community.";
    case "progress":
      return "Discover the visibility, representation, and positive developments for the LGBTQAI+ community in recent years.";
    case "resources":
      return "Access support organizations, helplines, and resources available for the LGBTQAI+ community and allies.";
    default:
      return "Explore this section to learn more about LGBTQAI+ awareness.";
  }
};

const ProgressPage = () => {
  const theme = useTheme();
  const { sections, getSectionCompletion } = useProgress();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="lg">
        <SectionHeader
          title="Your Learning Journey"
          subtitle="Track your progress and achievements in the LGBTQAI+ awareness tutorial"
        />

        {/* Enhanced Profile Completion Component */}
        <ProfileCompletion />

        <Box sx={{ my: 6 }}>
          <Typography variant="h5" gutterBottom>
            Learning Path Overview
          </Typography>
          <Typography variant="body1" paragraph>
            Our tutorial is structured to provide a comprehensive understanding of
            LGBTQAI+ issues in India. Below is an overview of each section and
            what you'll learn.
          </Typography>

          <Grid container spacing={3} sx={{ mt: 2 }}>
            {sections.map((section, index) => (
              <Grid item xs={12} md={6} key={section.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      borderLeft: `4px solid ${theme.palette.primary.main}`,
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: theme.shadows[4],
                      },
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          mb: 1,
                        }}
                      >
                        <Typography variant="h6">
                          {index + 1}. {section.title}
                        </Typography>
                        <Box
                          sx={{
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 10,
                            bgcolor: getSectionCompletion(section.id) === 100
                              ? 'tertiary.light'
                              : 'background.default',
                            color: getSectionCompletion(section.id) === 100
                              ? 'tertiary.dark'
                              : 'text.secondary',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                          }}
                        >
                          {Math.round(getSectionCompletion(section.id))}% Complete
                        </Box>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {getSubsectionDescription(section)}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box
          sx={{
            mt: 6,
            mb: 4,
            textAlign: "center",
            py: 4,
            px: 3,
            borderRadius: theme.shape.borderRadius,
            bgcolor: 'background.gradient' || theme.palette.background.default,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Continue Your Learning Journey
          </Typography>
          <Typography variant="body1">
            The more you learn, the better you can understand and support the
            LGBTQAI+ community. Keep exploring sections to complete your tutorial
            and earn all badges!
          </Typography>
        </Box>
      </Container>
    </motion.div>
  );
};

export default ProgressPage;