import {
    Box,
    Fab,
    FormControlLabel,
    IconButton,
    TextField,
    Tooltip,
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import React from 'react';
import { useState } from 'react';
import {
    GetBranches,
    UpdateBranches,
} from '../../../../api/administration/systemKey';
import AddIcon from '@material-ui/icons/Add';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import { useSnackbar } from 'notistack';
import AddBranches from '../../../../components/Dialog/AddBranches';
import { getLists } from '../../../../api/list';
import { Autocomplete } from '@material-ui/lab';
import store from '../../../../services/redux/Redux';
import CustomTableToolbarAnotherStyle from '../../../../components/table/CustomTableToolbarAnotherStyle';
import CircleCheckbox from '../../../../components/table/CircleCheckbox';

export default function Branch() {
    const [branchesList, setBranchesList] = useState([]);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [tableEditIndex, setTableEditIndex] = useState(null);
    const { enqueueSnackbar } = useSnackbar();

    React.useEffect(() => {
        GetBranches().then((result) => {
            setIsLoading(false)
            setBranchesList(result.data);
        });
        getLists('timezone,countries,currencies');
    }, []);

    const tableColumns = [
        {
            label: 'ID',
            name: 'id',
            options: {
                filter: false,
                setCellProps: (value) => ({
                    style: { width: '3%' },
                }),
            }
        },
 
        {
            label: 'Country',
            name: 'country',
            options: {
                filter: false,
                setCellProps: (value) => ({
                    style: { minWidth: '170px' ,  width: '10%'},
                }),
                customBodyRender: (value, tableMeta, updateValue) =>
                    tableMeta.rowIndex == tableEditIndex ? (
                        <Autocomplete
                            getOptionLabel={(item) => item.text}
                            disableClearable={true}
                            getOptionSelected={(option, value) => {
                                return value.value === option.value;
                            }}
                            options={store
                                .getState()
                                .mange_list.lists.countries.map(
                                    (option) => option,
                                )}
                            value={
                                store.getState().mange_list.lists.countries[
                                    store
                                        .getState()
                                        .mange_list.lists.countries.findIndex(
                                            (item) => item.text === value,
                                        )
                                ]
                            }
                            onChange={(event, newValue) => {
                                updateValue(newValue.text);
                            }}
                            renderOption={(item) => (
                                <React.Fragment>{item.text}</React.Fragment>
                            )}
                            renderInput={(params) => (
                                <TextField {...params} size="small" />
                            )}
                        />
                    ) : (
                        value
                    ),
            },
        },
        {
            label: 'Timezone',
            name: 'timezone',
            options: {
                filter: false,
                setCellProps: (value) => ({
                    style: { minWidth: '170px', width: '10%' },
                }),
                customBodyRender: (value, tableMeta, updateValue) =>
                    tableMeta.rowIndex == tableEditIndex ? (
                        <Autocomplete
                            getOptionLabel={(item) => item.text}
                            disableClearable={true}
                            getOptionSelected={(option, value) => {
                                return value.value === option.value;
                            }}
                            options={store
                                .getState()
                                .mange_list.lists.timezone.map(
                                    (option) => option,
                                )}
                            value={
                                store.getState().mange_list.lists.timezone[
                                    store
                                        .getState()
                                        .mange_list.lists.timezone.findIndex(
                                            (item) => item.text === value,
                                        )
                                ]
                            }
                            onChange={(event, newValue) => {
                                updateValue(newValue.text);
                            }}
                            renderOption={(item) => (
                                <React.Fragment>{item.text}</React.Fragment>
                            )}
                            renderInput={(params) => (
                                <TextField {...params} size="small" />
                            )}
                        />
                    ) : (
                        value
                    ),
            },
        },
        {
            label: 'Name',
            name: 'name',
            options: {
                filter: false,
                customBodyRender: (value, tableMeta, updateValue) =>
                    tableMeta.rowIndex == tableEditIndex ? (
                        <FormControlLabel
                            style={{
                                marginLeft: '0px',
                                marginRight: '0px',
                            }}
                            control={<TextField value={value || ''} />}
                            onChange={(event) =>
                                updateValue(event.target.value)
                            }
                        />
                    ) : (
                        value
                    ),
                   
            },
        },
        {
            label: 'Flag',
            name: 'flag',
            options: {
                filter: false,
                customBodyRender: (value, tableMeta, updateValue) =>
                    tableMeta.rowIndex == tableEditIndex ? (
                        <FormControlLabel
                            style={{
                                marginLeft: '0px',
                                marginRight: '0px',
                            }}
                            control={<TextField value={value || ''} />}
                            onChange={(event) =>
                                updateValue(event.target.value)
                            }
                        />
                    ) : (
                        value
                    ),
            },
        },
        {
            label: 'Symbol',
            name: 'symbol',
            options: {
                filter: false,
                customBodyRender: (value, tableMeta, updateValue) =>
                    tableMeta.rowIndex == tableEditIndex ? (
                        <FormControlLabel
                            style={{
                                marginLeft: '0px',
                                marginRight: '0px',
                            }}
                            control={<TextField value={value || ''} />}
                            onChange={(event) =>
                                updateValue(event.target.value)
                            }
                        />
                    ) : (
                        value
                    ),
            },
        },
        {
            label: 'Currency',
            name: 'currency',
            options: {
                filter: false,
                customBodyRender: (value, tableMeta, updateValue) =>
                    tableMeta.rowIndex == tableEditIndex ? (
                        <Autocomplete
                            getOptionLabel={(item) => item.text}
                            disableClearable={true}
                            getOptionSelected={(option, value) => {
                                return value.value === option.value;
                            }}
                            options={store
                                .getState()
                                .mange_list.lists.currencies.map(
                                    (option) => option,
                                )}
                            value={
                                store.getState().mange_list.lists.currencies[
                                    store
                                        .getState()
                                        .mange_list.lists.currencies.findIndex(
                                            (item) => item.text === value,
                                        )
                                ]
                            }
                            onChange={(event, newValue) => {
                                updateValue(newValue.text);
                            }}
                            renderOption={(item) => (
                                <React.Fragment>{item.text}</React.Fragment>
                            )}
                            renderInput={(params) => (
                                <TextField {...params} size="small" />
                            )}
                        />
                    ) : (
                        value
                    ),
            },
        },
        {
            name: '',
            options: {
                filter: false,
                sort: false,
                empty: true,
                setCellProps: (value) => {
                    return {
                        style: {
                            width: '1px',
                        },
                    };
                },
                customBodyRender: (value, tableMeta, updateValue) =>
                    tableMeta.rowIndex != tableEditIndex ? (
                        <Box display="flex">
                            <Tooltip title={'Edit table'}>
                                <IconButton
                                    color="primary"
                                    size="small"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setTableEditIndex(tableMeta.rowIndex);
                                    }}
                                >
                                    <EditRoundedIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    ) : (
                        <Box display="flex">
                            <Tooltip title={'Save'}>
                                <IconButton
                                    color="primary"
                                    size="small"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();

                                        let request = {};
                                        request['id'] = tableMeta.rowData[0];
                                        request['name'] = tableMeta.rowData[1];
                                        request['country'] =
                                            tableMeta.rowData[2];
                                        request['timezone'] =
                                            tableMeta.rowData[3];
                                        request['flag'] = tableMeta.rowData[4];
                                        request['symbol'] =
                                            tableMeta.rowData[5];
                                        request['currency'] =
                                            tableMeta.rowData[6];

                                        UpdateBranches(
                                            request.id,
                                            request,
                                        ).then((result) => {
                                            if (!result.error_code) {
                                                setTableEditIndex(null);

                                                setBranchesList(
                                                    result.data,
                                                );

                                                enqueueSnackbar(
                                                    'Updated successfully!',
                                                    {
                                                        variant: 'success',
                                                        anchorOrigin: {
                                                            vertical: 'bottom',
                                                            horizontal:
                                                                'center',
                                                        },
                                                    },
                                                );
                                            } else {
                                                enqueueSnackbar(result.error, {
                                                    variant: 'error',
                                                    anchorOrigin: {
                                                        vertical: 'bottom',
                                                        horizontal: 'center',
                                                    },
                                                });
                                            }
                                        });
                                    }}
                                >
                                    <SaveRoundedIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    ),
            },
        },
    ];

    const handleDialogClose = () => {
        setAddDialogOpen(false);
    };

    const options = {
        filterType: "dropdown",
      responsive: "scroll",
        download: true,
        filter: true,
        print: true,
        selectableRows: 'none',
        enableNestedDataAccess: '.',
        filterType: 'dropdown',
        rowHover: false,
      //  tableBodyHeight: '400px',
        pagination: false,
       // tableBodyMaxHeight: '400px',
    };
     const handleClickOpen= ()=>{
        setAddDialogOpen(true)
     }
    return (
        <React.Fragment>
            {/* <Box p={1} textAlign="end">
                <Fab
                    size="medium"
                    color="primary"
                    aria-label="add"
                    onClick={() => setAddDialogOpen(true)}
                >
                    <AddIcon />
                </Fab>
            </Box> */}

            <MUIDataTable
                title={'Branches'}
                data={branchesList}
                columns={tableColumns}
                options={options}
                components={{
                    Checkbox: CircleCheckbox,
                    TableToolbar: (props) => (
                        <CustomTableToolbarAnotherStyle
                            {...props}
                            isLoading={isLoading}
                            //isLoading={isLoading}
                            icons={[
                                // {
                                //     title: 'Change Size',
                                //     onClick: toggleGridSize,
                                //     icon: <SettingsOverscanIcon />,
                                // },
                                {
                                    title: 'add',
                                    onClick: handleClickOpen,
                                    path:'/ProjectAdd',
                                    permission: 'production_project_add',
                                    icon: <AddIcon />,
                                },
                            ]}
                        />
                    ),
                }}
            />

            {addDialogOpen && (
                <AddBranches
                    open={addDialogOpen}
                    setList={setBranchesList}
                    onClose={handleDialogClose}
                />
            )}
        </React.Fragment>
    );
}
