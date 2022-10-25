import React from 'react';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { Checkbox } from '@material-ui/core';

export default function CircleCheckbox(props) {
    let newProps = Object.assign({}, props);
    /*

    newProps.color =
        props['data-description'] === 'row-select' ? 'secondary' : 'primary';
    */
    newProps.style = { color: '#9bc9cb' };

    if (props['data-description'] === 'row-select') {
        return (
            <Checkbox
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<CheckCircleIcon />}
                indeterminateIcon={<RemoveCircleIcon />}
                {...newProps}
            />
        );
    } else {
        return (
            <Checkbox
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<CheckCircleIcon />}
                indeterminateIcon={<RemoveCircleIcon />}
                {...newProps}
            />
        ); //checkAll
    }
}
