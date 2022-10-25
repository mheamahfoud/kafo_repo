import * as React from 'react';
import { mainColor } from '../../config/constants';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
function LoadingElement() {
    return (

        <Box
            display="flex"
            justifyContent="center"
        >
            <CircularProgress color="primary" style={{ color: mainColor }} />
        </Box>

    );
}


export default LoadingElement;