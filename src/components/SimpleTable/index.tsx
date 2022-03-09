import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { rowsType } from "util/common.types";
import "./style.css";

import StyledTableCell from "./StyledTableCell";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

type TSimpleTableProps = {
  rows: rowsType[];
};

const SimpleTable = ({ rows = [] }: TSimpleTableProps) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              {rows &&
                rows.length > 0 &&
                rows[0].data.map((row) => (
                  <StyledTableCell key={`${row.label}`}>
                    {row.label}
                  </StyledTableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(({ paymentId, data = [] }: rowsType) => (
              <StyledTableRow key={paymentId}>
                {data.map((item) => (
                  <StyledTableCell
                    key={`${paymentId}-${item.value}`}
                    component="th"
                    scope="row"
                  >
                    {item.value}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default React.memo(SimpleTable);
