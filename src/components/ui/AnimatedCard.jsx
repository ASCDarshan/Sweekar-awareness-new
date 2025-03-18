import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  Box,
  styled,
} from "@mui/material";
import { motion } from "framer-motion";

const MotionCard = styled(motion(Card))(() => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 14px 28px rgba(0,0,0,0.15), 0 10px 10px rgba(0,0,0,0.10)",
  },
}));

const CardBadge = styled(Box)(({ theme, status }) => ({
  position: "absolute",
  top: 16,
  right: 16,
  padding: "4px 12px",
  borderRadius: 16,
  fontSize: "0.75rem",
  fontWeight: 600,
  zIndex: 1,
  ...(status === "completed" && {
    backgroundColor: theme.palette.tertiary.main,
    color: theme.palette.tertiary.contrastText,
  }),
  ...(status === "locked" && {
    backgroundColor: theme.palette.text.disabled,
    color: theme.palette.background.paper,
  }),
}));

const ProgressBar = styled(Box)(({ progress }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  height: 4,
  width: `${progress}%`,
  transition: "width 0.5s ease-in-out",
}));

const CardOverlay = styled(Box)(({ locked }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: locked ? "flex" : "none",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1,
}));

const AnimatedCard = ({
  title,
  description,
  image,
  onClick,
  progress = 0,
  completed = false,
  locked = false,
  badge = null,
  ...props
}) => {
  return (
    <MotionCard
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
      {...props}
    >
      <CardActionArea
        onClick={onClick}
        disabled={locked}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        {badge && (
          <CardBadge
            status={completed ? "completed" : locked ? "locked" : null}
          >
            {badge}
          </CardBadge>
        )}

        <Box sx={{ position: "relative" }}>
          <CardOverlay locked={locked}>
            <Typography variant="body1" color="white" fontWeight={600}>
              Complete previous sections to unlock
            </Typography>
          </CardOverlay>

          {image && (
            <CardMedia
              component="img"
              height="140"
              image={image}
              alt={title}
              sx={{ filter: locked ? "grayscale(100%)" : "none" }}
            />
          )}

          <ProgressBar progress={progress} />
        </Box>

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </MotionCard>
  );
};

export default AnimatedCard;
