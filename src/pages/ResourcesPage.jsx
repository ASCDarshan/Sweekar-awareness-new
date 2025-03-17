import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Tabs,
  Tab,
  Paper,
  TextField,
  InputAdornment,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LanguageIcon from "@mui/icons-material/Language";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GavelIcon from "@mui/icons-material/Gavel";
import SupportIcon from "@mui/icons-material/Support";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link as RouterLink } from "react-router-dom";

import SectionHeader from "../components/ui/SectionHeader";
import ResourceCard from "../components/tutorial/ResourceCard";
import { resourcesData } from "../data";
import { useProgress } from "../contexts/ProgressContext";

const TabPanel = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 0),
}));

const SearchField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.shape.borderRadius * 2,
  },
}));

const IntroBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
}));

const ResourcesPage = () => {
  const [tab, setTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const { markPageAsVisited } = useProgress();

  useEffect(() => {
    markPageAsVisited("/resources");
  }, []);

  const {
    organizations,
    helplines,
    online_resources,
    educational_resources,
    legal_support,
  } = resourcesData;

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const filterResources = (resources) => {
    if (!searchTerm) return resources;

    const term = searchTerm.toLowerCase();

    return resources.filter(
      (resource) =>
        resource.name.toLowerCase().includes(term) ||
        resource.description.toLowerCase().includes(term) ||
        (resource.location && resource.location.toLowerCase().includes(term)) ||
        (resource.services &&
          resource.services.some((service) =>
            service.toLowerCase().includes(term)
          ))
    );
  };

  const getCurrentResources = () => {
    switch (tab) {
      case 0:
        return filterResources(organizations);
      case 1:
        return filterResources(helplines);
      case 2:
        return filterResources(online_resources);
      case 3:
        return filterResources(educational_resources);
      case 4:
        return filterResources(legal_support);
      default:
        return [];
    }
  };

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


  const currentResources = getCurrentResources();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SectionHeader
        title="Resources & Support Services"
        subtitle="Find support organizations, helplines, and resources for the LGBTQAI+ community in India"
      />

      <IntroBox>
        <Typography variant="body1" paragraph>
          Access to support services, community organizations, and reliable
          information is crucial for LGBTQAI+ individuals. Below you'll find a
          comprehensive list of resources available across India. These
          organizations and services can provide assistance, community
          connection, and valuable information.
        </Typography>
        <Typography variant="body1">
          Use the tabs below to navigate between different types of resources,
          and use the search box to find specific resources.
        </Typography>
      </IntroBox>

      <SearchField
        fullWidth
        placeholder="Search resources..."
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Paper>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tab icon={<SupportIcon />} label="Organizations" id="tab-0" />
          <Tab icon={<LocalPhoneIcon />} label="Helplines" id="tab-1" />
          <Tab icon={<LanguageIcon />} label="Online Resources" id="tab-2" />
          <Tab icon={<MenuBookIcon />} label="Educational" id="tab-3" />
          <Tab icon={<GavelIcon />} label="Legal Support" id="tab-4" />
        </Tabs>

        <TabPanel>
          {currentResources.length === 0 ? (
            <Typography
              variant="body1"
              color="text.secondary"
              align="center"
              sx={{ py: 4 }}
            >
              No resources found matching your search.
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {currentResources.map((resource, index) => (
                <Grid item xs={12} key={resource.name + index}>
                  <ResourceCard
                    resource={resource}
                    type={
                      tab === 0
                        ? "organization"
                        : tab === 1
                          ? "helpline"
                          : tab === 2
                            ? "online"
                            : tab === 3
                              ? "educational"
                              : "legal"
                    }
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </TabPanel>
      </Paper>

      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Note: The information provided may change over time. Always verify
          contact details before reaching out to any organization.
        </Typography>
      </Box>

      <Card sx={{ mb: 6 }}>
        <CardContent>
          <CardFooter sx={{ display: "flex", justifyContent: "space-between" }}>

            <NavigationButton
              variant="outlined"
              color="primary"
              component={RouterLink}
              to="/challenges"
              startIcon={<ArrowBackIcon />}
            >
              Previous
            </NavigationButton>

            <NavigationButton
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/social"
              endIcon={<ArrowForwardIcon />}
            >
              Next: Social
            </NavigationButton>
          </CardFooter>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ResourcesPage;
