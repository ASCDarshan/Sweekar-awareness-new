import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Container,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Chip,
  useTheme,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  IconButton,
  Collapse,
  useMediaQuery,
  Tab,
  Tabs,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import GavelIcon from "@mui/icons-material/Gavel";
import ArticleIcon from "@mui/icons-material/Article";
import BalanceIcon from "@mui/icons-material/Balance";
import PeopleIcon from "@mui/icons-material/People";
import WarningIcon from "@mui/icons-material/Warning";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EventIcon from "@mui/icons-material/Event";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { Link as RouterLink } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import SectionHeader from "../components/ui/SectionHeader";
import { legalData } from "../data/legalData";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import { useProgress } from "../contexts/ProgressContext";

const GradientCard = styled(Card)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
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

const CaseCard = styled(Card)(({ theme }) => ({
  height: "100%",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[8],
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
    background: theme.palette.error.main,
  },
}));

const StyledTimelineDot = styled(TimelineDot)(({ theme }) => ({
  backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
}));

const MobileTimelineItem = styled(Box)(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderLeft: `4px solid ${theme.palette.primary.main}`,
  "&::before": {
    content: '""',
    position: "absolute",
    left: -10,
    top: 20,
    width: 16,
    height: 16,
    borderRadius: "50%",
    background: theme.palette.primary.main,
  },
}));

