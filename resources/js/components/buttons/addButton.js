import AddIcon from '@mui/icons-material/Add';
import Fab from '@material-ui/core/Fab';
import { useTranslation } from 'react-i18next';

const AddButton = ({setAddDialogOpen,...props}) => {
    const { t } = useTranslation();
    return (<Fab variant="extended" size="medium"  onClick={()=>{setAddDialogOpen(true)}} style={{ color: '#fff', background: '#1976d2' }} aria-label="add">
        <AddIcon />
        {t('add')}
    </Fab>)
}

export default AddButton;