import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Container,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Chip,
  useTheme,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Button,
  Tabs,
  Tab,
  alpha,
  useMediaQuery,
  Stack,
  Fade,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ClearIcon from "@mui/icons-material/Clear";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import { glossaryTerms } from "../data/glossaryData";
import SectionHeader from "../components/ui/SectionHeader";
import SectionTemplate from "../components/sections/SectionTemplate";
import { useProgress } from "../contexts/ProgressContext";


// Extract all unique categories
const categories = ["All", ...new Set(glossaryTerms.map((term) => term.category))];

const CategoryChip = styled(Chip)(({ theme, categoryname }) => {
  const colorMap = {
    "Sexual Orientation": theme.palette.primary.main,
    "Romantic Orientation": theme.palette.secondary.main,
    "Gender Identity": theme.palette.success.main,
    "Gender Concept": theme.palette.info.main,
    "Biological Sex": theme.palette.warning.main,
    "Legal Term": theme.palette.error.main,
    "Social Term": theme.palette.purple?.main || "#9c27b0",
    "Medical Term": theme.palette.teal?.main || "#009688",
    "Umbrella Term": theme.palette.orange?.main || "#ff9800",
  };

  return {
    backgroundColor: colorMap[categoryname] || theme.palette.grey[700],
    color: "#fff",
    fontWeight: 500,
    "& .MuiChip-label": {
      padding: "0 10px",
    },
  };
});

const TermCard = styled(Card)(({ theme, active }) => ({
  marginBottom: theme.spacing(2),
  transition: "all 0.3s ease",
  cursor: "pointer",
  borderLeft: active ? `4px solid ${theme.palette.primary.main}` : "4px solid transparent",
  "&:hover": {
    transform: "translateX(5px)",
    boxShadow: theme.shadows[3],
  },
}));

