import React, { Fragment, useEffect, useState } from 'react';
import FormikInputLabel from '../../Formik/FormikInputLabel';
import FormikInputFile from '../../Formik/FormikInputFile';
import FormikMultiFileInput from '../../Formik/FormikMultiFileInput';
import FormikSelect from '../../Formik/FormikSelect';
import {
    Grid,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { GetCases } from '../../../api/caseManager/case';
import { useFormikContext } from 'formik';
import FormikInputTextArea from '../../Formik/FormikInputTextArea';
import ARFormikInputTextArea from '../../Formik/ARFormikInputTextArea';

export default function SuccessStoryForm({ image_url, images_url }) {
    const { setFieldValue, status, isSubmitting, values } = useFormikContext();
    const [cases, setCases] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        GetCases().then((res) => {
            if (res.success)
                setCases(
                    res.data.data.filter(x=>x.status=='closed').map(
                        (item) => {
                            return { "value": item.id, "text": item.name }
                        }
                    )
                )
        })


    }, [])


    return (

        <Grid container spacing={2}>
            <Grid item lg={12} md={6} sm={12} xs={12} >
                <FormikSelect
                    name="case_id"
                    isRequired={true}
                    type="text"
                    size="small"
                    title={t('case_name')}
                    options={cases}
                />

            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12} >
                <FormikInputLabel
                    name="vedio_url"
                    type="text"
                    size="small"
                    title={t('vedio_url')}
                    isRequired={false}
                />
            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12} >
                <FormikInputTextArea
                    name="description"
                    type="text"
                    size="small"
                    title={t('description')}
                    isRequired={true}
                />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12} >
                <ARFormikInputTextArea
                    name="ar_description"
                    type="text"
                    size="small"
                    title={t('ar_description')}
                    isRequired={true}
                />
            </Grid>
            
            <Grid item lg={12} md={12} sm={12} xs={12} >
                <FormikInputFile
                    name="cover_photo"
                    setFieldValue={setFieldValue}
                    isRequired={true}
                    image_url={image_url != undefined ? image_url : undefined}
                    title={t('cover_image')}

                />

            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12} >
                <FormikMultiFileInput
                    name="images"
                    setFieldValue={setFieldValue}
                    images_url={images_url != undefined ? images_url : undefined}
                    isRequired={false}
                    // image_url={image_url != undefined ? image_url : undefined}
                    title={t('images')}

                />

            </Grid>



        </Grid>

    );
}



