import React from "react";
import { Box, Card, CardContent, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const NavigationButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

const CardFooter = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  paddingTop: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  marginTop: theme.spacing(2),
}));

/**
 * A simple component that provides a "Next" button to navigate to the next section
 * This is for pages that don't use the SectionTemplate component
 *
 * @param {Object} props - Component props
 * @param {Object} props.nextSection - Next section details {path, label}
 * @returns {JSX.Element} - Navigation button component
 */
const NextSectionNavigation = ({ nextSection }) => {
  if (!nextSection) return null;

  return (
    <Card sx={{ mb: 6 }}>
      <CardContent>
        <CardFooter>
          <NavigationButton
            variant="contained"
            color="primary"
            component={RouterLink}
            to={nextSection.path}
            endIcon={<ArrowForwardIcon />}
          >
            Next: {nextSection.label}
          </NavigationButton>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default NextSectionNavigation;
