import * as React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button } from '@mui/material';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@material-ui/core/Fab';
import {
    GridToolbarQuickFilter,
    GridToolbar, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport
} from '@mui/x-data-grid';

import {

    GridCsvExportMenuItem,
    GridPrintExportMenuItem,
    GridToolbarExportContainer,

    useGridApiContext,
    gridFilteredSortedRowIdsSelector,
    gridVisibleColumnFieldsSelector,
} from '@mui/x-data-grid';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { mainColor } from '../../config/constants';
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next';
import { CSVLink, CSVDownload } from "react-csv";
import { Export } from '../../api/excel/exportExcel';
import { domainUrl } from '../../config/constants';
import { globalSelector } from '../../redux/features/global_slice';
export const defaultToolbarStyles = (theme) => ({
    root: {
        '@media print': {
            display: 'none',
        },
    },
    fullWidthRoot: {},
    left: {
        flex: '1 1 auto',
    },
    fullWidthLeft: {
        flex: '1 1 auto',
    },
    actions: {
        flex: '1 1 auto',
        textAlign: 'right',
    },
    fullWidthActions: {
        flex: '1 1 auto',
        textAlign: 'right',
    },
    titleRoot: {},
    titleText: {},
    fullWidthTitleText: {
        textAlign: 'left',
    },
    icon: {
        '&:hover': {
            color: theme.palette.primary.main,
        },
    },
    iconActive: {
        color: theme.palette.primary.main,
    },
    filterPaper: {
        maxWidth: '50%',
    },
    displayData: {
        borderRadius: '8px',
        padding: '10px',
        backgroundColor: '#9bc9cb',
        fontWeight: '600',
        color: '#fff',
        minWidth: '44px',
        textAlign: 'center',
    },
    searchField: {
        width: '150px',
    },
    filterCloseIcon: {
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 100,
    },
    boxContainer: {
        //padding: '0px 20px',
    },
    tableTitle: {
        backgroundColor: '#9bc9cb',
        color: '#fff',
        padding: '13px',
        fontSize: '16px',
        fontWeight: '600',
        minWidth: '22%',
        textAlign: 'center',
    },

    [theme.breakpoints.down('sm')]: {
        titleRoot: {},
        titleText: {
            fontSize: '16px',
        },
        spacer: {
            display: 'none',
        },
        left: {
            // flex: "1 1 40%",
            padding: '8px 0px',
        },
        actions: {
            // flex: "1 1 60%",
            textAlign: 'right',
        },
    },
    [theme.breakpoints.down('xs')]: {
        root: {
            display: 'block',
            '@media print': {
                display: 'none !important',
            },
        },
        left: {
            padding: '8px 0px 0px 0px',
        },
        titleText: {
            textAlign: 'center',
        },
        actions: {
            textAlign: 'center',
        },
    },
    '@media screen and (max-width: 480px)': {},
});

const getJson = (apiRef) => {
    // Select rows and columns
    const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
    const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);
    const { t } = useTranslation();
    // Format the data. Here we only keep the value
    const data = filteredSortedRowIds.map((id) => {
        const row = {};
        visibleColumnsField.forEach((field) => {
            if (field != 'actions')
                row[t(field)] = apiRef.current.getCellParams(id, field).value;
        });


        return row;
    });
    return data;
    // Stringify with some indentation
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#parameters
    /// return JSON.stringify(data, null, 2);
};

const exportBlob = (blob, filename) => {
    // Save the blob in a json file
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    setTimeout(() => {
        URL.revokeObjectURL(url);
    });
};

const JsonExportMenuItem = (props) => {
    const apiRef = useGridApiContext();
    const csvReport = {
        data: getJson(apiRef),
        filename: 'Clue_Mediator_Report.csv'
    };
    const { hideMenu } = props;

    return (
        // <CSVLink data={getJson(apiRef)} >
        //     Download me
        // </CSVLink>


        <MenuItem
            onClick={() => {
                //  Export({'type':'cases'})
                const a = document.createElement('a');
                //  var x=props.type + '/1';
                //  alert(x)
                a.href = domainUrl + 'export/' + props.type + '/' + props.case_id ?? '0';
                // a.href = domainUrl + 'export?type=' + props.type ?? 'cases' + "id=" + 4;
                ///      
                a.click();

                //  hideMenu?.();
            }}
        >
            Export
        </MenuItem >
    );
};

JsonExportMenuItem.propTypes = {
    hideMenu: PropTypes.func,
};

const csvOptions = { delimiter: ';' };

const CustomExportButton = (props) => (
    <GridToolbarExportContainer {...props}>
        {/* <GridPrintExportMenuItem options={{ hideFooter: true, hideToolbar: true, hideMenu: true }} /> */}
        <JsonExportMenuItem type={props?.type ?? undefined} case_id={props?.case_id ?? undefined} />
    </GridToolbarExportContainer>
);

function CustomToolBar(props) {
    const { t } = useTranslation();
    const { lang } = useSelector(globalSelector)
    React.useEffect(() => {
    }, []);
    return (

        <Grid container height={50}>
            <Grid item flexGrow={1} >
                <GridToolbarContainer >
                    <GridToolbarColumnsButton />
                    <GridToolbarFilterButton />
                    <GridToolbarDensitySelector />
                    <CustomExportButton type={props?.type ?? undefined} case_id={props?.case_id ?? undefined} />
                    <GridToolbarQuickFilter style={lang == 'ar' ? { marginRight: 'auto' } : { marginLeft: 'auto' }} />
                </GridToolbarContainer>
                {/* <GridToolbar style={{ height: '49px' }} showQuickFilter={props.showQuickFilter} quickFilterProps={{ debounceMs: 500, onclick: (e) => { alert(JSON.stringify(e)) } }} /> */}

            </Grid>
            {!props.addDisabled ? props.setAddDialogOpen && (<Grid item xs={2} sm={2} lg={2} md={2} >
                <div style={{ textAlign: 'end', padding: '5px' }} >
                    <Fab size="small" onClick={() => { props.setAddDialogOpen(true) }} style={{ color: '#fff', background: mainColor }} aria-label="add" >
                        <AddIcon />

                    </Fab>
                </div>
            </Grid>) :
                <div style={{ textAlign: 'end', padding: '5px' }} title={props?.reasonDisabled}>
                    <Fab size="small" disabled>
                        <AddIcon />
                    </Fab>
                </div>
            }
        </Grid >

    );
}

CustomToolBar.propTypes = {
    showQuickFilter: PropTypes.bool.isRequired,
};

export default withStyles(defaultToolbarStyles, { name: 'CustomToolBar' })(
    CustomToolBar,
);

