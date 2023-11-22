import { useCallback, useEffect, useState } from "react";
import Header from "./Header";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import { fetchBasket } from "../../features/basket/basketSlice";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import HomePage from "../../features/home/HomePage";

const App = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasket());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch])

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);

  const [darkMode, setDarkMode] = useState(true);
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
      <ToastContainer position='top-right' theme='dark' />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      {loading ? <LoadingComponent message="initializing app..." />
        : location.pathname === '/' ? <HomePage />
          : <Container sx={{ mt: 4 }}><Outlet /></Container>}
    </ThemeProvider>
  )
}

export default App