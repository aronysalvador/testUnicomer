import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';

const row = (
  x,
  i,
  header
) => {
  return (
    <TableRow key={`tr-${i}`} selectable={false}>
      {header.map((y, k) => (
        <TableCell key={`trc-${k}`}>{x[y.prop]}</TableCell>
      ))}
    </TableRow>
  )
};

export default ({
  data,
  header
}) => (
  <Table>
    <TableHead style={{ backgroundColor: "#65A7FC"}}>
      <TableRow>
        {header.map((x, i) => (
          <TableCell key={`thc-${i}`}>
            <div
              style={{
                display: "flex",
                alignItems: "center"
              }}
            >
              <span>{x.name}</span>
            </div>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map((x, i) =>
        row(
          x,
          i,
          header
        )
      )}
    </TableBody>
  </Table>
);
