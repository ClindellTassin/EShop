import { useState } from "react";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const paleteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paleteType,
      background: {
        default: paleteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  });

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Catalog />
      </Container>
    </ThemeProvider>
  )
}

export default App