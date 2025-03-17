import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Divider,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";

import RainbowButton from "../components/ui/RainbowButton";
import SectionHeader from "../components/ui/SectionHeader";
import AnimatedCard from "../components/ui/AnimatedCard";
import ProgressIndicator from "../components/ui/ProgressIndicator";
import { useProgress } from "../contexts/ProgressContext";

const HeroSection = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(10, 2),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(6),
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "30%",
    background: `linear-gradient(to bottom, transparent, ${theme.palette.primary.dark})`,
    zIndex: 1,
  },
}));

const StatCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(3),
  textAlign: "center",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[4],
  },
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: theme.palette.background.paper,
  marginBottom: theme.spacing(2),
  "& svg": {
    fontSize: 30,
    color: theme.palette.primary.main,
  },
}));

const HomePage = () => {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection>
        <Container maxWidth="md">
          <Typography
            component={motion.h1}
            variant="h2"
            gutterBottom
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Understanding LGBTQAI+ Identities in India
          </Typography>

          <Typography
            component={motion.p}
            variant="h5"
            sx={{ mb: 4, maxWidth: "800px", mx: "auto" }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            An educational journey to build awareness, empathy, and
            understanding of the LGBTQAI+ community in India
          </Typography>

          <Box
            component={motion.div}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <RainbowButton
              component={RouterLink}
              to="/introduction"
              size="large"
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{ px: 4, py: 1.5 }}
            >
              Start Learning
            </RainbowButton>
          </Box>
        </Container>
      </HeroSection>

      <Box sx={{ mb: 6 }}>
        <SectionHeader
          title="Learn Through Our Comprehensive Guide"
          subtitle="Our tutorial provides a multi-faceted approach to understanding LGBTQAI+ issues in India."
        />

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <StatCard>
              <FeatureIcon>
                <MenuBookIcon />
              </FeatureIcon>
              <Typography variant="h5" component="h3" gutterBottom>
                Educational Content
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Comprehensive information about the history, legal landscape,
                and social context of LGBTQAI+ issues in India.
              </Typography>
            </StatCard>
          </Grid>

          <Grid item xs={12} md={4}>
            <StatCard>
              <FeatureIcon>
                <PeopleAltIcon />
              </FeatureIcon>
              <Typography variant="h5" component="h3" gutterBottom>
                Understanding Identities
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Learn about different sexual orientations, gender identities,
                and the spectrum of human diversity.
              </Typography>
            </StatCard>
          </Grid>

          <Grid item xs={12} md={4}>
            <StatCard>
              <FeatureIcon>
                <EmojiObjectsIcon />
              </FeatureIcon>
              <Typography variant="h5" component="h3" gutterBottom>
                Practical Resources
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Access to support organizations, helplines, and resources to
                help create more inclusive communities.
              </Typography>
            </StatCard>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          py: 8,
          px: 4,
          textAlign: "center",
          background: theme.palette.background.gradient,
          borderRadius: theme.shape.borderRadius,
          mb: 4,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" gutterBottom>
            Start Your Journey Towards Understanding
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 4, maxWidth: "800px", mx: "auto" }}
          >
            Education is the first step towards creating an inclusive society
            where everyone can live with dignity and respect. Begin your
            learning journey today and become an ally for the LGBTQAI+
            community.
          </Typography>
          <RainbowButton
            component={RouterLink}
            to="/introduction"
            size="large"
            variant="contained"
            endIcon={<ArrowForwardIcon />}
          >
            Begin Tutorial
          </RainbowButton>
        </Container>
      </Box>
    </motion.div>
  );
};

export default HomePage;
