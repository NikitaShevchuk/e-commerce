import { Box, Link } from "@mui/material";
import React from "react";

const LeftMenu = () => {
    return (
        <Box sx={{ display: { xs: "none", md: "flex" }, px: 2, flex: 1 }}>
            <Link className="link" href="/category/Men">
                Men
            </Link>
            <Link className="link" href="/category/Women">
                Women
            </Link>
            <Link className="link" href="/">
                Sales
            </Link>
        </Box>
    );
};

export default LeftMenu;
