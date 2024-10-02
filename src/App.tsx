import { Brightness4, Brightness7, Dashboard } from "@mui/icons-material";
import { AppBar, Box, createTheme, CssBaseline, IconButton, Paper, Stack, ThemeProvider, Toolbar } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route, Routes, useOutlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApiLogsPage from "./components/ApiLogs";
import NotificationLogs from "./components/NotificationLogs";
import Templates from "./pages/templates";
import { toggleTheme } from "./store/slices/theme.slice";
import { RootState } from "./store/store";

const queryClient = new QueryClient();

const MainLayout = () => {
 const outlet = useOutlet();
 const { mode } = useSelector((state: RootState) => state.themeReducer);
 const dispatch = useDispatch();

 const handleToggle = () => {
  dispatch(toggleTheme());
 };

 return (
  <>
   <AppBar position='sticky'>
    <Toolbar
     variant='dense'
     sx={{
      justifyContent: "space-between",
     }}
    >
     <Stack spacing={2}>
      {[
       {
        title: "Dashboard",
        link: "/",
       },
       {
        title: "Api Logs",
        link: "/api-logs",
       },

       {
        title: "Notification Logs",
        link: "/notification-logs",
       },

       {
        title: "Templates",
        link: "/templates",
       },
      ].map((item) => (
       <Link
        to={item.link}
        key={item.title}
        style={{
         color: "white",
         textDecoration: "none",
        }}
       >
        {item.title}
       </Link>
      ))}
     </Stack>

     <Stack spacing={2}>
      <IconButton color='inherit' onClick={handleToggle}>
       {mode === "light" ? <Brightness4 /> : <Brightness7 />}
      </IconButton>
     </Stack>
    </Toolbar>
   </AppBar>

   <Box
    component={Paper}
    sx={{
     p: 2,
     height: "calc(100vh - 100px)",
     m: 2,
    }}
   >
    {" "}
    {outlet}
   </Box>
  </>
 );
};

function App() {
 const { mode } = useSelector((state: RootState) => state.themeReducer);
 const theme = useMemo(() => {
  const local = createTheme({
   palette: {
    mode: mode,
   },

   components: {
    MuiButton: {
     defaultProps: {
      size: "small",
     },
    },

    MuiTextField: {
     defaultProps: {
      variant: "outlined",
      size: "small",
     },
    },

    MuiSelect: {
     defaultProps: {
      variant: "outlined",
      size: "small",
     },
    },
    MuiStack: {
     defaultProps: {
      direction: "row",
     },
    },
   },
  });
  return local;
 }, [mode]);

 return (
  <ThemeProvider theme={theme}>
   <ToastContainer />
   <QueryClientProvider client={queryClient}>
    <CssBaseline />
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<MainLayout />}>
       <Route path='/' element={<Dashboard />} />
       <Route path='/api-logs' element={<ApiLogsPage />} />
       <Route path='/notification-logs' element={<NotificationLogs />} />
       <Route path='/templates' element={<Templates />} />
       <Route path='*' element={<div>404</div>} />
      </Route>
     </Routes>
    </BrowserRouter>

    {/* <Container maxWidth='xl'>
    <HomePage />
   </Container> */}
   </QueryClientProvider>
  </ThemeProvider>
 );
}

export default App;