const LegalPage = () => {
  const theme = useTheme();
  const { markPageAsVisited } = useProgress();
  const [expandedCase, setExpandedCase] = useState(null);
  const [expandedChallenges, setExpandedChallenges] = useState({});
  const [currentTab, setCurrentTab] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleExpandCase = (id) => {
    setExpandedCase(expandedCase === id ? null : id);
  };

  useEffect(() => {
    markPageAsVisited("/legal");
  }, []);

  const handleExpandChallenge = (issue) => {
    setExpandedChallenges((prev) => ({
      ...prev,
      [issue]: !prev[issue],
    }));
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const renderTabContent = () => {
    switch (currentTab) {
      case 0:
        return renderLandmarkCases();
      case 1:
        return renderCurrentChallenges();
      case 2:
        return renderTransgenderRights();
      default:
        return renderLandmarkCases();
    }
  };

  const renderLandmarkCases = () => {
    if (isMobile) {
      return (
        <Box sx={{ mt: 4 }}>
          {legalData.landmark_cases.map((caseData, index) => (
            <MobileTimelineItem key={caseData.id}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center", mb: 1 }}
              >
                <EventIcon fontSize="small" sx={{ mr: 0.5 }} />
                {caseData.title.split("(")[1]}
              </Typography>

              <Typography variant="h6" gutterBottom>
                {caseData.title.split("(")[0]}
              </Typography>

              <Typography variant="body2" paragraph>
                {caseData.description}
              </Typography>

              <Chip
                size="small"
                label="Significance"
                color="primary"
                sx={{ mb: 1 }}
              />

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontStyle: "italic", mb: 2 }}
              >
                {caseData.significance}
              </Typography>

              <Button
                size="small"
                variant="outlined"
                onClick={() => handleExpandCase(caseData.id)}
                endIcon={
                  expandedCase === caseData.id ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )
                }
                sx={{ mt: 1 }}
              >
                {expandedCase === caseData.id ? "Show Less" : "Show More"}
              </Button>

              <Collapse in={expandedCase === caseData.id}>
                <Box
                  sx={{
                    mt: 2,
                    pt: 2,
                    borderTop: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Typography variant="subtitle1" gutterBottom>
                    Key Findings
                  </Typography>
                  <List dense>
                    {caseData.key_findings.map((finding, idx) => (
                      <ListItem key={idx} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: "32px" }}>
                          <LightbulbIcon color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={finding} />
                      </ListItem>
                    ))}
                  </List>

                  <Typography variant="subtitle1" sx={{ mt: 2 }} gutterBottom>
                    Bench of Justices
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {caseData.justices.map((justice, idx) => (
                      <Chip
                        key={idx}
                        label={justice}
                        size="small"
                        avatar={<Avatar>{justice.charAt(0)}</Avatar>}
                      />
                    ))}
                  </Box>
                </Box>
              </Collapse>
            </MobileTimelineItem>
          ))}
        </Box>
      );
    }

    return (
      <Timeline position={isSmallMobile ? "right" : "alternate"}>
        {legalData.landmark_cases.map((caseData, index) => (
          <TimelineItem key={caseData.id}>
            {!isSmallMobile && (
              <TimelineOppositeContent sx={{ m: "auto 0" }}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.7 }}
                >
                  <Typography variant="h6" component="span">
                    {caseData.title.split("(")[0]}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    ({caseData.title.split("(")[1]}
                  </Typography>
                </motion.div>
              </TimelineOppositeContent>
            )}
            <TimelineSeparator>
              <StyledTimelineDot>
                <GavelIcon />
              </StyledTimelineDot>
              {index < legalData.landmark_cases.length - 1 && (
                <TimelineConnector />
              )}
            </TimelineSeparator>
            <TimelineContent sx={{ py: 2, px: 2 }}>
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.7 }}
              >
                <GradientCard>
                  {isSmallMobile && (
                    <CardHeader
                      title={caseData.title.split("(")[0]}
                      subheader={`(${caseData.title.split("(")[1]}`}
                    />
                  )}
                  <CardContent>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {caseData.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontStyle: "italic", mb: 2 }}
                    >
                      {caseData.significance}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button
                        size="small"
                        onClick={() => handleExpandCase(caseData.id)}
                        endIcon={
                          expandedCase === caseData.id ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )
                        }
                      >
                        {expandedCase === caseData.id
                          ? "Show Less"
                          : "Show More"}
                      </Button>
                    </Box>

                    <Collapse in={expandedCase === caseData.id}>
                      <Divider sx={{ mb: 2 }} />
                      <Typography variant="subtitle1" gutterBottom>
                        Key Findings
                      </Typography>
                      <List dense>
                        {caseData.key_findings.map((finding, idx) => (
                          <ListItem key={idx}>
                            <ListItemIcon sx={{ minWidth: "32px" }}>
                              <BalanceIcon color="primary" fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary={finding} />
                          </ListItem>
                        ))}
                      </List>

                      <Typography
                        variant="subtitle1"
                        sx={{ mt: 2 }}
                        gutterBottom
                      >
                        Bench of Justices
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {caseData.justices.map((justice, idx) => (
                          <Chip
                            key={idx}
                            label={justice}
                            size="small"
                            avatar={<Avatar>{justice.charAt(0)}</Avatar>}
                          />
                        ))}
                      </Box>
                    </Collapse>
                  </CardContent>
                </GradientCard>
              </motion.div>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    );
  };

  const renderCurrentChallenges = () => {
    return (
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {legalData.current_challenges.map((challenge) => (
          <Grid item xs={12} key={challenge.issue}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <ChallengeCard>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: isMobile ? "column" : "row",
                      justifyContent: "space-between",
                      alignItems: isMobile ? "flex-start" : "center",
                      gap: 1,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <WarningIcon color="error" sx={{ mr: 2 }} />
                      <Typography variant="h6">{challenge.issue}</Typography>
                    </Box>
                    <Chip
                      label="Ongoing Issue"
                      color="error"
                      variant="outlined"
                      size={isMobile ? "small" : "medium"}
                    />
                  </Box>

                  <Typography
                    variant="body1"
                    sx={{ mt: 2, mb: 2, pl: isMobile ? 0 : 5 }}
                  >
                    {challenge.description}
                  </Typography>

                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleExpandChallenge(challenge.issue)}
                      endIcon={
                        expandedChallenges[challenge.issue] ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )
                      }
                    >
                      {expandedChallenges[challenge.issue]
                        ? "Show Less"
                        : "Show More"}
                    </Button>
                  </Box>

                  <Collapse in={expandedChallenges[challenge.issue] || false}>
                    <Paper
                      elevation={0}
                      sx={{
                        bgcolor: "background.default",
                        p: 2,
                        mt: 2,
                        borderRadius: 1,
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        gutterBottom
                      >
                        Current Status
                      </Typography>
                      <Typography variant="body2" paragraph>
                        {challenge.status}
                      </Typography>

                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        gutterBottom
                      >
                        Advocacy Efforts
                      </Typography>
                      <Typography variant="body2">
                        {challenge.advocacy_efforts}
                      </Typography>
                    </Paper>
                  </Collapse>
                </CardContent>
              </ChallengeCard>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    );
  };

  const renderTransgenderRights = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{ marginTop: theme.spacing(3) }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%" }}>
              <CardHeader
                title="Key Provisions"
                avatar={<ArticleIcon color="primary" />}
              />
              <CardContent>
                <Typography variant="body1" paragraph>
                  {legalData.transgender_rights.description}
                </Typography>
                <List>
                  {legalData.transgender_rights.key_provisions.map(
                    (provision, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <PeopleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={provision} />
                      </ListItem>
                    )
                  )}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: "100%",
                bgcolor: "error.light",
                color: "error.contrastText",
              }}
            >
              <CardHeader title="Criticisms" avatar={<WarningIcon />} />
              <CardContent>
                <List>
                  {legalData.transgender_rights.criticisms.map(
                    (criticism, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={criticism}
                          primaryTypographyProps={{
                            variant: "body1",
                            color: "inherit",
                          }}
                        />
                      </ListItem>
                    )
                  )}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Box sx={{ mb: 4 }}>
          <SectionHeader
            title={legalData?.introduction?.title}
            subtitle={legalData?.introduction?.description}
          />
        </Box>

        {/* Mobile-friendly section tabs */}
        <Paper sx={{ position: "sticky", top: 0, zIndex: 10 }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            indicatorColor="primary"
            textColor="primary"
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              backgroundColor: "background.paper",
            }}
          >
            <Tab label="Landmark Cases" />
            <Tab label="Current Challenges" />
            <Tab label="Transgender Rights" />
          </Tabs>
        </Paper>

        {/* Render the selected tab content */}
        {renderTabContent()}

        {/* Closing banner */}
        <Box
          sx={{
            py: 4,
            px: 3,
            textAlign: "center",
            background: theme.palette.background.gradient || "rgba(0,0,0,0.03)",
            borderRadius: theme.shape.borderRadius,
            mt: 6,
            mb: 4,
          }}
        >
          <Container maxWidth="md">
            <Typography
              variant={isMobile ? "h5" : "h4"}
              component="h2"
              gutterBottom
            >
              Legal Rights are Human Rights
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: "800px", mx: "auto" }}>
              While India has made significant progress in recognizing LGBTQAI+
              rights, there is still work to be done to ensure full equality and
              protection under the law. Understanding the legal landscape is
              crucial for advocacy and creating positive change.
            </Typography>
          </Container>
        </Box>

        <Card sx={{ mb: 6 }}>
          <CardContent>
            <CardFooter
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <NavigationButton
                variant="outlined"
                color="primary"
                component={RouterLink}
                to="/identities"
                startIcon={<ArrowBackIcon />}
              >
                Previous
              </NavigationButton>

              <NavigationButton
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/challenges"
                endIcon={<ArrowForwardIcon />}
              >
                Next: Challenges
              </NavigationButton>
            </CardFooter>
          </CardContent>
        </Card>
      </Container>
    </motion.div>
  );
};

export default LegalPage;
