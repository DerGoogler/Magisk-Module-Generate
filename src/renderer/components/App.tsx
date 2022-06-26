import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import path from "path";
import React from "react";
import theme from "../theme";
import Main from "./Main";
import fs from "fs"
import file from "../util/file";

export default function App(): JSX.Element {
  return (
    // Setup theme and css baseline for the Material-UI app
    // https://mui.com/customization/theming/
    <>
      <CssBaseline />
      <Box>
        <main>
          {/* This is where your app content should go */}
          <Main />
        </main>
      </Box>
    </>
  );
}
