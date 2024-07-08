import { Box } from "@mui/material";

const PageNotFoundPage = () => {
  document.title = "Readify | 404";
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4, // Adjust unit (px by default) if needed
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh", // Ensures content stays centered even on smaller viewports
        fontSize: "30px"
      }}
    >
      <h1>404</h1>
      <p>Page Not Found</p>
    </Box>
  );
};

export default PageNotFoundPage;
