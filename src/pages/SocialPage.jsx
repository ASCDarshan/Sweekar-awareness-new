import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Container,
  Card,
  CardContent,
  CardHeader,
  Tabs,
  Tab,
  Divider,
  Chip,
  useTheme,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Collapse,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import PeopleIcon from "@mui/icons-material/People";
import PsychologyIcon from "@mui/icons-material/Psychology";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import WarningIcon from "@mui/icons-material/Warning";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import MoodIcon from "@mui/icons-material/Mood";
import LanguageIcon from "@mui/icons-material/Language";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import ChurchIcon from "@mui/icons-material/Church";

import SectionHeader from "../components/ui/SectionHeader";
import { socialData } from "../data/socialData";
import SectionTemplate from "../components/sections/SectionTemplate";
import { useProgress } from "../contexts/ProgressContext";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link as RouterLink } from "react-router-dom";

const GradientCard = styled(Card)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  height: "100%",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "5px",
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  },
}));

const ChallengeCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: "4px",
    background: theme.palette.accent1.main,
  },
}));

const ProgressCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: "4px",
    background: theme.palette.tertiary.main,
  },
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[4],
  },
}));

const StyledTab = styled(Tab)(() => ({
  fontWeight: 600,
  fontSize: "1rem",
  textTransform: "none",
  minWidth: 120,
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  "& .MuiTabs-indicator": {
    height: 4,
    borderRadius: "4px 4px 0 0",
    backgroundImage: theme.palette.gradients?.rainbow,
  },
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

const SocialPage = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [expandedItems, setExpandedItems] = useState({});
  const { challenges, progress } = socialData;

  const { markPageAsVisited } = useProgress();

  useEffect(() => {
    markPageAsVisited("/social");
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleToggleExpand = (section, id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [`${section}-${id}`]: !prev[`${section}-${id}`],
    }));
  };

  const isExpanded = (section, id) => {
    return !!expandedItems[`${section}-${id}`];
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="lg" sx={{ pt: 4, pb: 8 }}>
        <Box sx={{ mb: 6 }}>
          <SectionHeader
            title="LGBTQAI+ Social Landscape in India"
            subtitle="Examining challenges and progress in social acceptance and inclusion"
          />

          <StyledTabs
            value={tabValue}
            onChange={handleTabChange}
            centered
            variant="fullWidth"
          >
            <StyledTab label="Social Challenges" />
            <StyledTab label="Progress & Visibility" />
          </StyledTabs>

          {tabValue === 0 && (
            <Box>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <GradientCard sx={{ mb: 4 }}>
                  <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom>
                      {challenges.introduction.title}
                    </Typography>
                    <Typography variant="body1">
                      {challenges.introduction.description}
                    </Typography>
                  </CardContent>
                </GradientCard>

                <ChallengeCard>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <ReportProblemIcon
                          sx={{ mr: 2, color: theme.palette.accent1.main }}
                        />
                        <Typography variant="h6">
                          {challenges.stigma_discrimination.title}
                        </Typography>
                      </Box>
                      <IconButton
                        onClick={() => handleToggleExpand("stigma", "main")}
                        aria-expanded={isExpanded("stigma", "main")}
                        aria-label="show more"
                      >
                        {isExpanded("stigma", "main") ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </Box>

                    <Typography variant="body1" sx={{ mt: 2, pl: 5 }}>
                      {challenges.stigma_discrimination.description}
                    </Typography>

                    <Collapse in={isExpanded("stigma", "main")}>
                      <Grid container spacing={2} sx={{ mt: 2 }}>
                        {challenges.stigma_discrimination.examples.map(
                          (example, index) => (
                            <Grid item xs={12} sm={6} key={index}>
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  delay: index * 0.1,
                                  duration: 0.5,
                                }}
                              >
                                <Paper
                                  elevation={2}
                                  sx={{
                                    p: 2,
                                    height: "100%",
                                    bgcolor: theme.palette.background.card,
                                  }}
                                >
                                  <Typography
                                    variant="subtitle1"
                                    fontWeight="bold"
                                    color="primary"
                                  >
                                    {example.type}
                                  </Typography>
                                  <Typography variant="body2" paragraph>
                                    {example.description}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      p: 1,
                                      bgcolor: "rgba(233, 30, 99, 0.08)",
                                      borderRadius: 1,
                                      fontStyle: "italic",
                                    }}
                                  >
                                    <strong>Impact:</strong> {example.impact}
                                  </Typography>
                                </Paper>
                              </motion.div>
                            </Grid>
                          )
                        )}
                      </Grid>
                    </Collapse>
                  </CardContent>
                </ChallengeCard>

                <ChallengeCard>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <PsychologyIcon
                          sx={{ mr: 2, color: theme.palette.accent1.main }}
                        />
                        <Typography variant="h6">
                          {challenges.mental_health.title}
                        </Typography>
                      </Box>
                      <IconButton
                        onClick={() => handleToggleExpand("mental", "main")}
                        aria-expanded={isExpanded("mental", "main")}
                        aria-label="show more"
                      >
                        {isExpanded("mental", "main") ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </Box>

                    <Typography variant="body1" sx={{ mt: 2, pl: 5 }}>
                      {challenges.mental_health.description}
                    </Typography>

                    <Collapse in={isExpanded("mental", "main")}>
                      <Box sx={{ mt: 3 }}>
                        {challenges.mental_health.issues.map((issue, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                          >
                            <Paper
                              elevation={1}
                              sx={{
                                p: 2,
                                mb: 2,
                                bgcolor: theme.palette.background.card,
                                borderLeft: `4px solid ${theme.palette.accent2.main}`,
                              }}
                            >
                              <Typography
                                variant="h6"
                                color="accent2.main"
                                gutterBottom
                              >
                                {issue.condition}
                              </Typography>
                              <Typography variant="body2" paragraph>
                                {issue.prevalence}
                              </Typography>
                              <Typography variant="subtitle2" gutterBottom>
                                Contributing Factors:
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 1,
                                }}
                              >
                                {issue.factors.map((factor, idx) => (
                                  <Chip
                                    key={idx}
                                    label={factor}
                                    size="small"
                                    color="primary"
                                    variant="outlined"
                                  />
                                ))}
                              </Box>
                            </Paper>
                          </motion.div>
                        ))}

                        <Paper
                          elevation={3}
                          sx={{
                            p: 3,
                            mt: 3,
                            bgcolor: "rgba(244, 67, 54, 0.05)",
                            borderRadius: 2,
                          }}
                        >
                          <Typography variant="h6" gutterBottom>
                            Barriers to Mental Health Care
                          </Typography>
                          <List>
                            {challenges.mental_health.barriers_to_care.map(
                              (barrier, index) => (
                                <ListItem key={index}>
                                  <ListItemIcon>
                                    <WarningIcon color="error" />
                                  </ListItemIcon>
                                  <ListItemText primary={barrier} />
                                </ListItem>
                              )
                            )}
                          </List>
                        </Paper>
                      </Box>
                    </Collapse>
                  </CardContent>
                </ChallengeCard>

                <ChallengeCard>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <ChurchIcon
                          sx={{ mr: 2, color: theme.palette.accent1.main }}
                        />
                        <Typography variant="h6">
                          {challenges.religious_cultural.title}
                        </Typography>
                      </Box>
                      <IconButton
                        onClick={() => handleToggleExpand("religious", "main")}
                        aria-expanded={isExpanded("religious", "main")}
                        aria-label="show more"
                      >
                        {isExpanded("religious", "main") ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </Box>

                    <Typography variant="body1" sx={{ mt: 2, pl: 5 }}>
                      {challenges.religious_cultural.description}
                    </Typography>

                    <Collapse in={isExpanded("religious", "main")}>
                      <Grid container spacing={2} sx={{ mt: 3 }}>
                        {challenges.religious_cultural.perspectives.map(
                          (perspective, index) => (
                            <Grid item xs={12} md={4} key={index}>
                              <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                  delay: index * 0.2,
                                  duration: 0.5,
                                }}
                              >
                                <Paper
                                  elevation={2}
                                  sx={{
                                    p: 3,
                                    height: "100%",
                                    bgcolor: theme.palette.background.card,
                                    borderTop: `3px solid ${theme.palette.primary.main}`,
                                  }}
                                >
                                  <Typography variant="h6" gutterBottom>
                                    {perspective.view}
                                  </Typography>
                                  <Typography variant="body2">
                                    {perspective.description}
                                  </Typography>
                                </Paper>
                              </motion.div>
                            </Grid>
                          )
                        )}
                      </Grid>
                    </Collapse>
                  </CardContent>
                </ChallengeCard>
              </motion.div>
            </Box>
          )}

          {tabValue === 1 && (
            <Box>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <GradientCard sx={{ mb: 4 }}>
                  <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom>
                      {progress.introduction.title}
                    </Typography>
                    <Typography variant="body1">
                      {progress.introduction.description}
                    </Typography>
                  </CardContent>
                </GradientCard>

                <ProgressCard>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <TheaterComedyIcon
                          sx={{ mr: 2, color: theme.palette.tertiary.main }}
                        />
                        <Typography variant="h6">
                          {progress.visibility.title}
                        </Typography>
                      </Box>
                      <IconButton
                        onClick={() => handleToggleExpand("visibility", "main")}
                        aria-expanded={isExpanded("visibility", "main")}
                        aria-label="show more"
                      >
                        {isExpanded("visibility", "main") ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </Box>

                    <Typography variant="body1" sx={{ mt: 2, pl: 5 }}>
                      {progress.visibility.description}
                    </Typography>

                    <Collapse in={isExpanded("visibility", "main")}>
                      <Grid container spacing={3} sx={{ mt: 3 }}>
                        {progress.visibility.examples.map((example, index) => (
                          <Grid item xs={12} md={4} key={index}>
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.2, duration: 0.5 }}
                            >
                              <Card
                                sx={{
                                  height: "100%",
                                  bgcolor: theme.palette.background.card,
                                  boxShadow: theme.shadows[2],
                                }}
                              >
                                <CardHeader
                                  title={example.medium}
                                  titleTypographyProps={{
                                    variant: "h6",
                                    color: "primary.main",
                                  }}
                                />
                                <CardContent>
                                  <Typography variant="subtitle2" gutterBottom>
                                    Notable Examples:
                                  </Typography>
                                  <List dense>
                                    {example.examples.map((ex, idx) => (
                                      <ListItem key={idx}>
                                        <ListItemIcon sx={{ minWidth: 30 }}>
                                          <MoodIcon
                                            color="secondary"
                                            fontSize="small"
                                          />
                                        </ListItemIcon>
                                        <ListItemText primary={ex} />
                                      </ListItem>
                                    ))}
                                  </List>
                                  <Divider sx={{ my: 2 }} />
                                  <Typography
                                    variant="body2"
                                    fontStyle="italic"
                                  >
                                    <strong>Impact:</strong> {example.impact}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </motion.div>
                          </Grid>
                        ))}
                      </Grid>
                    </Collapse>
                  </CardContent>
                </ProgressCard>

                <ProgressCard>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <LanguageIcon
                          sx={{ mr: 2, color: theme.palette.tertiary.main }}
                        />
                        <Typography variant="h6">
                          {progress.urban_acceptance.title}
                        </Typography>
                      </Box>
                      <IconButton
                        onClick={() => handleToggleExpand("urban", "main")}
                        aria-expanded={isExpanded("urban", "main")}
                        aria-label="show more"
                      >
                        {isExpanded("urban", "main") ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </Box>

                    <Typography variant="body1" sx={{ mt: 2, pl: 5 }}>
                      {progress.urban_acceptance.description}
                    </Typography>

                    <Collapse in={isExpanded("urban", "main")}>
                      <Box sx={{ mt: 3 }}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 3,
                            mb: 3,
                            bgcolor: theme.palette.background.card,
                            borderRadius: 2,
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            fontWeight="600"
                            gutterBottom
                          >
                            Key Factors
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 1,
                              mb: 3,
                            }}
                          >
                            {progress.urban_acceptance.factors.map(
                              (factor, index) => (
                                <Chip
                                  key={index}
                                  label={factor}
                                  color="secondary"
                                  sx={{ fontWeight: 500 }}
                                />
                              )
                            )}
                          </Box>

                          <Typography
                            variant="subtitle1"
                            fontWeight="600"
                            gutterBottom
                          >
                            Notable Events
                          </Typography>
                          <Grid container spacing={2}>
                            {progress.urban_acceptance.events.map(
                              (event, index) => (
                                <Grid item xs={12} sm={6} key={index}>
                                  <Card
                                    sx={{
                                      height: "100%",
                                      bgcolor: "rgba(46, 204, 113, 0.05)",
                                      border: `1px solid ${theme.palette.tertiary.light}`,
                                    }}
                                  >
                                    <CardContent>
                                      <Typography
                                        variant="h6"
                                        color="tertiary.main"
                                        gutterBottom
                                      >
                                        {event.name}
                                      </Typography>
                                      {event.locations && (
                                        <Box sx={{ mb: 1 }}>
                                          <Typography
                                            variant="body2"
                                            component="span"
                                            fontWeight="bold"
                                          >
                                            Locations:
                                          </Typography>{" "}
                                          <Typography
                                            variant="body2"
                                            component="span"
                                          >
                                            {event.locations.join(", ")}
                                          </Typography>
                                        </Box>
                                      )}
                                      {event.example && (
                                        <Box sx={{ mb: 1 }}>
                                          <Typography
                                            variant="body2"
                                            component="span"
                                            fontWeight="bold"
                                          >
                                            Example:
                                          </Typography>{" "}
                                          <Typography
                                            variant="body2"
                                            component="span"
                                          >
                                            {event.example}
                                          </Typography>
                                        </Box>
                                      )}
                                      <Typography
                                        variant="body2"
                                        fontStyle="italic"
                                        sx={{ mt: 1 }}
                                      >
                                        <strong>Impact:</strong> {event.impact}
                                      </Typography>
                                    </CardContent>
                                  </Card>
                                </Grid>
                              )
                            )}
                          </Grid>
                        </Paper>
                      </Box>
                    </Collapse>
                  </CardContent>
                </ProgressCard>

                <ProgressCard>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <VolunteerActivismIcon
                          sx={{ mr: 2, color: theme.palette.tertiary.main }}
                        />
                        <Typography variant="h6">
                          {progress.organizations.title}
                        </Typography>
                      </Box>
                      <IconButton
                        onClick={() =>
                          handleToggleExpand("organizations", "main")
                        }
                        aria-expanded={isExpanded("organizations", "main")}
                        aria-label="show more"
                      >
                        {isExpanded("organizations", "main") ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </Box>

                    <Typography variant="body1" sx={{ mt: 2, pl: 5 }}>
                      {progress.organizations.description}
                    </Typography>

                    <Collapse in={isExpanded("organizations", "main")}>
                      <Grid container spacing={3} sx={{ mt: 3 }}>
                        {progress.organizations.key_organizations.map(
                          (org, index) => (
                            <Grid item xs={12} md={4} key={index}>
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  delay: index * 0.2,
                                  duration: 0.5,
                                }}
                              >
                                <Card
                                  sx={{
                                    height: "100%",
                                    boxShadow: theme.shadows[2],
                                  }}
                                >
                                  <Box
                                    sx={{
                                      height: 8,
                                      width: "100%",
                                      background:
                                        theme.palette.gradients?.rainbow,
                                    }}
                                  />
                                  <CardContent>
                                    <Typography
                                      variant="h6"
                                      gutterBottom
                                      sx={{
                                        pb: 1,
                                        mb: 2,
                                        borderBottom: `1px solid ${theme.palette.divider}`,
                                      }}
                                    >
                                      {org.name}
                                    </Typography>
                                    <Typography
                                      variant="subtitle2"
                                      color="primary"
                                      gutterBottom
                                      sx={{ mb: 2 }}
                                    >
                                      Focus: {org.focus}
                                    </Typography>
                                    <Typography variant="body2">
                                      <strong>Key Achievements:</strong>{" "}
                                      {org.achievements}
                                    </Typography>
                                  </CardContent>
                                </Card>
                              </motion.div>
                            </Grid>
                          )
                        )}
                      </Grid>
                    </Collapse>
                  </CardContent>
                </ProgressCard>

                <ProgressCard>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CorporateFareIcon
                          sx={{ mr: 2, color: theme.palette.tertiary.main }}
                        />
                        <Typography variant="h6">
                          {progress.corporate.title}
                        </Typography>
                      </Box>
                      <IconButton
                        onClick={() => handleToggleExpand("corporate", "main")}
                        aria-expanded={isExpanded("corporate", "main")}
                        aria-label="show more"
                      >
                        {isExpanded("corporate", "main") ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </Box>

                    <Typography variant="body1" sx={{ mt: 2, pl: 5 }}>
                      {progress.corporate.description}
                    </Typography>

                    <Collapse in={isExpanded("corporate", "main")}>
                      <Grid container spacing={3} sx={{ mt: 3 }}>
                        <Grid item xs={12} md={8}>
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Paper
                              elevation={1}
                              sx={{
                                p: 3,
                                bgcolor: theme.palette.background.card,
                                height: "100%",
                              }}
                            >
                              <Typography variant="h6" gutterBottom>
                                Diversity and Inclusion Initiatives
                              </Typography>
                              <List>
                                {progress.corporate.initiatives.map(
                                  (initiative, index) => (
                                    <ListItem
                                      key={index}
                                      sx={{
                                        py: 1.5,
                                        px: 2,
                                        mb: 1,
                                        bgcolor: "rgba(52, 152, 219, 0.05)",
                                        borderRadius: 1,
                                      }}
                                    >
                                      <ListItemIcon>
                                        <PeopleIcon color="secondary" />
                                      </ListItemIcon>
                                      <ListItemText
                                        primary={initiative.type}
                                        secondary={initiative.examples}
                                        primaryTypographyProps={{
                                          fontWeight: "bold",
                                        }}
                                      />
                                    </ListItem>
                                  )
                                )}
                              </List>
                            </Paper>
                          </motion.div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Card
                              sx={{
                                p: 3,
                                height: "100%",
                                background: theme.palette.gradients?.primary,
                                color: "white",
                              }}
                            >
                              <Typography
                                variant="h6"
                                gutterBottom
                                sx={{ color: "white" }}
                              >
                                Leading Companies
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: 1,
                                }}
                              >
                                {progress.corporate.companies.map(
                                  (company, index) => (
                                    <Chip
                                      key={index}
                                      label={company}
                                      sx={{
                                        bgcolor: "rgba(255, 104, 245, 0.2)",
                                        fontSize: "0.9rem",
                                      }}
                                    />
                                  )
                                )}
                              </Box>
                            </Card>
                          </motion.div>
                        </Grid>
                      </Grid>
                    </Collapse>
                  </CardContent>
                </ProgressCard>
              </motion.div>
            </Box>
          )}
        </Box>

        <Box
          sx={{
            py: 6,
            px: 4,
            textAlign: "center",
            background: theme.palette.background.gradient || "rgba(0,0,0,0.03)",
            borderRadius: theme.shape.borderRadius,
            mb: 4,
          }}
        >
          <Container maxWidth="md">
            <Typography variant="h4" component="h2" gutterBottom>
              Building a More Inclusive Society
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 4, maxWidth: "800px", mx: "auto" }}
            >
              While significant challenges remain for LGBTQAI+ communities, we
              are working tirelessly to create a more inclusive society. Our
              goal is to empower individuals to express their sexuality and
              gender identity without fear of discrimination or harassment.
            </Typography>
          </Container>
        </Box>
      </Container>

      <Card sx={{ mb: 6 }}>
        <CardContent>
          <CardFooter sx={{ display: "flex", justifyContent: "space-between" }}>
            <NavigationButton
              variant="outlined"
              color="primary"
              component={RouterLink}
              to="/resources"
              startIcon={<ArrowBackIcon />}
            >
              Previous
            </NavigationButton>

            <NavigationButton
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/glossary"
              endIcon={<ArrowForwardIcon />}
            >
              Next: Glossary
            </NavigationButton>
          </CardFooter>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SocialPage;
