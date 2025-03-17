import React from 'react';
import {
  Box, Typography, Paper, Grid, Card, CardContent,
  Button, Divider, List, ListItem, ListItemIcon, ListItemText
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import SectionHeader from '../components/ui/SectionHeader';

const ContentPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
}));

const Rainbow = styled(Box)(({ theme }) => ({
  height: 6,
  width: '100%',
  background: theme.rainbowTheme.gradients?.rainbow,
  borderRadius: 3,
  marginBottom: theme.spacing(3),
}));

const LearningObjectiveCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[3],
  },
}));

const IntroductionPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SectionHeader
        title="Welcome to the LGBTQAI+ Awareness Tutorial"
        subtitle="An educational journey to understand and support the LGBTQAI+ community in India"
      />

      <ContentPaper elevation={1}>
        <Rainbow />
        <Typography variant="h4" gutterBottom>
          About This Tutorial
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to our comprehensive tutorial on LGBTQAI+ awareness in the Indian context. This educational resource aims to provide a deeper understanding of the diverse spectrum of sexual orientations and gender identities, the historical and legal context in India, and the social challenges and progress made by the community.
        </Typography>
        <Typography variant="body1" paragraph>
          Whether you're here to educate yourself, support a loved one, or become a better ally, this tutorial offers structured, evidence-based information to help you on your journey. By the end, you'll have a more nuanced understanding of LGBTQAI+ experiences in India and how you can contribute to creating a more inclusive society.
        </Typography>
        <Typography variant="body1" paragraph>
          The content is organized into several sections, each focusing on different aspects of LGBTQAI+ awareness. You can progress through them sequentially or jump to specific topics of interest. Your progress will be tracked, allowing you to continue where you left off.
        </Typography>
      </ContentPaper>

      <SectionHeader
        title="Learning Objectives"
        subtitle="By completing this tutorial, you will:"
      />

      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} sm={6} md={4}>
          <LearningObjectiveCard>
            <CardContent>
              <Typography variant="h6" component="h3" gutterBottom>
                Understand Terminology
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Learn the diverse spectrum of sexual orientations and gender identities, and understand the appropriate terminology to use.
              </Typography>
            </CardContent>
          </LearningObjectiveCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <LearningObjectiveCard>
            <CardContent>
              <Typography variant="h6" component="h3" gutterBottom>
                Recognize Historical Context
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Discover the historical perspectives on gender and sexuality in ancient India, the impact of colonialism, and the journey toward legal recognition.
              </Typography>
            </CardContent>
          </LearningObjectiveCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <LearningObjectiveCard>
            <CardContent>
              <Typography variant="h6" component="h3" gutterBottom>
                Appreciate Legal Landscape
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Learn about landmark court cases, current legal challenges, and the rights of LGBTQAI+ individuals in India.
              </Typography>
            </CardContent>
          </LearningObjectiveCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <LearningObjectiveCard>
            <CardContent>
              <Typography variant="h6" component="h3" gutterBottom>
                Identify Social Challenges
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Understand the social stigma, discrimination, mental health challenges, and other issues faced by the LGBTQAI+ community in India.
              </Typography>
            </CardContent>
          </LearningObjectiveCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <LearningObjectiveCard>
            <CardContent>
              <Typography variant="h6" component="h3" gutterBottom>
                Recognize Progress
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Acknowledge the visibility, representation, and positive developments for the LGBTQAI+ community in recent years.
              </Typography>
            </CardContent>
          </LearningObjectiveCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <LearningObjectiveCard>
            <CardContent>
              <Typography variant="h6" component="h3" gutterBottom>
                Access Resources
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Discover support organizations, helplines, and resources available for the LGBTQAI+ community and allies in India.
              </Typography>
            </CardContent>
          </LearningObjectiveCard>
        </Grid>
      </Grid>

      <ContentPaper elevation={1}>
        <Typography variant="h4" gutterBottom>
          How to Use This Tutorial
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Navigate through sections"
              secondary="Use the navigation menu to move between different topics or follow the suggested sequence."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Track your progress"
              secondary="The app automatically tracks which sections you've completed."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Take your time"
              secondary="There's no rush - learn at your own pace and revisit sections as needed."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Reflect on the content"
              secondary="Take time to think about what you've learned and how it might apply to your life or community."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Explore resources"
              secondary="Check out the resources section for additional support and information."
            />
          </ListItem>
        </List>
      </ContentPaper>

      <Box sx={{ textAlign: 'center', mt: 4, mb: 8 }}>
        <Typography variant="h5" gutterBottom>
          Ready to start your learning journey?
        </Typography>
        <Button
          onClick={() => navigate("/history")}
          variant="contained"
          color="primary"
          size="large"
          endIcon={<ArrowForwardIcon />}
          sx={{ mt: 2 }}
        >
          Begin with Historical Context
        </Button>
      </Box>
    </motion.div>
  );
};

export default IntroductionPage;