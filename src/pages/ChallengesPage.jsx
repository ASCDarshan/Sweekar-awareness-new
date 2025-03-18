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
    Accordion,
    AccordionSummary,
    AccordionDetails,
    LinearProgress,
    Stack,
    Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import SchoolIcon from "@mui/icons-material/School";
import WarningIcon from "@mui/icons-material/Warning";
import ChurchIcon from "@mui/icons-material/Church";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import SectionHeader from "../components/ui/SectionHeader";
import { challengesData } from "../data/challengesData";
import { useProgress } from "../contexts/ProgressContext";

import { Link as RouterLink } from "react-router-dom";

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

const RainbowCard = styled(Card)(({ theme }) => ({
    position: "relative",
    overflow: "hidden",
    "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "5px",
        background:
            theme.palette.gradients?.rainbow ||
            "linear-gradient(90deg, #E74C3C, #F39C12, #F1C40F, #2ECC71, #3498DB, #9B59B6)",
    },
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: theme.shadows[8],
    },
}));

const ImpactChip = styled(Chip)(({ theme, severity }) => {
    let color;
    switch (severity) {
        case "high":
            color = theme.palette.accent1?.main || theme.palette.error.main;
            break;
        case "medium":
            color = theme.palette.secondary.main;
            break;
        default:
            color = theme.palette.tertiary?.main || theme.palette.success.main;
    }

    return {
        backgroundColor: color,
        color: theme.palette.getContrastText(color),
        fontWeight: 600,
        margin: theme.spacing(0.5),
    };
});

