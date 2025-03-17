import React from 'react';
import { Box, Container, Typography, Link, Grid, IconButton, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link as RouterLink } from 'react-router-dom';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.card,
  padding: theme.spacing(6, 0),
  marginTop: 'auto',
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  '&:hover': {
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  '&:hover': {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,
  },
}));

const Footer = () => {
  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              LGBTQAI+ Awareness
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Understanding, empathy, and education for a more inclusive society.
            </Typography>
            <Box sx={{ mt: 2, mb: 2 }}>
              <SocialButton aria-label="facebook">
                <FacebookIcon />
              </SocialButton>
              <SocialButton aria-label="twitter">
                <TwitterIcon />
              </SocialButton>
              <SocialButton aria-label="instagram">
                <InstagramIcon />
              </SocialButton>
              <SocialButton aria-label="linkedin">
                <LinkedInIcon />
              </SocialButton>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Learn
            </Typography>
            <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none' }}>
              <Box component="li" sx={{ mb: 1 }}>
                <FooterLink component={RouterLink} to="/history">Historical Context</FooterLink>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <FooterLink component={RouterLink} to="/identities">Sexual Orientation & Gender</FooterLink>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <FooterLink component={RouterLink} to="/legal">Legal Landscape</FooterLink>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <FooterLink component={RouterLink} to="/challenges">Challenges</FooterLink>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Resources
            </Typography>
            <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none' }}>
              <Box component="li" sx={{ mb: 1 }}>
                <FooterLink component={RouterLink} to="/resources">Support Organizations</FooterLink>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <FooterLink component={RouterLink} to="/resources#helplines">Helplines</FooterLink>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <FooterLink component={RouterLink} to="/resources#online">Online Resources</FooterLink>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <FooterLink component={RouterLink} to="/resources#legal">Legal Support</FooterLink>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              About
            </Typography>
            <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none' }}>
              <Box component="li" sx={{ mb: 1 }}>
                <FooterLink component={RouterLink} to="/about">About Us</FooterLink>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <FooterLink component={RouterLink} to="/contact">Contact</FooterLink>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <FooterLink component={RouterLink} to="/privacy">Privacy Policy</FooterLink>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <FooterLink component={RouterLink} to="/terms">Terms of Use</FooterLink>
              </Box>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ mt: 4, mb: 4 }} />
        
        <Box textAlign="center">
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} LGBTQAI+ Awareness Tutorial. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Made with ❤️ for diversity and inclusion.
          </Typography>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer;