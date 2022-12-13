import React, { useEffect, useState } from 'react';
import {
    TextField,
    InputLabel,
    Box,
    Grid,
    ListItemAvatar,
    ListItemText,
    ListItem,
    List,
    makeStyles,
    Card,
    CircularProgress,
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import { Field, useFormikContext } from 'formik';
import Avatar from '@mui/material/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { uploadTempFile } from '../../api/images/image';
import Button from '@mui/material/Button';
import { Image, } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux'
import { DeleteFileCase, DeleteFile } from '../../api/images/image';
import { AddDelteFiles } from '../../redux/features/file_slice';
import "./style.css";
import VisibilityIcon from '@material-ui/icons/Visibility';
import PrintRoundedIcon from '@material-ui/icons/PrintRounded';
import { mainColor } from '../../config/constants';
import FileViewer from '../dialogs/File/FileViewer';
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
import { textAlign } from '@mui/system';
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
    listItemAvatar: {
        minWidth: '34px',
    },
    '@global': {
        '.imgButton': {
            textAlign: 'center'
        },
        '.imgContainer img, .imgContainer .imgButton button': {
            width: '100%'
        }
    }

}));

export default function FormikMultiFileInputBackup({
    title,
    setFieldValue,
    isRequired,
    images_url,
   /// files,
    ...props
}) {

    const dispatch = useDispatch()
    const { values, } = useFormikContext();
    const classes = useStyles();
    const { t } = useTranslation();
    const [file, setFile] = useState([]);
    const [tempDeteteFiles, setTempDeteteFiles] = useState([]);
    const [loading, setLoading] = useState(false);
   




    const handleUploadFile = (event) => {

       // if (fileCategory == null) return;

        var formData = new FormData();

        let files = event.target.files;
        for (var i = 0; i < files.length; i++) {
            
            const fileReader = new FileReader();
            fileReader.onload = () => {
                if (fileReader.readyState === 2) {
                    var formData = new FormData();
                   /// formData.append('file', fileReader.result);
                    setFieldValue(props.name, fileReader.result);
                    // setAvatarPreview(fileReader.result);
                }
            };
            fileReader.readAsDataURL(files[i]);
        }
    };


   

   /* useEffect(() => {

        if (files != undefined) {
            var temp = files.map(
                (item) => {

                    return {
                        "file": null,
                        "file_path": item.image_path,
                        "id": item?.id
                    }
                }
            )


            setFieldValue('files', temp);

        }
    }, [files]);*/

    useEffect(() => {
        if (props.files) {
            let files = props.files;
            var temp = (values.files || []).map(
                (item) => {
                    return {
                        "file": null,
                        "file_path": item.image_path,
                        "id": item?.id
                    }
                }
            )
            setFieldValue('files', temp);

        }
    }, [props.files]);

    return (

        <div style={{ width: '100%' }}>
            <input
                className={classes.input}
                id="upload-image3"
                type="file"
                accept="image/*"
                multiple
                //  accept="application/pdf,text/plain,.doc, .docx,image/*"
                onChange={handleUploadFile}
            />
            <Grid container spacing={3} className={classes.grid}>
                <Grid
                    container
                    item
                    md={12}
                    sm={12}
                    style={{ height: 'fit-content' }}
                >
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

                </Grid>
                <Grid container item md={12} sm={12}>


                    {values.all_files?.map((item, index) => (
                        <Grid item sm={2}>
                            <FileRow
                                key={index}
                                item={item}
                                
                            />
                        </Grid>

                    ))}

                </Grid>
            </Grid>
        </div>



    );
}
function FileRow({ item }) {
    const classes = useStyles();
    const { setFieldValue, values } = useFormikContext();
    const [fileViewPath, setFileViewPath] = useState(null);
    const { t } = useTranslation();
    const handleDeleteClick = (item) => {
        //  deleteTempFile(disk, path).then((result) => {
        //  if (!result.error_code) {
        var temp = values.files?.filter(function (itemx) {
            return itemx.file_path !== item.file_path;
        });
        handleDeleteClick
        setFieldValue('files', temp);
        if (item.id != undefined) {
            var delelted_values = values.deleted_files;
            delelted_values.push(item.id)
            setFieldValue('deleted_files', delelted_values);
        }


     //   setValue(Math.random().toString(36).substring(7));
        // }
        //  });
    };

    const handleFileDialog = () => {
        setFileViewPath(null);
    };
    React.useEffect(
        () => {

        }
    )
    return (
        <ListItem
            style={{

            }}
        >
            <Box display="flex" style={{ width: '100%', flexDirection: 'column' }}>


                <table>
                    <tr>
                        <td>
                            <div className=''>
                                <div>
                                    <img variant="square" src={item.file_path} width={'100px'} height={''} onClick={() => setFileViewPath(item.file_path)}>
                                    </img>

                                </div>
                                <div className='imgButton' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <IconButton
                                        color={'primary'}
                                        size='small'
                                        className={classes.iconBtn}
                                        onClick={() => handleDeleteClick(item)}
                                    >
                                        <Avatar className={classes.listAvatar}>
                                            <DeleteIcon size='small' fontSize={'small'} color={'primary'} />
                                        </Avatar>
                                    </IconButton>
                                </div>
                            </div>
                        </td>

                    </tr>
                </table>
            </Box>
            {fileViewPath && (
                <FileViewer
                    path={fileViewPath}
                    handleFileDialog={handleFileDialog}
                />
            )}
        </ListItem>
    );
}