import { Box, Card, InputLabel, makeStyles } from '@material-ui/core';
import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';

const useStyles = makeStyles((theme) => ({
    color: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
    },
    swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
    },
    popover: {
        position: 'absolute',
        zIndex: '2',
    },
    cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    },
}));

export default function FormikColorPicker({ name, title }) {
    const classes = useStyles();
    const { setFieldValue, values, initialValues } = useFormikContext();

    useEffect(() => {
        if (values[name] == undefined) {
            SetColor();
            return;
        }
        SetColor(values[name]);
    }, [values[name]]);

    useEffect(() => {
        SetColor(initialValues[name] || '#ffffff');
    }, []);

    const [displayColorPicker, SetDisplayColorPicker] = useState();
    const [color, SetColor] = useState('#000000');

    const handleClick = () => {
        SetDisplayColorPicker(!displayColorPicker);
    };

    const handleClose = () => {
        SetDisplayColorPicker(false);
    };

    const handleChange = (newColor) => {
        SetColor(newColor.hex);
        setFieldValue(name, newColor.hex);
    };

    return (
        <div style={{ width: '100%' }}>
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
            </Box>
            <Box>
                <div>
                    <div
                        className={classes.swatch}
                        style={{ backgroundColor: color }}
                        onClick={handleClick}
                    >
                        <div className={classes.color} />
                    </div>
                    {displayColorPicker && (
                        <div className={classes.popover}>
                            <div
                                className={classes.cover}
                                onClick={handleClose}
                            />
                            <SketchPicker
                                color={color}
                                onChange={handleChange}
                            />
                        </div>
                    )}
                </div>
            </Box>
        </div>
    );
}
