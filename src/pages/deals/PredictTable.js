import { useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Gradient from "javascript-color-gradient";


const headCells = [
  {
    id: 'symbol',
    align: 'left',
    disablePadding: false,
    label: 'Symbol'
  },
  {
    id: 'marketCap',
    align: 'left',
    disablePadding: false,
    label: 'Market Capitalisation'
  },
  {
    id: 'price',
    align: 'left',
    disablePadding: true,
    label: 'price'
  },
  {
    id: 'high_0_1',
    align: 'left',
    disablePadding: false,
    label: 'High 0-1%'
  },
  {
    id: 'high_1_2',
    align: 'left',
    disablePadding: false,
    label: 'High 0-1%'
  },
  {
    id: 'high_2_5',
    align: 'left',
    disablePadding: false,
    label: 'High 2-5%'
  },
  {
    id: 'high_5_10',
    align: 'left',
    disablePadding: false,
    label: 'High 5-10%'
  },
  {
    id: 'high_10',
    align: 'left',
    disablePadding: false,
    label: 'High 10% and more'
  },
  {
    id: 'low_0_1',
    align: 'left',
    disablePadding: false,
    label: 'Low 0-1%'
  },
  {
    id: 'low_1_2',
    align: 'left',
    disablePadding: false,
    label: 'Low 0-1%'
  },
  {
    id: 'low_2_5',
    align: 'left',
    disablePadding: false,
    label: 'Low 2-5%'
  },
  {
    id: 'low_5_10',
    align: 'left',
    disablePadding: false,
    label: 'Low 5-10%'
  },
  {
    id: 'low_10',
    align: 'left',
    disablePadding: false,
    label: 'Low 10% and more'
  },
  {
    id: 'EV',
    align: 'left',
    disablePadding: false,
    label: 'EV'
  }
];


const PredictTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function PredictTable(props) {
  const {predicts} = props
  const colorCellFromValue = (value, midpoint = 60) => {
    const getColorIndex = Math.round(midpoint * value);
    const gradientArray = new Gradient()
      .setColorGradient("#ffffb2", "#fecc5c", "#fd8d3c", "#f03b20", "#bd0026")
      .setMidpoint(midpoint)
    return gradientArray.getColor(getColorIndex === 0 ? 0.01 : getColorIndex);
  };
  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          sx={{
            '& .MuiTableCell-root:first-of-type': {
              pl: 2
            },
            '& .MuiTableCell-root:last-of-type': {
              pr: 3
            }
          }}
        >
          <PredictTableHead />
          <TableBody>
            {predicts.map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  tabIndex={-1}
                  key={index}
                >
                  <TableCell component="th" id={labelId} scope="row" align="left">{row.symbol}</TableCell>
                  <TableCell align="right">{row.marketCap}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell sx={{ bgcolor: colorCellFromValue(row.w_high_0_1.toFixed(5)) }} align="right">{row.w_high_0_1.toFixed(5)}</TableCell>
                  <TableCell sx={{ bgcolor: colorCellFromValue(row.w_high_1_2.toFixed(5)) }} align="right">{row.w_high_1_2.toFixed(5)}</TableCell>
                  <TableCell sx={{ bgcolor: colorCellFromValue(row.w_high_2_5.toFixed(5)) }} align="right">{row.w_high_2_5.toFixed(5)}</TableCell>
                  <TableCell sx={{ bgcolor: colorCellFromValue(row.w_high_5_10.toFixed(5)) }} align="right">{row.w_high_5_10.toFixed(5)}</TableCell>
                  <TableCell sx={{ bgcolor: colorCellFromValue(row.w_high_10.toFixed(5)) }} align="left">{row.w_high_10.toFixed(5)}</TableCell>
                  <TableCell sx={{ bgcolor: colorCellFromValue(row.w_low_0_1.toFixed(5)) }} align="right">{row.w_low_0_1.toFixed(5)}</TableCell>
                  <TableCell sx={{ bgcolor: colorCellFromValue(row.w_low_1_2.toFixed(5)) }} align="right">{row.w_low_1_2.toFixed(5)}</TableCell>
                  <TableCell sx={{ bgcolor: colorCellFromValue(row.w_low_2_5.toFixed(5)) }} align="right">{row.w_low_2_5.toFixed(5)}</TableCell>
                  <TableCell sx={{ bgcolor: colorCellFromValue(row.w_low_5_10.toFixed(5)) }} align="right">{row.w_low_5_10.toFixed(5)}</TableCell>
                  <TableCell sx={{ bgcolor: colorCellFromValue(row.w_low_10.toFixed(5)) }} align="left">{row.w_low_10.toFixed(5)}</TableCell>
                  <TableCell align="right">{row.EV.toFixed(5)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
