import React, { useEffect, useState } from 'react';
import {
    TextField,
    InputLabel,
    Box,

    makeStyles,
    Card,
    CircularProgress,
} from '@material-ui/core';
import { Field, useFormikContext } from 'formik';
import Avatar from '@mui/material/Avatar';
import { Close } from '@mui/icons-material';
import IconButton from '@material-ui/core/IconButton';
import { uploadTempFile } from '../../api/images/image';
import Button from '@mui/material/Button';
import { Image, } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux'
import { DeleteFileCase, DeleteFile } from '../../api/images/image';
import { AddDelteFiles } from '../../redux/features/file_slice';
import "./style.css";
import { mainColor } from '../../config/constants';
const FInput = ({ field, form, ...props }) => {
    return <TextField
        id="standard-number"
        type="number"
        {...field} {...props}
        InputLabelProps={{
            shrink: true,
        }}

        style={{ direction: 'rtl' }}

        variant="standard"
    />


};
import { useTranslation } from 'react-i18next';
const useStyles = makeStyles((theme) => ({

    addfileBtn: {
        backgroundColor: mainColor,
        color: '#fff',
        borderRadius: 30,
    },
    input: {
        display: 'none',
    },
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
    iconBtn: {
        padding: '0',
    },

}));

export default function FormikMultiFileInput({
    title,
    setFieldValue,
    isRequired,
    images_url,
    ...props
}) {

    const dispatch = useDispatch()
    const { values, } = useFormikContext();
    const classes = useStyles();
    const { t } = useTranslation();
    const [files, setFiles] = useState([]);
    const [tempDeteteFiles, setTempDeteteFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (images_url != undefined) {
           
            var ImagesArray1 = images_url?.map((x, index) => {
                return {
                    'url': x.url, 'id': x.id, 'file_name': undefined, 'model_id': x.model_id
                }
            })
            setFiles(ImagesArray1);
          //  setFieldValue(props.name, [...values[props.name], ...ImagesArray1]);

        }

    }, [images_url]);

    const uploadMultipleFiles = (e) => {

        var formData = new FormData();
        let ImagesArray = Object.entries(e.target.files).map((e) => {
            formData.append("images[]", e[1]);
            return { url: URL.createObjectURL(e[1]) };
        });
        setLoading(true)
        uploadTempFile(formData).then((result) => {

            if (result.success) {
                var ImagesArray1 = ImagesArray.map((x, index) => {
                    return {
                        'url': x.url, 'file_name': result.data.file_name[index], 'id': undefined, 'model_id': undefined
                    }
                })
                setFiles([...files, ...ImagesArray1]);
                e.target.value = null;
                if (values[props.name] == undefined)
                    setFieldValue(props.name, ImagesArray1);
                else
                    setFieldValue(props.name, [...values[props.name], ...ImagesArray1]);
                setLoading(false)
            }

        });

    }
    function deleteFile(e) {
        console.log(files)
        const d = files.filter((item, index) => index === e);
        var values = {};
        if (d[0].file_name != undefined)
            values['file_name'] = d[0].fie_name;
        else {
            dispatch(AddDelteFiles(d[0].id))
            // setTempDeteteFiles([...tempDeteteFiles,...d[0].id])
            values['id'] = d[0].id;
            values['model_id'] = d[0].model_id;
        }
        DeleteFile(values).then(
            (res) => {

            }
        )
        const s = files.filter((item, index) => index !== e);
        if (s.length == 0) {
            setFieldValue(props.name, undefined);
        }
        else {
            ///  alert(JSON.stringify(s))
            if (values[props.name] == undefined)
                setFieldValue(props.name, s);
            else
                setFieldValue(props.name, [...values[props.name], ...s]);

            //  setFieldValue(props.name, s);
        }
        setFiles(s);


    }

    return (

        <div style={{ width: '100%' }}>

            {!loading ? <div className="form-group multi-preview" style={{ display: "flex", flexWrap: 'wrap' }}>
                {(files || [])?.map((item, index) => (
                    <div
                        style={{ display: "flex", flexDirection: 'column', justifyContent: "center", padding: '5px' }}
                    >
                        <Image
                            fluid
                            src={item.url}
                            thumbnail
                        />
                        <Button size="sm" className="btn btn-danger" onClick={() => deleteFile(index)}>Remove</Button>
                    </div>
                ))}
            </div> : <div style={{ display: "flex", flexWrap: 'wrap', justifyContent: 'center' }}><CircularProgress style={{ color: mainColor, }} /></div>}



            <input
                className={classes.input}
                id="upload-image3"
                type="file"
                accept="image/*"
                multiple
                //  accept="application/pdf,text/plain,.doc, .docx,image/*"
                onChange={uploadMultipleFiles}
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
                        htmlFor={'upload-image3'}


                        style={{
                            width: '100%',
                        }}
                    >
                        <Button
                            component="span"
                            disabled={loading}
                            style={{
                                color: '#fff',
                                backgroundColor: mainColor,
                            }}
                            variant="contained"
                            className={classes.addfileBtn}
                            fullWidth

                        >
                            {t('choose_images')}
                        </Button>
                    </label>
                </Box>
            </Box>
        </div>



    );
}
