import { Box, Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "70vh",
          textAlign: "center",
          py: 8,
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          sx={{ fontSize: "8rem", fontWeight: 700 }}
        >
          404
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          Page Not Found
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          paragraph
          sx={{ maxWidth: 500, mb: 4 }}
        >
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            component={Link}
            to="/"
            variant="contained"
            color="primary"
            size="large"
          >
            Go to Homepage
          </Button>
          <Button
            component={Link}
            to="/properties"
            variant="outlined"
            size="large"
          >
            Browse Properties
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default NotFoundPage;
