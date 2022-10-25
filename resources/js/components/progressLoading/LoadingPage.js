import * as React from 'react';
import Box from '@mui/material/Box';
import { mainColor } from '../../config/constants';
import { CircularProgress } from '@mui/material';

function LoadingPage() {
    return (
        <Box
            display="flex"
            justifyContent="center"
            marginTop={window.screen.height / 3 + 'px'}
        >
            <CircularProgress color="primary" style={{ color: mainColor }} />
        </Box>
    );
}


export default LoadingPage;