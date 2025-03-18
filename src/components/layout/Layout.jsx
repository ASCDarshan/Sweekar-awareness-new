import React from "react";
import { Box, Container, styled } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "../ui/ScrollToTop";
import SplashScreen from "./SplashScreen";

const Main = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(4, 2, 6),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4, 3, 6),
  },
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(4, 4, 6),
  },
}));

const Layout = ({ children, maxWidth = "lg" }) => {
  return (
    <Main>
      <SplashScreen />

      <ScrollToTop />
      <Header />
      <ContentWrapper>
        <Container maxWidth={maxWidth} sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          {children}
        </Container>
      </ContentWrapper>
      <Footer />
    </Main>
  );
};

export default Layout;
