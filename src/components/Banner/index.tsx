import mainBanner from "@/assets/img/banners/main-page-image.webp";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const Banner = () => {
    return (
        <Box sx={{ backgroundImage: `url(${mainBanner.src})` }} className="banner-box">
            <Box>
                <Typography variant="h5" sx={{ mb: 1 }}>
                    New Autumn Styles
                </Typography>
                <Typography color="white" sx={{ mb: 4, fontWeight: 300 }}>
                    Out now!
                </Typography>
                <Button variant="contained" sx={{ mr: 2 }} color="secondary" size="large">
                    <Link style={{ fontSize: "12px" }} href={`/category/1`}>
                        Shop men&apos;s
                    </Link>
                </Button>
                <Button variant="contained" color="secondary" size="large">
                    <Link style={{ fontSize: "12px" }} href={`/category/2`}>
                        Shop women&apos;s
                    </Link>
                </Button>
            </Box>
        </Box>
    );
};

export default Banner;
