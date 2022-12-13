import React, { Fragment, useEffect, useState } from 'react';
import FormikInputLabel from '../../../components/Formik/FormikInputLabel';
import ARFormikInputLabel from '../../../components/Formik/ARFormikInputLabel';
import ARFormikInputTextArea from '../../../components/Formik/ARFormikInputTextArea';
import FormikInputTextArea from '../../../components/Formik/FormikInputTextArea';
import {
    Grid,
    makeStyles,
    Paper
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';
import GeneralStyles from '../../../components/styles/GeneralStyles';

export default function CreateQuestionForm() {
    const { setFieldValue, status, isSubmitting, values } = useFormikContext();
    const { t } = useTranslation();
    return (
        <React.Fragment>
            <Grid item md={12} sm={12}>
                <ARFormikInputLabel
                    name="ar_question"
                    type="text"
                    size="small"
                    title={t('ar_question')}
                    isRequired={true}
                />
            </Grid>

            <Grid item md={12} sm={12}>
                <ARFormikInputTextArea
                    name="ar_answer"
                    type="text"
                    size="small"
                    title={t('ar_answer')}
                    isRequired={true}
                />
            </Grid>
            

            <Grid item md={12} sm={12}>
                <FormikInputLabel
                    name="en_question"
                    type="text"
                    size="small"
                    title={t('en_question')}
                    isRequired={true}
                />
            </Grid>
          

            <Grid item md={12} sm={12}>
                <FormikInputTextArea
                    name="en_answer"
                    type="text"
                    size="small"
                    title={t('en_answer')}
                    isRequired={true}
                />
            </Grid>


        </React.Fragment>



    );
}



