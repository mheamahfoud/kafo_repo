import React, { useEffect, useState } from 'react';
import InputLabelDetail from '../../../BlockDetail/InputLabelDetail';
import { Button, Grid, makeStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { GetReportCase } from '../../../../api/caseManager/case';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux'
import { urlRegExp } from '../../../../config/constants';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { CancelCase } from '../../../../api/caseManager/case';
import 'react-tabs/style/react-tabs.css';
import { useSnackbar } from "notistack";
import Costs from './Costs';
import Donors from './Donors';
import { globalSelector, setDialogConfirmOpen, setDialogReasonCaseId, setDialogReasonCaseOpen, setDialogReasonCaseText ,setDialogConfirmNotificationOpen,setNotificationData} from '../../../../redux/features/global_slice';

const useStyles = makeStyles((theme) => ({
    tittle: {
        padding: '0px 5px',
        width: 'fit-content',
        color: '#fff',
        backgroundColor: theme.palette.primary.main,
    },
    dialog: {
        position: 'absolute',
        top: 10,

    }
}));
export default function ReportCancelCaseDialogn({ open, data, ...props }) {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const [reportCase, setReportCase] = useState([]);
    const [costs, setCosts] = useState([]);
    const [donors, setDonors] = useState([]);
    const {dialog_reason_case_id,dialog_reason_case_text} = useSelector(globalSelector)
  
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setDialogConfirmOpen(false))
        dispatch(setDialogReasonCaseOpen(false))

  
        if (dialog_reason_case_id) {
            GetReportCase({ 'id': dialog_reason_case_id }).then(
                (res) => {
                    if (res.success) {
                        setCosts(res.data.costs)
                        setDonors(res.data.donors)

                    }


                    // console.log(res.data.media.length)
                    // setImagesUrl(res.data.media.map(x => { return { 'url': x.full_url, 'id': x.id, 'model_id': data.id } }));
                    // setCurrentUpdated(res.data)
                }
            )
        }

    }, [])


    //EditDonor
    const classes = useStyles();

    const handleClose = () => {
        dispatch(setDialogReasonCaseId(null))
        dispatch(setDialogReasonCaseText(''))

  
        props.onClose();
    };

    const handleSave = () => {
        CancelCase({ 'case_id': dialog_reason_case_id, 'reason': dialog_reason_case_text }).then(
            (res) => {
                if (res.success) {
                    dispatch(setDialogReasonCaseId(null))
                    dispatch(setDialogReasonCaseText(''))
            
                    var temp =res.data;
                    temp['percentage_completed']=data['percentage_completed'];
                    temp['total_needed_amount']=data['total_needed_amount']
                    temp['remaining_amount']=data['remaining_amount']
                    temp['can_cancel']=false;
                    
                    props.setUpdateRow(temp)
                    props.onClose();
                    dispatch(setNotificationData(
                        {
                            message:t('cancel_case' ), title:t('cancel_case', { dynamicValue: t('case') }), type:'cancel_case' ,case_id: dialog_reason_case_id
                        }
                    ))
                    dispatch(setDialogConfirmNotificationOpen(true))
                    enqueueSnackbar(t('updated_successfully'), {
                        variant: 'success',
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'center',
                        },
                    });
                }
                else {
                    enqueueSnackbar(res.error_description, {
                        variant: 'error',
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'center',
                        },
                    });
                }
            }
        )


    };

    return (
        <Dialog
            {...props}
            classes={{
                paper: classes.dialog
            }}
            open={open}
            fullWidth
            disableBackdropClick
            maxWidth={'md'}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle className={classes.tittle} id="form-dialog-title">
                {t('report_cancel_case')}
            </DialogTitle>


            <DialogContent>

                <Tabs>
                    <TabList>
                        <Tab>{t('costs')}</Tab>
                        <Tab>{t('donors')}</Tab>
                    </TabList>

                    <TabPanel>

                        <Costs costs={costs} />
                    </TabPanel>


                    <TabPanel>
                        <Donors donors={donors} costs={costs} />
                    </TabPanel>
                </Tabs>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    {t('cancel')}
                </Button>


                <Button onClick={handleSave} color="primary">
                    {t('ok')}
                </Button>

            </DialogActions>


        </Dialog >)
}
