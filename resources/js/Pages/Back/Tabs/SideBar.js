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
    getSideBars,
} from '../../../../api/administration/systemKey';
import AddStudio from '../../../../components/Dialog/AddStudio';
import AddIcon from '@material-ui/icons/Add';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import { useSnackbar } from 'notistack';
import AddRoles from '../../../../components/Dialog/AddRole';
import { useHistory } from "react-router-dom";


export default function SideBar() {
    const [sideBarList, setSideBarList] = useState([]);
    const [addDialogOpen, setAddDialogOpen] = useState(false);

    const [tableEditIndex, setTableEditIndex] = useState(null);
    const { enqueueSnackbar } = useSnackbar();
    let history = useHistory();
    React.useEffect(() => {
        getSideBars().then((result) => {
            setSideBarList(result.data);
        });
    }, []);

    const tableColumns = [
        {
            label: 'ID',
            name: 'id',
        },
        
       
        {
            label: 'Arabic Name',
            name: 'name_ar',
            options: {
                setCellProps: (value) => ({
                    style: { minWidth: '200px' },
                }),
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
            label: 'English Name',
            name: 'name_en',
            options: {
                setCellProps: (value) => ({
                    style: { minWidth: '200px' },
                }),
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
                                        history.push('/AddPermissionToSideBar',{ sideBar_id: tableMeta.rowData[0]})
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
                                        // request['id'] = tableMeta.rowData[0];
                                        // request['name'] = tableMeta.rowData[1];
                                        // request['color'] = tableMeta.rowData[2];

                                        // UpdateStudio(request.id, request).then(
                                        //     (result) => {
                                        //         setTableEditIndex(null);

                                        //         setStudioList(result.data);

                                        //         enqueueSnackbar(
                                        //             'Updated successfully!',
                                        //             {
                                        //                 variant: 'success',
                                        //                 anchorOrigin: {
                                        //                     vertical: 'bottom',
                                        //                     horizontal:
                                        //                         'center',
                                        //                 },
                                        //             },
                                        //         );
                                        //     },
                                        // );
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
        filter: false,
        download: false,
        print: false,
        selectableRows: 'none',
        enableNestedDataAccess: '.',
        filterType: 'dropdown',
        rowHover: false,
        responsive: 'standard',
       // tableBodyHeight: '400px',
        pagination: false,
       // tableBodyMaxHeight: '400px',
    };

    return (
        <React.Fragment>
            <Box p={1} textAlign="end">
                <Fab
                    size="medium"
                    color="primary"
                    aria-label="add"
                    onClick={() => 
                        
                          history.push('/AddPermissionToSideBar')
                          //{ employee_id: tableData[item].employee_id }
                          
                       
                    }
                >
                    <AddIcon />
                </Fab>
            </Box>

            <MUIDataTable
                title={'SideBar'}
                data={sideBarList}
                columns={tableColumns}
                options={options}
            />

            {/* <AddRoles
                open={addDialogOpen}
                setRoleList={setSideBarList}
                onClose={handleDialogClose}
            /> */}
        </React.Fragment>
    );
}
