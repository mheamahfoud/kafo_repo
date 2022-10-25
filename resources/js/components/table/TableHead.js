import {
    Box,
    Grid,
    makeStyles,
    TableCell,
    TableSortLabel,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    th: {
        padding: '0px 0px!important',
        cursor: 'pointer',
        position: 'sticky',
        top: '0px',
        height: 'auto!important',
        ///verticalAlign: 'bottom',
        zIndex: 100,
        backgroundColor: theme.palette.background.paper,
    },
    sortIcon: {
        paddingTop: '0px!important',
        position: 'absolute',
        right: '0px',
        '& svg': {
            color: '#fff!important',
        },
    },
    subCell: {
        //padding: '0px 8px',
        borderBottom: '1px solid',
        display: 'flex',
        alignItems: 'center',
    },
    titleCell: {
        padding: '0px 17px',
        width: '100%',
    },
    sortAction: {
        display: 'flex',
        verticalAlign: 'top',
        cursor: 'pointer',
    },
    sortLabelRoot: {
        height: '10px',
    },
}));

export default function TableHead({
    columnMeta,
    handleToggleColumn,
    sortOrder,
    secoundTitle,
    style,
    subCellStyle,
}) {
    const classes = useStyles();
    return (
        <TableCell
            data-colindex={columnMeta.index}
            scope={'col'}
            className={classes.th}
            style={style}
        >
            <Box
                className={classes.subCell}
                style={{ height: '49px' }}
                flexGrow={1}
            >
                <span className={classes.titleCell}>{columnMeta.label}</span>
                {sortOrder.name === columnMeta.name && (
                    <TableSortLabel
                        className={classes.sortIcon}
                        active={sortOrder.name === columnMeta.name}
                        direction={sortOrder.direction}
                    />
                )}
            </Box>
            <Box className={classes.subCell} style={subCellStyle}>
                <span className={classes.titleCell}>{secoundTitle}</span>
            </Box>
        </TableCell>
    );
}
