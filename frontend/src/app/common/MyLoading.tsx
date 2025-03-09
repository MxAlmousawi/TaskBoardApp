import { Box, CircularProgress } from "@mui/material";

const MyLoading: React.FC = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: (theme) => theme.palette.background.default,
      }}
    >
      <CircularProgress size={80} color="primary" />
    </Box>
  );
};

export default MyLoading;
