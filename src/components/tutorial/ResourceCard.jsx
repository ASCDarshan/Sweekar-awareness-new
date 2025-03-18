import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Collapse,
  IconButton,
  Link,
  Divider,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const ResourceCardContainer = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  overflow: "visible",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[3],
  },
}));

const CardHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const ServiceChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: theme.palette.background.card,
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },
}));

const ExpandButton = styled(IconButton)(({ expanded }) => ({
  transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
  transition: "transform 0.2s",
}));

const ContactItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(1),
  "& svg": {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
  },
}));

const ResourceCard = ({ resource, type = "organization" }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <ResourceCardContainer>
      <CardHeader>
        <Box>
          <Typography variant="h6" component="h3">
            {resource.name}
          </Typography>
          {resource.location && (
            <Typography variant="body2" color="text.secondary">
              <LocationOnIcon
                fontSize="small"
                sx={{ verticalAlign: "middle", mr: 0.5 }}
              />
              {resource.location}
            </Typography>
          )}
        </Box>
        <ExpandButton
          onClick={handleExpandClick}
          expanded={expanded ? 1 : 0}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandButton>
      </CardHeader>

      <Divider />

      <CardContent>
        <Typography variant="body2" paragraph>
          {resource.description}
        </Typography>

        {type === "organization" && resource.services && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Services:
            </Typography>
            <Box>
              {resource.services.map((service, index) => (
                <ServiceChip key={index} label={service} size="small" />
              ))}
            </Box>
          </Box>
        )}

        {type === "helpline" && resource.hours && (
          <ContactItem>
            <AccessTimeIcon fontSize="small" />
            <Typography variant="body2">{resource.hours}</Typography>
          </ContactItem>
        )}

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box sx={{ mt: 2 }}>
            <Divider sx={{ mb: 2 }} />

            <Typography variant="subtitle2" gutterBottom>
              Contact Information:
            </Typography>

            {resource.contact && (
              <>
                {resource.contact.phone && (
                  <ContactItem>
                    <LocalPhoneIcon fontSize="small" />
                    <Typography variant="body2">
                      {resource.contact.phone}
                    </Typography>
                  </ContactItem>
                )}

                {resource.contact.email && (
                  <ContactItem>
                    <EmailIcon fontSize="small" />
                    <Typography variant="body2">
                      <Link
                        href={`mailto:${resource.contact.email}`}
                        color="inherit"
                      >
                        {resource.contact.email}
                      </Link>
                    </Typography>
                  </ContactItem>
                )}

                {resource.contact.website && (
                  <ContactItem>
                    <LanguageIcon fontSize="small" />
                    <Typography variant="body2">
                      <Link
                        href={resource.contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="inherit"
                      >
                        Visit Website
                      </Link>
                    </Typography>
                  </ContactItem>
                )}

                {type === "helpline" && resource.contact && (
                  <ContactItem>
                    <LocalPhoneIcon fontSize="small" />
                    <Typography variant="body2">{resource.contact}</Typography>
                  </ContactItem>
                )}

                {type === "online" && resource.website && (
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<LanguageIcon />}
                    href={resource.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Visit Resource
                  </Button>
                )}
              </>
            )}
          </Box>
        </Collapse>
      </CardContent>
    </ResourceCardContainer>
  );
};

export default ResourceCard;
