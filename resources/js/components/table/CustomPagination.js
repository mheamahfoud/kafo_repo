
import {
     gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid';
import { useSelector } from 'react-redux'

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import PropTypes from 'prop-types';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import React from 'react';
import { prefixer } from "stylis";
import { globalSelector } from '../../redux/features/global_slice';
const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin]
});
const themeRtl = createTheme({
    direction: "rtl" // Both here and <body dir="rtl">
});
const themeLtr = createTheme({
    direction: "ltr" // Both here and <body dir="ltr">
});
export default function CustomPagination() {
    const apiRef = useGridApiContext();
    const {lang} = useSelector(globalSelector)
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
    const [direction, setDirection] = React.useState("ltr");
    return (
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={lang=='ar' ? themeRtl : themeLtr}>
                <Pagination

                    color="primary"
                    variant="outlined"
                    shape="rounded"
                    page={page + 1}
                    count={pageCount}
                    // @ts-expect-error
                    renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
                    onChange={(event, value) => apiRef.current.setPage(value - 1)}
                />
            </ThemeProvider>
        </CacheProvider>
    );
}