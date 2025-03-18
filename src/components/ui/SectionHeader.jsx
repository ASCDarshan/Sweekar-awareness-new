import React from "react";
import { Box, Typography, Divider, styled } from "@mui/material";
import { motion } from "framer-motion";

const HeaderContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  textAlign: "center",
}));

const Title = styled(motion(Typography))(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(1),
  position: "relative",
  display: "inline-block",
  "&:after": {
    content: '""',
    position: "absolute",
    width: "50%",
    height: "4px",
    bottom: "-8px",
    left: "25%",
    borderRadius: "2px",
  },
}));

const Subtitle = styled(motion(Typography))(({ theme }) => ({
  maxWidth: "800px",
  margin: "0 auto",
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(3),
  color: theme.palette.text.secondary,
}));

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const subtitleVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, delay: 0.2 },
  },
};

const SectionHeader = ({ title, subtitle, align = "center", ...props }) => {
  return (
    <HeaderContainer {...props} sx={{ textAlign: align }}>
      <Title
        variant="h2"
        component={motion.h2}
        initial="hidden"
        animate="visible"
        variants={titleVariants}
      >
        {title}
      </Title>

      {subtitle && (
        <Subtitle
          variant="body1"
          component={motion.p}
          initial="hidden"
          animate="visible"
          variants={subtitleVariants}
        >
          {subtitle}
        </Subtitle>
      )}
    </HeaderContainer>
  );
};

export default SectionHeader;
