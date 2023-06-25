import { Box, Typography } from "@mui/material";

export default function CustomFooter() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "56px",
        mx: 2,
      }}
    >
      <Typography sx={{ fontSize: { xs: "small" } }}>
        &copy; {new Date().getFullYear()} All Rights Reserved.
      </Typography>
    </Box>
  );
}
