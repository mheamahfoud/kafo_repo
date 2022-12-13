import { Dialog,makeStyles } from '@material-ui/core';
import React from 'react';
const useStyles = makeStyles((theme) => ({
    tittle: {
        padding: '0px 5px',
        width: 'fit-content',
        color: '#fff',
        backgroundColor: theme.palette.primary.main,
    },
    dialog: {
        position: 'absolute',
        top: 10
    }
}));
export default function FileViewer({ path, handleFileDialog }) {
    const classes = useStyles();
    return (
        path != null && (
            <div>
                <Dialog
                  
                   classes={{
                       paper: classes.dialog
                   }}
              
                   fullWidth
                   disableBackdropClick
                   maxWidth={'sm'}
                   aria-labelledby="form-dialog-title"
                    open
                    onClick={handleFileDialog}
                >
                    <img
                      
                        src={path}
                        onClick={handleFileDialog}
                        alt="no image"
                    />
                </Dialog>
            </div>
        )
    );
}
