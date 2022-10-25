import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import { Box, CircularProgress, TextField } from '@material-ui/core';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import PopoverViewCol from '../PopoverViewCol';
import { TableViewCol, TableFilter } from 'mui-datatables';
import PopoverFilterTable from '../PopoverFilterTable';
import FilterIcon from '@material-ui/icons/FilterList';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect, useRef } from 'react';
import {
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,

    Snackbar,
} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
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
        //  backgroundColor: '#9bc9cb',
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
}));

import {
    LoadListsName,
    LoadList,
    AddItemList,
    DeleteKeyItem,
} from '../../api/administration/systemKey';
export default function CustomTableToolbarAnotherStyleList(props) {
    const classes = useStyles();
    const [value, setValue] = useState(null);
    const [iconActive, setIconActive] = useState(null);
    const [showSearch, setShowSearch] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [hideFilterPopover, setHideFilterPopover] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const handleClick = () => { };
    const {
        data,
        options,
        columns,
        filterData,
        filterList,
        filterUpdate,
        resetFilters,
        toggleViewColumn,
        updateColumns,
        title,
        updateFilterByType,
        displayData,
        components = {},
        icons,
        setSelectedList,
        setTableAction,
        connectingRef
    } = props;
    const getActiveIcon = (styles, iconName) => {
        let isActive = iconActive === iconName;
        if (iconName === 'search') {
            //   const { showSearch, searchText } = this.state;
            isActive = isActive || showSearch || searchText;
        }
        return isActive ? styles.iconActive : styles.icon;
    };

    const isSearchShown = (iconName) => {
        let nextVal = false;
        if (showSearch) {
            if (searchText) {
                nextVal = true;
            } else {
                const { onSearchClose } = props.options;
                props.setTableAction('onSearchClose');
                if (onSearchClose) onSearchClose();
                nextVal = false;
            }
        } else if (iconName === 'search') {
            nextVal = showSearch();
        }
        return nextVal;
    };

    const setActiveIcon = (iconName) => {
alert(iconName)
if (iconActive === 'filter') {
    props.setTableAction('onFilterDialogOpen');
    if (props.options.onFilterDialogOpen) {
        props.options.onFilterDialogOpen();
    }
}
    /*    this.setState(
            (prevState) => ({
                showSearch: isSearchShown(iconName),
                iconActive: iconName,
                prevIconActive: prevState.iconActive,
            }),

            () => {
            const { iconActive, prevIconActive } = this.state;

            if (iconActive === 'filter') {
                props.setTableAction('onFilterDialogOpen');
                if (props.options.onFilterDialogOpen) {
                    props.options.onFilterDialogOpen();
                }
            }
            if (iconActive === undefined && prevIconActive === 'filter') {
                props.setTableAction('onFilterDialogClose');
                if (props.options.onFilterDialogClose) {
                    props.options.onFilterDialogClose();
                }
            }
        },
        );*/
    };

    const handleSearch = (event) => {
        //this.setState({ searchText: event.target.value });
        setSearchText(event.target.value)
        props.searchTextUpdate(event.target.value);
    };
 

    const [ListsName, setListsName] = useState([]);

    useEffect(() => {
        LoadListsName().then((result) => {

            if (!result.error_code) {
               setIsLoading(false);
                setListsName(result.data.list_names);
            }
        });
    }, []);


    const handleSelectedListChange = (e) => {
        setSelectedList(e.target.value);
        setValue(e.target.value);

      //  LoadListFunction(e.target.value);
    };


    const TableViewColComponent = components.TableViewCol || TableViewCol;
    const TableFilterComponent = components.TableFilter || TableFilter;

    const {
        search,
        downloadCsv,
        print,
        viewColumns,
        filterTable,
    } = options.textLabels.toolbar;

    const closeFilterPopover = () => {
        //  this.setState({ hideFilterPopover: true });
        setHideFilterPopover(true)
    };

    return (
        <React.Fragment>
            <Box
                display="flex"
                alignItems="center"
                className={classes.boxContainer}
            >
                <Box className={classes.tableTitle}>
                    <FormControl variant="outlined">
                        <InputLabel>List</InputLabel>
                        <Select
                            value={value}
                            onChange={handleSelectedListChange}
                            size="small"
                           // disabled={!connectingRef}
                            style={{ width: '215px', height: '50px ' }}
                            label="List"
                        >
                            {ListsName.map((item, i) => (
                                <MenuItem key={i} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box className={classes.displayData} marginX={1}>
                    {!isLoading && displayData.length}
                    {isLoading && (
                        <CircularProgress
                            size={20}
                            style={{
                                position: 'relative',
                                top: 4,
                            }}
                        />
                    )}
                </Box>
                <Box flexGrow={1} marginX={1}>
                    <TextField
                        className={classes.searchField}
                        style={{ marginLeft: '30%', width: '70%' }}
                        label="Search"
                        variant="outlined"
                        size="small"
                        value={searchText || ''}
                        onChange={handleSearch}
                    />
                </Box>

                <Box>


                    <PopoverViewCol
                        refExit={setActiveIcon.bind(null)}
                        classes={{ closeIcon: classes.filterCloseIcon }}
                        trigger={
                            <Tooltip
                                title={viewColumns}
                                disableFocusListener
                            >
                                <IconButton
                                    data-testid={
                                        viewColumns + '-iconButton'
                                    }
                                    aria-label={viewColumns}
                                    classes={{
                                        root: getActiveIcon(
                                            classes,
                                            'viewcolumns',
                                        ),
                                    }}
                                    onClick={setActiveIcon.bind(
                                        null,
                                        'viewcolumns',
                                    )}
                                >
                                    <ViewColumnIcon />
                                </IconButton>
                            </Tooltip>
                        }
                        content={
                            <TableViewColComponent
                                data={data}
                                columns={columns}
                                options={options}
                                onColumnUpdate={toggleViewColumn}
                                updateColumns={updateColumns}
                                components={components}
                            />
                        }
                    />
                    {(
                        false&&(
                        options.filter === false ||
                        options.filter === 'false')
                    ) && (
                            <PopoverViewCol
                                refExit={setActiveIcon.bind(null)}
                                hide={
                                    hideFilterPopover ||
                                    options.filter === 'disabled'
                                }
                                classes={{
                                    paper: classes.filterPaper,
                                    closeIcon: classes.filterCloseIcon,
                                }}
                                trigger={
                                    <Tooltip
                                        title={filterTable}
                                        disableFocusListener
                                    >
                                        <IconButton
                                            data-testid={
                                                filterTable + '-iconButton'
                                            }
                                            aria-label={filterTable}
                                            classes={{
                                                root: getActiveIcon(
                                                    classes,
                                                    'filter',
                                                ),
                                            }}
                                            disabled={
                                                options.filter === 'disabled'
                                            }
                                            onClick={setActiveIcon.bind(
                                                null,
                                                'filter',
                                            )}
                                        >
                                            <FilterIcon />
                                        </IconButton>
                                    </Tooltip>
                                }
                                content={
                                    <TableFilterComponent
                                        customFooter={
                                            options.customFilterDialogFooter
                                        }
                                        columns={columns}
                                        options={options}
                                        filterList={filterList}
                                        filterData={filterData}
                                        onFilterUpdate={filterUpdate}
                                        onFilterReset={resetFilters}
                                        handleClose={closeFilterPopover}
                                        updateFilterByType={updateFilterByType}
                                        components={components}
                                    />
                                }
                            />
                        )}
                    {icons &&
                        icons.map((icon, i) =>
                            icon.hasOwnProperty('permission') ? (
                                authManger.can(icon.permission) && (
                                    <Tooltip key={i} title={icon.title}>
                                        <IconButton
                                            className={classes.iconButton}
                                            onClick={icon.onClick}
                                        >
                                            <Fab
                                                color="primary"
                                                className={classes.fab}
                                                style={{
                                                    backgroundColor: '#389497',
                                                    outline: 'none',
                                                    width: '35px',
                                                    height: '35px',
                                                    marginTop: '2px',
                                                }}
                                            >
                                                {icon.icon}
                                                {/* <AddIcon style={{ fontSize: '33px' }} /> */}
                                            </Fab>

                                        </IconButton>
                                    </Tooltip>
                                )
                            ) : (
                                <Tooltip key={i} title={icon.title}>
                                    <IconButton
                                        className={classes.iconButton}
                                        onClick={icon.onClick}
                                    >
                                        {/* {icon.icon} */}
                                    </IconButton>
                                </Tooltip>
                            ),
                        )}
                </Box>
            </Box>
        </React.Fragment>
    );
}
