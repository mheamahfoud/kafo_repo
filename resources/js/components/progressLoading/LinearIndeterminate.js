import * as React from 'react';
import Box from '@mui/material/Box';
import { mainColor } from '../../config/constants';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@mui/material/LinearProgress';
export const defaultToolbarStyles = (theme) => ({
  root: {
    "& .MuiLinearProgress-colorPrimary": {
      backgroundColor: "red",
    },
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: "green",
    },
  },

});

function LinearIndeterminate() {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress color='primary' />
    </Box>
  );
}


export default withStyles(defaultToolbarStyles, { name: 'LinearIndeterminate' })(
  LinearIndeterminate,
);