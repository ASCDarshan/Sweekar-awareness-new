import React from "react";
import { Button, styled } from "@mui/material";

const StyledButton = styled(Button)(() => ({
  position: "relative",
  overflow: "hidden",
  zIndex: 1,

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    zIndex: -1,
    transition: "opacity 0.3s ease",
  },

  "&:hover::before": {
    opacity: 1,
  },
}));

const RainbowButton = ({
  children,
  color = "primary",
  variant = "contained",
  ...props
}) => {
  return (
    <StyledButton color={color} variant={variant} {...props}>
      {children}
    </StyledButton>
  );
};

export default RainbowButton;
