import React from 'react';

export default function CustomTableHead({ classes, headCell }) {
    return (
        <thead className={'MuiTableHead-root'}>
            {Object.values(headCell).map((tr, i) => (
                <tr key={i} className="MuiTableRow-root MuiTableRow-head">
                    {tr.map((cell, j) => (
                        <th
                            key={j}
                            className="MuiTableCell-root MuiTableCell-head "
                            rowSpan={cell.row}
                            colSpan={cell.col}
                        >
                            {cell.name}
                        </th>
                    ))}
                </tr>
            ))}
        </thead>
    );
}
