import { Box, CircularProgress } from "@mui/material";

const LoadingIndicator = () => {
 return (
  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
   <CircularProgress />
  </Box>
 );
};

export default LoadingIndicator;
