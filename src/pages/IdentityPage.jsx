import React, { useEffect, useState } from "react";
import {
    Box,
    Grid,
    Typography,
    Container,
    Card,
    CardContent,
    Tabs,
    Tab,
    Divider,
    Chip,
    useTheme,
    Paper,
    List,
    ListItem,
    ListItemText,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    useMediaQuery,
    SwipeableDrawer,
    Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CategoryIcon from "@mui/icons-material/Category";
import InfoIcon from "@mui/icons-material/Info";
import LabelIcon from "@mui/icons-material/Label";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link as RouterLink } from "react-router-dom";

import SectionHeader from "../components/ui/SectionHeader";
import { identitiesData } from "../data/identitiesData";
import SectionTemplate from "../components/sections/SectionTemplate";

const CategoryCard = styled(Card)(({ theme }) => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: theme.shadows[4],
    },
}));

const TermCard = styled(Card)(({ theme, isActive }) => ({
    marginBottom: theme.spacing(2),
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    borderLeft: isActive ? `4px solid ${theme.palette.primary.main}` : "none",
    "&:hover": {
        transform: "translateX(5px)",
        boxShadow: theme.shadows[3],
    },
}));

const CategoryChip = styled(Chip)(({ theme, category }) => {
    const colors = {
        "Sexual Orientation": theme.palette.secondary.main,
        "Romantic Orientation": theme.palette.error.main,
        "Gender Identity": theme.palette.success.main,
        "Biological Sex": theme.palette.info.main,
        "Umbrella Term": theme.palette.warning.main,
    };

    return {
        backgroundColor: colors[category] || theme.palette.primary.main,
        color: theme.palette.common.white,
        fontWeight: 500,
    };
});

// Navigation button at the bottom of each section
const NavigationButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(3),
    alignSelf: 'flex-end',
}));

// Card footer with navigation
const CardFooter = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    paddingTop: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(3),
}));

