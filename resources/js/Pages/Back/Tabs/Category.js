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
    GetCategory,
    UpdateCategory,
} from '../../../../api/administration/systemKey';
import AddCategory from '../../../../components/Dialog/AddCategory';
import AddIcon from '@material-ui/icons/Add';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import { useSnackbar } from 'notistack';
import CustomTableToolbarAnotherStyle from '../../../../components/table/CustomTableToolbarAnotherStyle';
import CircleCheckbox from '../../../../components/table/CircleCheckbox';
export default function Category() {
    const [categoryList, setCategoryList] = useState([]);
    const [addDialogOpen, setAddDialogOpen] = useState(false);

    const [tableEditIndex, setTableEditIndex] = useState(null);
    const { enqueueSnackbar } = useSnackbar();
    const [isLoading, setIsLoading] = useState(true);
    React.useEffect(() => {
        GetCategory().then((result) => {
            setIsLoading(false);
            setCategoryList(result.data);
        });
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
            label: 'Color',
            name: 'color',
            options: {
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
                        <Box display="flex">
                            <div
                                style={{
                                    width: '10px',
                                    height: '30px',
                                    backgroundColor: '#' + value,
                                    margin: '-2px',
                                }}
                            ></div>
                            <div
                                style={{
                                    padding: '0px 8px',
                                    alignSelf: 'center',
                                }}
                            >
                                {value}
                            </div>
                        </Box>
                    ),
                setCellProps: (value) => ({
                    style: { padding: '0px 0px' , width:'10%'},
                }),
            },
        },
        {
            label: 'Name',
            name: 'name',
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
                                        request['color'] = tableMeta.rowData[2];

                                        UpdateCategory(
                                            request.id,
                                            request,
                                        ).then((result) => {
                                            setTableEditIndex(null);

                                            setCategoryList(result.data);

                                            enqueueSnackbar(
                                                'Updated successfully!',
                                                {
                                                    variant: 'success',
                                                    anchorOrigin: {
                                                        vertical: 'bottom',
                                                        horizontal: 'center',
                                                    },
                                                },
                                            );
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

    const handleChangeSelectedRow = (
        currentRowsSelected,
        allRowsSelected,
        rowsSelected,
    ) => {
        /*let tmpArr = [];
        rowsSelected.map((i) => {
            tmpArr.push(loadedLists[i][1]);
        });
        setSelectedRow(tmpArr);*/
    };
     const handleClickOpen =() =>{
        setAddDialogOpen(true)
     }
    const handleDeleteSelectedRow = (lookup, data, dataIndex) => {};

    const options = {
        filter: false,
        download: false,
        print: false,
        selectableRows: 'none',
        rowHover: false,
        filterType: 'dropdown',
        responsive: 'standard',
///tableBodyHeight: '400px',
        pagination: false,
       // tableBodyMaxHeight: '400px',
        onRowSelectionChange: handleChangeSelectedRow,
        onRowsDelete: handleDeleteSelectedRow,
    };

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
                title={'Category'}
                data={categoryList}
                columns={tableColumns}
                options={options}
                components={{
                    Checkbox: CircleCheckbox,
                    TableToolbar: (props) => (
                        <CustomTableToolbarAnotherStyle
                            {...props}
                            isLoading={isLoading}
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

            <AddCategory
                open={addDialogOpen}
                setCategoryList={setCategoryList}
                onClose={handleDialogClose}
            />
        </React.Fragment>
    );
}
