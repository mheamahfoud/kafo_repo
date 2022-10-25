import { makeStyles } from '@material-ui/core/styles';
 const test = makeStyles((theme) => ({
    paperhearder: {
        width: '100%',
        overFlowx: 'auto',
        marginBottom: '10px',
        marginTop: '12px',
        padding: '15px',
        // marginRight: '15%',
    },
    dialog: {
        position: 'absolute',
        top: 50
    },
    tittle:{
        padding: '0px 5px',
        width: 'fit-content',
        color: '#fff',
        backgroundColor: theme.palette.primary.main,
    },
    tittle_dialog: {
        padding: '0px 5px',
        width: 'fit-content',
        color: '#fff',
        backgroundColor: theme.palette.primary.main,
    },
    
}));