const IdentityPage = () => {
    const theme = useTheme();
    const [currentTab, setCurrentTab] = useState(0);
    const [selectedTerm, setSelectedTerm] = useState(null);
    const title = identitiesData?.introduction?.title;
    const description = identitiesData?.introduction?.description;
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Open the drawer when selectedTerm changes on mobile
    useEffect(() => {
        if (isMobile && selectedTerm) {
            setDrawerOpen(true);
        }
    }, [selectedTerm, isMobile]);

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const content = (
        <>
            <Typography variant="h4" gutterBottom>
                {selectedTerm?.term}
            </Typography>
            <Chip
                label={selectedTerm?.category}
                size="medium"
                sx={{ mb: 3 }}
            />
            <Typography variant="body1" paragraph>
                {selectedTerm?.definition}
            </Typography>
        </>
    );

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    const handleTermSelect = (term) => {
        setSelectedTerm(term);
    };

    const filterIdentities = () => {
        if (currentTab === 0) return identitiesData.identities;
        const category = identitiesData.categories[currentTab - 1].name;
        return identitiesData.identities.filter((item) => item.category === category);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Container maxWidth="lg">
                <Box sx={{ mb: 6 }}>
                    <SectionHeader
                        title={title}
                        subtitle={description}
                    />
                </Box>

                {/* TERMINOLOGY SECTION - Now at the top */}
                <Box sx={{ mb: 6 }}>
                    <SectionHeader
                        title="LGBTQAI+ Terminology"
                        subtitle="Understanding the diverse terminology used within the community"
                    />

                    <Paper sx={{ mb: 4 }}>
                        <Tabs
                            value={currentTab}
                            onChange={handleTabChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            indicatorColor="primary"
                            textColor="primary"
                            sx={{ borderBottom: 1, borderColor: "divider" }}
                        >
                            <Tab label="All Terms" />
                            {identitiesData.categories.map((category) => (
                                <Tab key={category.name} label={category.name} />
                            ))}
                        </Tabs>
                    </Paper>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={5}>
                            <Typography variant="h6" gutterBottom>
                                Terminology
                            </Typography>
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {filterIdentities().map((item) => (
                                    <motion.div key={item.term} variants={itemVariants}>
                                        <TermCard
                                            isActive={selectedTerm?.term === item.term}
                                            onClick={() => handleTermSelect(item)}
                                        >
                                            <CardContent sx={{ pb: "16px !important" }}>
                                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                                                    <Typography variant="h6">{item.term}</Typography>
                                                    <CategoryChip
                                                        label={item.category}
                                                        category={item.category}
                                                        size="small"
                                                    />
                                                </Box>
                                            </CardContent>
                                        </TermCard>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </Grid>

                        <Grid item xs={12} md={7}>
                            {isMobile ? (
                                <>
                                    <SwipeableDrawer
                                        anchor="right"
                                        open={drawerOpen}
                                        onClose={toggleDrawer(false)}
                                        onOpen={toggleDrawer(true)}
                                    >
                                        <Box
                                            sx={{
                                                width: '80vw',
                                                p: 3,
                                                bgcolor: 'background.paper',
                                            }}
                                        >
                                            {selectedTerm ? content : (
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        height: '100%',
                                                        p: 4,
                                                    }}
                                                >
                                                    <InfoIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                                                    <Typography variant="h6" color="text.secondary" align="center">
                                                        Select a term from the list to view its definition
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Box>
                                    </SwipeableDrawer>
                                </>
                            ) : (
                                <Paper
                                    sx={{
                                        p: 3,
                                        height: '100%',
                                        position: 'sticky',
                                        top: 20,
                                        bgcolor: 'background.paper',
                                    }}
                                >
                                    {selectedTerm ? content : (
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                height: '100%',
                                                p: 4,
                                            }}
                                        >
                                            <InfoIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                                            <Typography variant="h6" color="text.secondary" align="center">
                                                Select a term from the list to view its definition
                                            </Typography>
                                        </Box>
                                    )}
                                </Paper>
                            )}
                        </Grid>
                    </Grid>
                </Box>

                {/* IDENTITY CATEGORIES SECTION */}
                <Box sx={{ mb: 6 }}>
                    <SectionHeader
                        title="Identity Categories"
                        subtitle="Explore different aspects of human identity and diversity"
                    />

                    <Grid container spacing={3}>
                        {identitiesData.categories.map((category, index) => (
                            <Grid item xs={12} sm={6} md={4} key={category.name}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <CategoryCard>
                                        <CardContent>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    mb: 2,
                                                }}
                                            >
                                                <CategoryIcon>
                                                    <CategoryIcon />
                                                </CategoryIcon>
                                                <Typography variant="h6" component="h3" sx={{ ml: 2 }}>
                                                    {category.name}
                                                </Typography>
                                            </Box>
                                            <Typography variant="body2" color="text.secondary" paragraph>
                                                {category.description}
                                            </Typography>
                                            <Divider sx={{ my: 2 }} />
                                            <Typography variant="subtitle2" gutterBottom>
                                                Examples:
                                            </Typography>
                                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                                {category.examples.map((example) => (
                                                    <Chip
                                                        key={example}
                                                        label={example}
                                                        size="small"
                                                        color="primary"
                                                        variant="outlined"
                                                    />
                                                ))}
                                            </Box>
                                        </CardContent>
                                    </CategoryCard>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* INTRODUCTION SECTIONS */}
                <Box sx={{ mb: 6 }}>
                    <Grid container spacing={4}>
                        {identitiesData.sections.map((section, index) => (
                            <Grid item xs={12} md={6} key={section.id}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.2 }}
                                >
                                    <Card sx={{ height: "100%" }}>
                                        <CardContent>
                                            <Typography variant="h5" component="h3" gutterBottom>
                                                {section.title}
                                            </Typography>
                                            <Typography variant="body1" paragraph>
                                                {section.description}
                                            </Typography>
                                            <Paper
                                                elevation={0}
                                                sx={{
                                                    p: 2,
                                                    bgcolor: "background.default",
                                                    borderLeft: `4px solid ${theme.palette.primary.main}`,
                                                }}
                                            >
                                                <Typography variant="body2" color="text.secondary">
                                                    <strong>Note:</strong> {section.note}
                                                </Typography>
                                            </Paper>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* CLOSING BANNER */}
                <Box
                    sx={{
                        py: 8,
                        px: 4,
                        textAlign: "center",
                        background: theme.palette.background.gradient || theme.palette.background.default,
                        borderRadius: theme.shape.borderRadius,
                        mb: 4,
                    }}
                >
                    <Container maxWidth="md">
                        <Typography variant="h3" component="h2" gutterBottom>
                            Identity is a Journey
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ mb: 4, maxWidth: "800px", mx: "auto" }}
                        >
                            Understanding sexual orientation and gender identity is an ongoing process.
                            These concepts can evolve over time, both for individuals and for society.
                            Approach these topics with an open mind and a commitment to learning.
                        </Typography>
                    </Container>
                </Box>

                {/* Navigation to Next Section */}
                <Card sx={{ mb: 6 }}>
                    <CardContent>
                        <CardFooter>
                            <NavigationButton
                                variant="contained"
                                color="primary"
                                component={RouterLink}
                                to="/legal"
                                endIcon={<ArrowForwardIcon />}
                            >
                                Next: Legal Landscape
                            </NavigationButton>
                        </CardFooter>
                    </CardContent>
                </Card>
            </Container>
        </motion.div>



    );

   
       
      
};

export default IdentityPage;