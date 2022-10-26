import StyledDataGrid from './StyledTable';
import CustomToolBar from './CustomToolBar';
import CustomPagination from './CustomPagination';
import AddIcon from '@mui/icons-material/Add';
import LinearIndeterminate from '../progressLoading/LinearIndeterminate';
import Fab from '@material-ui/core/Fab';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
export default function DataTable({ ...props }) {
    const { t } = useTranslation();
    return (
        <>
            <div style={{ height: 400, width: '100%' ,padding:'15px',color:'#ffff' }}>
                <StyledDataGrid
                    ///checkboxSelection
                    pageSize={10}
                    columns={props.columns}
                    density="compact"
                    showCellRightBorder
                    borderLeft
                    disableSelectionOnClick
                    WebkitFontSmoothingx
                    showColumnRightBorder
                    hideFooterSelectedRowCount
                    disableVirtualization={false}
                    columnBuffer={Number.MAX_SAFE_INTEGER}
                    hideFooterSelectedRowCountx
                    rows={props.rows}
                    loading={props.loading}
                    componentsProps={{
                        toolbar: {
                            showQuickFilter: true,
                            type:props?.type,
                            case_id:props?.case_id,
                            quickFilterProps: { debounceMs: 500 }, setAddDialogOpen: props.setAddDialogOpen,
                            addDisabled:props?.addDisabled
                        },
                    }}
                    rowsPerPageOptions={[5, 10, 20, 15]}
                    components={{
                        LoadingOverlay: LinearIndeterminate,
                        Pagination: CustomPagination,
                        Toolbar: CustomToolBar,
                    }}
                    disableExport
                    localeText={{
                        noRowsLabel: t('no_data'),
                        noResultsOverlayLabel: t('no_results_found'),
                        errorOverlayDefaultLabel: t('no_data'),

                        // Density selector toolbar button text
                        toolbarDensity: t('density'),
                        toolbarDensityLabel: t('density'),
                        toolbarDensityCompact: t('compact'),
                        toolbarDensityStandard: t('standard'),
                        toolbarDensityComfortable: t('comfortable'),






                        // Columns selector toolbar button text
                        toolbarColumns: t('columns'),
                        toolbarColumnsLabel: t('select_column'),




                        // Filters toolbar button text
                        toolbarFilters: t('filters'),
                        toolbarFiltersLabel: t('show_filters'),
                        toolbarFiltersTooltipHide: t('hide_filters'),
                        toolbarFiltersTooltipShow: t('show_filters'),
                        toolbarFiltersTooltipActive: (count) =>
                            count !== 1 ? `${count}  ${t('active_filters')}` : `${count}  ${t('active_filters')}`,







                        // Quick filter toolbar field
                        toolbarQuickFilterPlaceholder: t('search_dot'),
                        toolbarQuickFilterLabel: t('search'),
                        toolbarQuickFilterDeleteIconLabel: t('clear'),

                        // Export selector toolbar button text
                        toolbarExport: t('export'),
                        toolbarExportLabel: t('export'),
                        toolbarExportCSV: t('download_as_cv'),
                        toolbarExportPrint: t('print'),
                        toolbarExportExcel: t('download_as_excel'),




                        // Columns panel text
                        columnsPanelTextFieldLabel: t('find_column'),
                        columnsPanelTextFieldPlaceholder: t('column_title'),
                        columnsPanelDragIconLabel: t('reorder_column'),
                        columnsPanelShowAllButton: t('show_all'),
                        columnsPanelHideAllButton: t('hide_all'),



                        // Filter panel text
                        filterPanelAddFilter: t('add_filter'),
                        filterPanelDeleteIconLabel: t('delete'),
                        filterPanelLinkOperator: t('logic_operator'),
                        filterPanelOperators: t('operator'), // TODO v6: rename to filterPanelOperator
                        filterPanelOperatorAnd: t('and'),
                        filterPanelOperatorOr: t('or'),
                        filterPanelColumns: t('columns'),
                        filterPanelInputLabel: t('value'),
                        filterPanelInputPlaceholder: t('filter_value'),



                        // Filter operators text
                        filterOperatorContains: t('contains'),
                        filterOperatorEquals: t('equals'),
                        filterOperatorStartsWith: t('starts_with'),
                        filterOperatorEndsWith: t('ends_with'),
                        filterOperatorIs: t('is'),
                        filterOperatorNot: t('is_not'),
                        filterOperatorAfter: t('is_after'),
                        filterOperatorOnOrAfter: t('is_on_or_after'),
                        filterOperatorBefore: t('is_before'),
                        filterOperatorOnOrBefore: t('is_on_or_before'),
                        filterOperatorIsEmpty: t('is_empty'),
                        filterOperatorIsNotEmpty: t('is_not_empty'),
                        filterOperatorIsAnyOf: t('is_any_of'),






                        // Filter values text
                        filterValueAny: t('any'),
                        filterValueTrue: t('true'),
                        filterValueFalse: t('false'),




                        // Column menu text
                        columnMenuLabel: t('menu'),
                        columnMenuShowColumns: t('show_columns'),
                        columnMenuFilter: t('filter'),
                        columnMenuHideColumn: t('hide'),
                        columnMenuUnsort: t('unsort'),
                        columnMenuSortAsc: t('sort_by_asc'),
                        columnMenuSortDesc: t('sort_by_dec'),


                        footerTotalRows: t('total_rows'),

                    }}

                />
            </div>

        </>
    );
}