
import React, { useEffect, useState } from 'react';
import {
    TextField,
    InputLabel,
    Box,
    Button,
    makeStyles,
    Card,CircularProgress
} from '@material-ui/core';
import { Field, useFormikContext } from 'formik';
import Avatar from '@mui/material/Avatar';
import { Close } from '@mui/icons-material';
import IconButton from '@material-ui/core/IconButton';
import { uploadTempFile } from '../../api/images/image';
import { Image, } from "react-bootstrap";
import { mainColor } from '../../config/constants';

import "./style.css"
const FInput = ({ field, form, ...props }) => {
    return <TextField
        id="standard-number"
        type="number"
        {...field} {...props}
        InputLabelProps={{
            shrink: true,
        }}

        variant="standard"
    />


};
import { useTranslation } from 'react-i18next';
const useStyles = makeStyles((theme) => ({
    Circle: {
        height: '10px',
        width: '10px',
        backgroundColor: 'red',
        borderRadius: '50%',
        display: 'inline-block',
        margin: '3px',
        marginLeft: '12px',
    },
    inputLabel: {
        width: '100%',
        marginTop: '3px',
        padding: '0px',
    },
    addfileBtn: {
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        borderRadius: 30,
    },
    input: {
        display: 'none',
    },


}));

export default function FormikInputFile({
    title,
    setFieldValue,
    isRequired,
    image_url,
    ...props
}) {


    const { initialValues, values, errors, touched, status } = useFormikContext();
    const [value, setValue] = useState();
    const [uploadedImage, setUploadedImage] = useState(undefined);
    const [temp, setTemp] = useState([]);
    const classes = useStyles();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const handleUploadImage = (event) => {
        setLoading(true)
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            var formData = new FormData();
            let data = new FormData();
            formData.append('images[]', img);
            uploadTempFile(formData).then((result) => {
                setFieldValue(props.name, result.data.file_name);
                // setFieldValue(props.name, [...values[props.name], result.data.file_name]);
            });

            setUploadedImage(URL.createObjectURL(event.target.files[0]));
        }
        setLoading(false)
        return;
    };
    useEffect(() => {
        if (image_url != undefined) {
            setUploadedImage(image_url);
        }

    }, [image_url]);



    return (
        <div style={{ width: '100%' }}>
            <input
                className={classes.input}
                id="upload-image2"
                type="file"
                accept="image/*"
                //  accept="application/pdf,text/plain,.doc, .docx,image/*"
                onChange={handleUploadImage}
            />
            <Box display="flex">
                <Box>

                    <InputLabel
                        style={{
                            color: 'black',
                            width: 'auto',
                        }}
                    >
                        {title}
                    </InputLabel>
                </Box>
                {isRequired && (
                    <Box>
                        <Card className={classes.Circle}></Card>
                    </Box>
                )}
            </Box>
            <Box display="flex" width={'100%'}>
                <Box  >
                    <label
                        htmlFor={'upload-image2'

                        }
                        style={{
                            width: '100%',
                        }}
                    >
                        <Button
                            component="span"
                            disabled={loading}
                            variant="contained"
                            fullWidth
                            style={{
                                color: '#fff',
                                backgroundColor: ' #1976d2',
                            }}

                        >
                            {t('choose_image')}
                        </Button>
                    </label>
                </Box>
                <Box display="flex">
                    {(uploadedImage) && (<IconButton
                        style={{
                            outline: 'none',
                            color: '#0e8e93',
                            width: '30px',
                            height: '30px',
                            backgroundColor: '#9BC9CB',
                            margin: '10px',
                            border: '1px solid #389497',
                        }}
                        aria-label="delete"
                        className={classes.margin}
                        onClick={() => {
                            setFieldValue(props.name, undefined);
                            setUploadedImage(undefined);
                        }}
                    >
                        <Close fontSize="small" />
                    </IconButton>)}
                </Box>


                {(uploadedImage && <Box  >
                    <Image
                        src={uploadedImage}
                        thumbnail
                        style={{ width: '120px' }}
                    />

                </Box>)}




            </Box>
        </div >
    );
}