const AlphabetButton = styled(Button)(({ theme, active }) => ({
  minWidth: "36px",
  height: "36px",
  padding: 0,
  borderRadius: "50%",
  margin: "2px",
  fontWeight: active ? "bold" : "normal",
  backgroundColor: active ? theme.palette.primary.main : "transparent",
  color: active ? theme.palette.primary.contrastText : theme.palette.text.primary,
  "&:hover": {
    backgroundColor: active ? theme.palette.primary.dark : alpha(theme.palette.primary.main, 0.1),
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  minWidth: "auto",
  padding: theme.spacing(1),
  [theme.breakpoints.up("md")]: {
    minWidth: "120px",
  },
}));

const GlossaryPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLetter, setSelectedLetter] = useState("");
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [copied, setCopied] = useState(false);

  // Generate alphabet for filter
  const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

  // Filter terms based on search, category and alphabet
  const filteredTerms = glossaryTerms.filter((term) => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || term.category === selectedCategory;
    const matchesLetter = selectedLetter === "" || term.term.charAt(0).toUpperCase() === selectedLetter;

    return matchesSearch && matchesCategory && matchesLetter;
  });

  // Group terms by first letter
  const groupedTerms = filteredTerms.reduce((acc, term) => {
    const firstLetter = term.term.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(term);
    return acc;
  }, {});

  // Sort letters alphabetically
  const sortedLetters = Object.keys(groupedTerms).sort();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setSelectedLetter("");
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter === selectedLetter ? "" : letter);
  };

  const handleTermClick = (term) => {
    setSelectedTerm(term);
  };

  const handleCopyDefinition = () => {
    if (selectedTerm) {
      navigator.clipboard.writeText(`${selectedTerm.term}: ${selectedTerm.definition}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Box sx={{ mb: 5 }}>
          <SectionHeader
            title="LGBTQAI+ Glossary"
            subtitle="Understanding terminology is key to respectful and inclusive communication"
          />

          {/* Search and Filter Section */}
          <Paper elevation={0} sx={{ p: 3, mb: 4, bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search terms or definitions..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: searchTerm && (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={handleClearSearch}>
                          <ClearIcon fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
                  <FilterListIcon sx={{ mr: 2, color: "text.secondary" }} />
                  <Tabs
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    indicatorColor="primary"
                    textColor="primary"
                    sx={{
                      '& .MuiTabs-flexContainer': {
                        gap: 1
                      }
                    }}
                  >
                    {categories.map((category) => (
                      <StyledTab
                        key={category}
                        label={category}
                        value={category}
                        wrapped={isMobile}
                      />
                    ))}
                  </Tabs>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* Alphabet Filter */}
          <Paper elevation={0} sx={{ p: 2, mb: 4 }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
              {alphabet.map((letter) => (
                <AlphabetButton
                  key={letter}
                  active={selectedLetter === letter}
                  onClick={() => handleLetterClick(letter)}
                  disableElevation
                  variant={selectedLetter === letter ? "contained" : "text"}
                >
                  {letter}
                </AlphabetButton>
              ))}
            </Box>
          </Paper>
        </Box>

        {/* Main Content */}
        <Grid container spacing={4}>
          {/* Left Side - Terms List */}
          <Grid item xs={12} md={5} lg={4}>
            <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, bgcolor: "background.paper" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                <Typography variant="h6">
                  {filteredTerms.length} {filteredTerms.length === 1 ? "Term" : "Terms"}
                </Typography>
                {selectedLetter && (
                  <Chip
                    label={`Filter: ${selectedLetter}`}
                    size="small"
                    onDelete={() => setSelectedLetter("")}
                    color="primary"
                  />
                )}
              </Box>

              {filteredTerms.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    No terms match your search criteria.
                  </Typography>
                  <Button
                    variant="text"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("All");
                      setSelectedLetter("");
                    }}
                    sx={{ mt: 2 }}
                  >
                    Clear all filters
                  </Button>
                </Box>
              ) : (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {sortedLetters.map((letter) => (
                    <Box key={letter} sx={{ mb: 3 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          mb: 1,
                          pb: 1,
                          borderBottom: `2px solid ${theme.palette.primary.main}`,
                          display: "inline-block"
                        }}
                      >
                        {letter}
                      </Typography>

                      {groupedTerms[letter].map((term) => (
                        <motion.div key={term.term} variants={itemVariants}>
                          <TermCard
                            active={selectedTerm?.term === term.term}
                            onClick={() => handleTermClick(term)}
                          >
                            <CardContent sx={{ py: 2, "&:last-child": { pb: 2 } }}>
                              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Typography variant="h6">{term.term}</Typography>
                                <CategoryChip
                                  label={term.category}
                                  categoryname={term.category}
                                  size="small"
                                />
                              </Box>
                            </CardContent>
                          </TermCard>
                        </motion.div>
                      ))}
                    </Box>
                  ))}
                </motion.div>
              )}
            </Paper>
          </Grid>

          {/* Right Side - Definition */}
          <Grid item xs={12} md={7} lg={8}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, md: 4 },
                height: "100%",
                minHeight: "500px",
                bgcolor: "background.paper",
                display: "flex",
                flexDirection: "column"
              }}
            >
              {selectedTerm ? (
                <Fade in={Boolean(selectedTerm)}>
                  <Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
                      <Box>
                        <Typography variant="h4" gutterBottom>
                          {selectedTerm.term}
                        </Typography>
                        <CategoryChip
                          label={selectedTerm.category}
                          categoryname={selectedTerm.category}
                        />
                      </Box>
                      <IconButton
                        onClick={handleCopyDefinition}
                        color={copied ? "success" : "default"}
                        title="Copy definition"
                      >
                        {copied ? <CheckIcon /> : <ContentCopyIcon />}
                      </IconButton>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
                      {selectedTerm.definition}
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />

                    <Box sx={{ mt: 4, pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
                      <Typography variant="body2" color="text.secondary">
                        Understanding terminology helps create inclusive environments. Use these terms respectfully
                        and remember that individuals may define their identities differently.
                      </Typography>
                    </Box>
                  </Box>
                </Fade>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%"
                  }}
                >
                  <BookmarkIcon sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
                  <Typography variant="h5" color="text.secondary" align="center" gutterBottom>
                    Select a term to view its definition
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center" sx={{ maxWidth: "400px" }}>
                    Browse through the glossary terms on the left to learn more about LGBTQAI+ terminology
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </motion.div>
  );

  return (
    <SectionTemplate
      sectionId="glossary"
      title="LGBTQAI+ Glossary"
      subtitle="Comprehensive guide to terms and definitions"
      introduction={glossaryData.introduction}
      subsections={subsections}
      activeSubsection={activeSubsection}
      prevLink={{ path: "/social", label: "Social Impact" }}
      nextLink={null} // Last page in sequence
      renderCustomSubsections={renderCustomSubsections}
    >
      {renderContent()}
    </SectionTemplate>
  );
};

export default GlossaryPage;