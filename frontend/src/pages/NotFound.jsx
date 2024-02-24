import { useTheme } from '@emotion/react';
import { Box, Typography } from '@mui/material';
import React from 'react';

const NotFound = () => {

    const theme = useTheme()

    return (
        <Box>
            <Typography color={theme.palette.error.main} variant="h3">There ist no Design now!!!!</Typography>
        </Box>
    );
}

export default NotFound;
