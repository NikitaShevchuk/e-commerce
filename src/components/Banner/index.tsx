import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import mainBanner from "../../assets/img/banners/main-page-image.webp";

const Banner = () => {
    return (
        <Box sx={{ backgroundImage: `url(${mainBanner})` }} className="banner-box">
            <Box>
                <Typography variant="h5" sx={{ mb: 1 }}>
                    New Autumn Styles
                </Typography>
                <Typography color="white" sx={{ mb: 4, fontWeight: 300 }}>
                    Out now!
                </Typography>
                <Button variant="contained" sx={{ mr: 2 }} color="secondary" size="large">
                    <NavLink style={{ fontSize: "12px" }} to={`/categories/1/men`}>
                        Shop men&apos;s
                    </NavLink>
                </Button>
                <Button variant="contained" color="secondary" size="large">
                    <NavLink style={{ fontSize: "12px" }} to={`/categories/2/women`}>
                        Shop women&apos;s
                    </NavLink>
                </Button>
            </Box>
        </Box>
    );
};

export default Banner;