const StyledAccordion = styled(Accordion)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    borderRadius: theme.shape.borderRadius + "px !important",
    overflow: "hidden",
    boxShadow: theme.shadows[2],
    "&::before": {
        display: "none",
    },
    "&.Mui-expanded": {
        boxShadow: theme.shadows[3],
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

const ChallengesPage = () => {
    const theme = useTheme();
    const [expanded, setExpanded] = useState(false);
    const { markPageAsVisited } = useProgress();

    useEffect(() => {
        markPageAsVisited("/challenges");
    }, []);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
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
                        title={challengesData.introduction.title}
                        subtitle={challengesData.introduction.description}
                    />
                </Box>

                <Box sx={{ mb: 6 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <GradientCard>
                            <CardHeader
                                title={challengesData.stigmaAndDiscrimination.title}
                                avatar={
                                    <SentimentVeryDissatisfiedIcon
                                        fontSize="large"
                                        color="error"
                                    />
                                }
                            />
                            <CardContent>
                                <Typography variant="body1" paragraph>
                                    {challengesData.stigmaAndDiscrimination.description}
                                </Typography>

                                <Grid container spacing={3} sx={{ mt: 2 }}>
                                    {challengesData.stigmaAndDiscrimination.examples.map(
                                        (example, index) => (
                                            <Grid item xs={12} md={6} key={index}>
                                                <motion.div
                                                    initial={{
                                                        opacity: 0,
                                                        x: index % 2 === 0 ? -20 : 20,
                                                    }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                                >
                                                    <Paper
                                                        elevation={3}
                                                        sx={{
                                                            p: 3,
                                                            height: "100%",
                                                            position: "relative",
                                                            overflow: "hidden",
                                                            "&::before": {
                                                                content: '""',
                                                                position: "absolute",
                                                                left: 0,
                                                                top: 0,
                                                                bottom: 0,
                                                                width: "4px",
                                                                backgroundColor:
                                                                    theme.palette.accent1?.main ||
                                                                    theme.palette.error.main,
                                                            },
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="h6"
                                                            gutterBottom
                                                            fontWeight="600"
                                                        >
                                                            {example.type}
                                                        </Typography>
                                                        <Typography variant="body2" paragraph>
                                                            {example.description}
                                                        </Typography>
                                                        <Divider sx={{ my: 1.5 }} />
                                                        <Typography
                                                            variant="subtitle2"
                                                            color="text.secondary"
                                                            gutterBottom
                                                        >
                                                            Impact:
                                                        </Typography>
                                                        <Typography
                                                            variant="body2"
                                                            sx={{ fontStyle: "italic" }}
                                                        >
                                                            {example.impact}
                                                        </Typography>
                                                    </Paper>
                                                </motion.div>
                                            </Grid>
                                        )
                                    )}
                                </Grid>
                            </CardContent>
                        </GradientCard>
                    </motion.div>
                </Box>

                <Box sx={{ mb: 6 }}>
                    <SectionHeader
                        title={challengesData.mentalHealth.title}
                        subtitle={challengesData.mentalHealth.description}
                    />

                    <Grid container spacing={3}>
                        {challengesData.mentalHealth.issues.map((issue, index) => (
                            <Grid item xs={12} md={6} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.6 }}
                                >
                                    <RainbowCard>
                                        <CardHeader
                                            title={issue.condition}
                                            subheader={issue.prevalence}
                                            avatar={
                                                <PsychologyIcon
                                                    sx={{
                                                        color: theme.palette.primary.main,
                                                    }}
                                                />
                                            }
                                        />
                                        <CardContent>
                                            <Typography
                                                variant="subtitle2"
                                                gutterBottom
                                                color="text.secondary"
                                            >
                                                Contributing Factors:
                                            </Typography>
                                            <List dense>
                                                {issue.factors.map((factor, idx) => (
                                                    <ListItem key={idx} disableGutters>
                                                        <ListItemIcon sx={{ minWidth: 36 }}>
                                                            <ArrowRightIcon color="primary" />
                                                        </ListItemIcon>
                                                        <ListItemText primary={factor} />
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </CardContent>
                                    </RainbowCard>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                    >
                        <Box sx={{ mt: 4 }}>
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 3,
                                    bgcolor:
                                        theme.palette.accent2?.light || theme.palette.info.light,
                                    color: theme.palette.getContrastText(
                                        theme.palette.accent2?.light || theme.palette.info.light
                                    ),
                                }}
                            >
                                <Typography variant="h6" gutterBottom>
                                    Barriers to Accessing Mental Health Support
                                </Typography>
                                <List>
                                    {challengesData.mentalHealth.barriersToHelp.map(
                                        (barrier, index) => (
                                            <ListItem key={index}>
                                                <ListItemIcon>
                                                    <WarningIcon sx={{ color: "inherit" }} />
                                                </ListItemIcon>
                                                <ListItemText primary={barrier} />
                                            </ListItem>
                                        )
                                    )}
                                </List>
                            </Paper>
                        </Box>
                    </motion.div>
                </Box>

                <Box sx={{ mb: 6 }}>
                    <SectionHeader
                        title={challengesData.religiousCultural.title}
                        subtitle={challengesData.religiousCultural.description}
                    />

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <Grid container spacing={3}>
                            {challengesData.religiousCultural.perspectives.map(
                                (perspective, index) => (
                                    <Grid item xs={12} md={4} key={index}>
                                        <StyledAccordion
                                            expanded={expanded === `panel-religious-${index}`}
                                            onChange={handleChange(`panel-religious-${index}`)}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls={`panel${index}a-content`}
                                                id={`panel${index}a-header`}
                                            >
                                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                                    <ChurchIcon color="primary" sx={{ mr: 1.5 }} />
                                                    <Typography variant="subtitle1">
                                                        {perspective.view}
                                                    </Typography>
                                                </Box>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography variant="body2">
                                                    {perspective.description}
                                                </Typography>
                                            </AccordionDetails>
                                        </StyledAccordion>
                                    </Grid>
                                )
                            )}
                        </Grid>
                    </motion.div>
                </Box>

                <Box sx={{ mb: 6 }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7 }}
                            >
                                <Card sx={{ height: "100%" }}>
                                    <CardHeader
                                        title={challengesData.healthcare.title}
                                        avatar={<LocalHospitalIcon color="primary" />}
                                    />
                                    <CardContent>
                                        <Typography variant="body1" paragraph>
                                            {challengesData.healthcare.description}
                                        </Typography>
                                        {challengesData.healthcare.issues.map((issue, index) => (
                                            <Box key={index} sx={{ mb: 2 }}>
                                                <Stack direction="row" spacing={2} alignItems="center">
                                                    <ArrowRightIcon color="primary" />
                                                    <Typography variant="body2">{issue}</Typography>
                                                </Stack>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={100 - index * 15}
                                                    sx={{
                                                        mt: 1,
                                                        height: 6,
                                                        borderRadius: 3,
                                                        bgcolor: theme.palette.background.default,
                                                        "& .MuiLinearProgress-bar": {
                                                            bgcolor:
                                                                theme.palette.accent2?.main ||
                                                                theme.palette.info.main,
                                                        },
                                                    }}
                                                />
                                            </Box>
                                        ))}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7 }}
                            >
                                <Card sx={{ height: "100%" }}>
                                    <CardHeader
                                        title={challengesData.education.title}
                                        avatar={<SchoolIcon color="primary" />}
                                    />
                                    <CardContent>
                                        <Typography variant="body1" paragraph>
                                            {challengesData.education.description}
                                        </Typography>
                                        <Stack direction="row" flexWrap="wrap" sx={{ mt: 2 }}>
                                            {challengesData.education.problems.map(
                                                (problem, index) => (
                                                    <ImpactChip
                                                        key={index}
                                                        label={problem}
                                                        severity={
                                                            index < 2 ? "high" : index < 4 ? "medium" : "low"
                                                        }
                                                        icon={<WarningIcon />}
                                                    />
                                                )
                                            )}
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    </Grid>
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
                            Addressing Challenges Together
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ mb: 4, maxWidth: "800px", mx: "auto" }}
                        >
                            Understanding these challenges is the first step toward creating a
                            more inclusive society. By raising awareness, advocating for
                            policy changes, and fostering supportive communities, we can work
                            together to address the social and cultural challenges faced by
                            LGBTQAI+ individuals in India.
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
                                to="/legal"
                                startIcon={<ArrowBackIcon />}
                            >
                                Previous
                            </NavigationButton>

                            <NavigationButton
                                variant="contained"
                                color="primary"
                                component={RouterLink}
                                to="/resources"
                                endIcon={<ArrowForwardIcon />}
                            >
                                Next: Resources
                            </NavigationButton>
                        </CardFooter>
                    </CardContent>
                </Card>
            </Container>
        </motion.div>
    );
};

export default ChallengesPage;
