import React from 'react';
import {Box, Typography} from "@mui/material";

const SaleBlock = () => {
    return (
        <Box sx={{backgroundColor: 'background.paper', padding: '5px 0px'}}>
            <Typography fontSize={12} >
                Get 10% off on autumn collection!
            </Typography>
        </Box>
    );
};

export default SaleBlock;