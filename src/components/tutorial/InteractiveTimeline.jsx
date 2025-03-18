import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  useTheme,
  useMediaQuery,
  Button,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { motion, AnimatePresence } from "framer-motion";

const TimelineContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(2, 0),
  marginBottom: theme.spacing(4),
}));

const TimelineTrack = styled(Box)(({ theme }) => ({
  position: "relative",
  height: 4,
  backgroundColor: theme.palette.background.card,
  borderRadius: 2,
  margin: theme.spacing(4, 0),
}));

const TimelineMarker = styled(Box)(({ theme, active }) => ({
  position: "absolute",
  width: 16,
  height: 16,
  borderRadius: "50%",
  backgroundColor: active
    ? theme.palette.primary.main
    : theme.palette.background.paper,
  border: `2px solid ${active ? theme.palette.primary.main : theme.palette.text.secondary
    }`,
  top: "50%",
  transform: "translate(-50%, -50%)",
  cursor: "pointer",
  transition: "all 0.2s ease",
  zIndex: 2,
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    transform: "translate(-50%, -50%) scale(1.2)",
  },
}));

const YearLabel = styled(Typography)(({ theme, active }) => ({
  position: "absolute",
  bottom: -30,
  transform: "translateX(-50%)",
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  fontWeight: active ? 600 : 400,
  fontSize: active ? "1rem" : "0.875rem",
  transition: "all 0.2s ease",
}));

const NavigationButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },
  zIndex: 5,
}));

const EventCard = styled(motion(Card))(({ theme }) => ({
  marginBottom: theme.spacing(4),
  maxWidth: 600,
  margin: "0 auto",
  overflow: "visible",
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    bottom: -15,
    left: "50%",
    marginLeft: -15,
    borderWidth: 15,
    borderStyle: "solid",
    borderColor: `${theme.palette.background.paper} transparent transparent transparent`,
  },
}));

const CarouselContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  height: 280,
  [theme.breakpoints.down("md")]: {
    height: 320,
  },
}));

const InteractiveTimeline = ({ events, defaultActiveIndex = 0 }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [visibleMarkers, setVisibleMarkers] = useState([]);
  const containerRef = useRef(null);

  const activeEvent = events[activeIndex];

  useEffect(() => {
    if (!containerRef.current) return;

    const markersToShow = isSmallScreen ? 5 : 7;

    const halfMarkersToShow = Math.floor(markersToShow / 2);
    let start = Math.max(0, activeIndex - halfMarkersToShow);
    let end = Math.min(events.length, start + markersToShow);

    if (end === events.length) {
      start = Math.max(0, end - markersToShow);
    }

    setVisibleMarkers(events.slice(start, end));
  }, [activeIndex, events, isSmallScreen]);

  const handleNext = () => {
    if (activeIndex < events.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <TimelineContainer ref={containerRef}>
      <CarouselContainer>
        <AnimatePresence mode="wait">
          <EventCard
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CardContent>
              <Typography variant="overline" color="primary">
                {activeEvent.year}
              </Typography>
              <Typography variant="h5" gutterBottom>
                {activeEvent.event}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {activeEvent.significance}
              </Typography>
            </CardContent>
          </EventCard>
        </AnimatePresence>
      </CarouselContainer>

      <TimelineTrack>
        <NavigationButton
          onClick={handlePrev}
          disabled={activeIndex === 0}
          sx={{ left: -20 }}
          size="small"
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </NavigationButton>

        <NavigationButton
          onClick={handleNext}
          disabled={activeIndex === events.length - 1}
          sx={{ right: -20 }}
          size="small"
        >
          <ArrowForwardIosIcon fontSize="small" />
        </NavigationButton>

        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: `${(activeIndex / (events.length - 1)) * 100}%`,
            backgroundColor: theme.palette.primary.main,
            borderRadius: 2,
            transition: "width 0.3s ease",
          }}
        />

        {visibleMarkers.map((event, index) => {
          const eventIndex = events.findIndex((e) => e.year === event.year);
          const position = (index / (visibleMarkers.length - 1)) * 100;
          const isActive = eventIndex === activeIndex;

          return (
            <Tooltip key={event.year} title={event.event} arrow>
              <Box>
                <TimelineMarker
                  active={isActive ? 1 : 0}
                  style={{ left: `${position}%` }}
                  onClick={() => setActiveIndex(eventIndex)}
                />
                <YearLabel
                  active={isActive ? 1 : 0}
                  style={{ left: `${position}%` }}
                  variant="caption"
                >
                  {event.year}
                </YearLabel>
              </Box>
            </Tooltip>
          );
        })}
      </TimelineTrack>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 5 }}>
        <Button
          size="small"
          disabled={activeIndex === 0}
          onClick={handlePrev}
          startIcon={<ArrowBackIosNewIcon />}
        >
          Previous
        </Button>
        <Typography variant="body2" color="text.secondary">
          {activeIndex + 1} of {events.length}
        </Typography>
        <Button
          size="small"
          disabled={activeIndex === events.length - 1}
          onClick={handleNext}
          endIcon={<ArrowForwardIosIcon />}
        >
          Next
        </Button>
      </Box>
    </TimelineContainer>
  );
};

export default InteractiveTimeline;
