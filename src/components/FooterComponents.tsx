import { Box, SxProps, Typography } from "@mui/material";
import { Component } from "react";
import { Link } from "react-router-dom";

class FooterComponents extends Component {

    render() {
        return (
            <Box component="footer" sx={this.fd()}>
                <Box component="div">
                    {"A"} | {"B"} | {"C"}
                </Box>
                <Typography variant="body1" sx={{ marginBottom: '0.5rem' }}>
                    © {new Date().getFullYear()} <Link to="https://github.com/aiden6791" style={{ textDecoration: "none", color: "white" }}>Aiden</Link>
                </Typography>
            </Box>
        );
    }

    private fd(): SxProps {
        return {
            backgroundColor: '#333',
            color: '#fff',
            textAlign: 'center',
            padding: '1rem',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            position: 'fixed',
            bottom: 0,
            width: '100%',
            left: 0
        };
    }
}

export default FooterComponents;