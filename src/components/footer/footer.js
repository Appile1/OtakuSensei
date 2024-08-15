// Footer.js
import { Container, Typography, Box, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "grey.200",
        padding: 3,
        textAlign: "center",
      }}
    >
      <Container className="footer">
        <Typography variant="body1">
          &copy; {new Date().getFullYear()} StockStash
        </Typography>
        <Typography variant="body2">
          <Link href="#" color="inherit" underline="none">
            Privacy Policy
          </Link>{" "}
          |{" "}
          <Link href="#" color="inherit" underline="none">
            Terms of Service
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
