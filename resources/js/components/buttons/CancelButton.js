import { Button, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
const CancelButton = ({ ...props }) => {
    const { t } = useTranslation();
    return (
        <Button onClick={props.handleClose} color="primary">
            {t('cancel')}
        </Button>
    )
}

export default CancelButton;