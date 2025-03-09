import { Theme } from "@emotion/react";
import { Box, SxProps } from "@mui/material";
import React from "react";

interface Props {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}
const MyContainer: React.FC<Props> = ({ children, sx }) => {
  return (
    <Box
      sx={{
        px: { xs: "1rem", sm: "2rem", md: "3rem", lg: "4rem", xl: "5rem" },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default MyContainer;
