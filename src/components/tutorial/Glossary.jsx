import React, { useState, useEffect } from 'react';
import {
  Box, Typography, TextField, InputAdornment, Card, CardContent,
  Tabs, Tab, Chip, Divider, Accordion, AccordionSummary,
  AccordionDetails, useTheme, alpha
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion, AnimatePresence } from 'framer-motion';

const GlossaryContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const SearchField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius * 2,
    '&.Mui-focused': {
      boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.25)}`,
    },
  },
}));

const CategoryChip = styled(Chip)(({ theme, active }) => ({
  margin: theme.spacing(0.5),
  fontWeight: active ? 600 : 400,
  backgroundColor: active ? theme.palette.primary.main : theme.palette.background.card,
  color: active ? theme.palette.primary.contrastText : theme.palette.text.primary,
  '&:hover': {
    backgroundColor: active ? theme.palette.primary.dark : theme.palette.background.default,
  },
}));

const AlphabetTab = styled(Tab)(({ theme }) => ({
  minWidth: 40,
  fontWeight: 600,
}));

const TermCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  overflow: 'visible',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[3],
  },
}));

const TermAccordion = styled(Accordion)(({ theme }) => ({
  boxShadow: 'none',
  '&:before': {
    display: 'none',
  },
  '&.Mui-expanded': {
    margin: 0,
  },
}));

const CategoryList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  marginBottom: theme.spacing(3),
  marginTop: theme.spacing(1),
}));

const Glossary = ({ terms }) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLetter, setSelectedLetter] = useState('all');
  const [filteredTerms, setFilteredTerms] = useState([]);

  const categories = ['all', ...new Set(terms.map(term => term.category))];

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  useEffect(() => {
    let results = [...terms];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(term =>
        term.term.toLowerCase().includes(query) ||
        term.definition.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== 'all') {
      results = results.filter(term => term.category === selectedCategory);
    }

    if (selectedLetter !== 'all') {
      results = results.filter(term =>
        term.term.charAt(0).toUpperCase() === selectedLetter
      );
    }

    results.sort((a, b) => a.term.localeCompare(b.term));

    setFilteredTerms(results);
  }, [searchQuery, selectedCategory, selectedLetter, terms]);

  const groupedTerms = filteredTerms.reduce((acc, term) => {
    const firstLetter = term.term.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(term);
    return acc;
  }, {});

  const handleLetterChange = (event, newValue) => {
    setSelectedLetter(newValue);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <GlossaryContainer>
      <SearchField
        fullWidth
        placeholder="Search terms..."
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <CategoryList>
        {categories.map(category => (
          <CategoryChip
            key={category}
            label={category === 'all' ? 'All Categories' : category}
            active={selectedCategory === category ? 1 : 0}
            onClick={() => handleCategoryChange(category)}
            clickable
          />
        ))}
      </CategoryList>

      <Tabs
        value={selectedLetter}
        onChange={handleLetterChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 3 }}
      >
        <AlphabetTab label="All" value="all" />
        {alphabet.map(letter => (
          <AlphabetTab
            key={letter}
            label={letter}
            value={letter}
            disabled={!Object.keys(groupedTerms).includes(letter)}
          />
        ))}
      </Tabs>

      {filteredTerms.length === 0 ? (
        <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 4 }}>
          No terms found matching your filters.
        </Typography>
      ) : (
        <AnimatePresence>
          {Object.entries(groupedTerms).map(([letter, letterTerms]) => (
            <motion.div
              key={letter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Typography
                variant="h6"
                sx={{
                  mb: 1,
                  mt: 3,
                  color: theme.palette.primary.main,
                  borderBottom: `2px solid ${theme.palette.primary.light}`,
                  pb: 0.5,
                  display: 'inline-block'
                }}
              >
                {letter}
              </Typography>

              {letterTerms.map((term, index) => (
                <TermCard key={`${term.term}-${index}`}>
                  <TermAccordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel-${index}-content`}
                      id={`panel-${index}-header`}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        <Typography variant="h6">{term.term}</Typography>
                        <Chip
                          label={term.category}
                          size="small"
                          sx={{ ml: 'auto', mr: 2 }}
                        />
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body1">{term.definition}</Typography>
                    </AccordionDetails>
                  </TermAccordion>
                </TermCard>
              ))}
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </GlossaryContainer>
  );
};

export default Glossary;