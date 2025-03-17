import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Box, IconButton, Button,
  Drawer, List, ListItem, ListItemIcon, ListItemText,
  useMediaQuery, useTheme, Avatar, LinearProgress,
  BottomNavigation, BottomNavigationAction, Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import GavelIcon from '@mui/icons-material/Gavel';
import PsychologyIcon from '@mui/icons-material/Psychology';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import GroupsIcon from '@mui/icons-material/Groups';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SupportIcon from '@mui/icons-material/Support';
import SchoolIcon from '@mui/icons-material/School';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useProgress } from '../../contexts/ProgressContext';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[1],
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  background: theme.rainbowTheme.gradients?.rainbow,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginRight: theme.spacing(2),
}));

const BrandingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const LogoImage = styled('img')(({ theme }) => ({
  height: 40,
  marginRight: theme.spacing(1),
}));

const NavButton = styled(Button)(({ theme, active }) => ({
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  color: active ? theme.palette.primary.main : theme.palette.text.primary,
  fontWeight: active ? 600 : 500,
  '&:hover': {
    backgroundColor: theme.palette.background.card,
  },
  '&::after': active ? {
    content: '""',
    position: 'absolute',
    bottom: '6px',
    left: '20%',
    width: '60%',
    height: '3px',
    background: theme.rainbowTheme.gradients?.rainbow,
    borderRadius: '4px',
  } : {},
}));

const ProgressIndicator = styled(LinearProgress)(({ theme }) => ({
  height: 4,
  '& .MuiLinearProgress-bar': {
    background: theme.rainbowTheme.gradients?.rainbow,
  },
}));

const BottomNav = styled(BottomNavigation)(({ theme }) => ({
  width: '100%',
  position: 'fixed',
  bottom: 0,
  left: 0,
  zIndex: theme.zIndex.appBar,
  boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
}));

const navigationItems = [
  { text: 'Home', icon: <HomeIcon />, path: '/' },
  { text: 'History', icon: <HistoryEduIcon />, path: '/history' },
  { text: 'Identities', icon: <VisibilityIcon />, path: '/identities' },
  { text: 'Legal', icon: <GavelIcon />, path: '/legal' },
  { text: 'Challenges', icon: <PsychologyIcon />, path: '/challenges' },
  // { text: 'Progress', icon: <SchoolIcon />, path: '/progress' },
  { text: 'Resources', icon: <LibraryBooksIcon />, path: '/resources' },
  { text: 'Social', icon: <GroupsIcon />, path: '/social' },
  { text: 'Glossary', icon: <MenuBookIcon />, path: '/glossary' },
];

const primaryNavItems = navigationItems.slice(0, 4);

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();
  const { getOverallProgress } = useProgress();

  const progress = getOverallProgress();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleBottomNavChange = (event, newValue) => {
    if (newValue === 'more') {
      setDrawerOpen(true);
    } else {
      navigate(newValue);
    }
  };

  const getCurrentBottomNavValue = () => {
    const matchingItem = primaryNavItems.find(item => isActive(item.path));
    return matchingItem ? matchingItem.path : 'more';
  };

  const drawerContent = (
    <Box
      sx={{ width: 280 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LogoImage src="/assets/images/sweekar-logo.png" alt="Sweekar Logo" />
          <Logo variant="h6">LGBTQAI+ Awareness</Logo>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: -0.5 }}>
            By Sweekar
          </Typography>
        </Box>
        <IconButton onClick={toggleDrawer(false)}>
          <CloseIcon />
        </IconButton>
      </Box>

      <List>
        {navigationItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={RouterLink}
            to={item.path}
            selected={isActive(item.path)}
            sx={{
              bgcolor: isActive(item.path) ? 'background.card' : 'transparent',
              borderLeft: isActive(item.path) ? `4px solid ${theme.palette.primary.main}` : 'none',
              pl: isActive(item.path) ? 2 : 3,
            }}
          >
            <ListItemIcon sx={{
              color: isActive(item.path) ? 'primary.main' : 'text.secondary',
              minWidth: 40,
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                color: isActive(item.path) ? 'primary.main' : 'text.primary',
                '& .MuiListItemText-primary': {
                  fontWeight: isActive(item.path) ? 600 : 400,
                }
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <StyledAppBar position="sticky">
        <Toolbar>
          <BrandingContainer component={RouterLink} to="/" sx={{ textDecoration: 'none' }}>
            <LogoImage src="/assets/images/sweekar-logo.png" alt="Sweekar Logo" />
            <Box>
              <Logo variant="h6">LGBTQAI+ Awareness</Logo>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: -0.5 }}>
                By Sweekar
              </Typography>
            </Box>
          </BrandingContainer>

          {!isMobile && (
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
              {navigationItems.map((item) => (
                <NavButton
                  key={item.text}
                  component={RouterLink}
                  to={item.path}
                  active={isActive(item.path) ? 1 : 0}
                  startIcon={item.icon}
                >
                  {item.text}
                </NavButton>
              ))}
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
              {Math.round(progress)}% Complete
            </Typography>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                background: progress >= 100 ? theme.rainbowTheme.gradients?.rainbow : theme.palette.background.card,
                color: theme.palette.text.primary,
                border: `2px solid ${theme.palette.background.paper}`,
                boxShadow: theme.shadows[1],
              }}
            >
              {Math.round(progress)}%
            </Avatar>

            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={toggleDrawer(true)}
                sx={{ ml: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
        <ProgressIndicator variant="determinate" value={progress} />
      </StyledAppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawerContent}
      </Drawer>

      {isMobile && (
        <>
          <Box sx={{ height: '56px' }} />
          <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1100 }} elevation={3}>
            <BottomNav
              value={getCurrentBottomNavValue()}
              onChange={handleBottomNavChange}
              showLabels
            >
              {primaryNavItems.map((item) => (
                <BottomNavigationAction
                  key={item.text}
                  label={item.text}
                  value={item.path}
                  icon={item.icon}
                />
              ))}
              <BottomNavigationAction
                label="More"
                value="more"
                icon={<MoreHorizIcon />}
              />
            </BottomNav>
          </Paper>
        </>
      )}
    </>
  );
};

export default Header;