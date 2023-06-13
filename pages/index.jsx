import { useThemeContext } from "../contexts/ThemeContext";
import * as React from "react";
import Container from "@mui/material/Container";

export default function Home() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <>
      <Container maxWidth="sm">
        {/* <Nav/> */}
       
      </Container>
    </>
  );
}
