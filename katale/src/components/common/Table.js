import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { StyledTableCell } from '../helperStyles';

const TableContainer = (props) => {
  const {renderTableBody, tableHeaders} = props;

  return (
    <React.Fragment>
      <Paper >
        <Table >
          <TableHead>
            <TableRow>
              {tableHeaders.map( header =>(
                <StyledTableCell key={header} align="left">
                  {header}
                </StyledTableCell>))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {renderTableBody()}
          </TableBody>
        </Table>
      </Paper>
    </React.Fragment>
  );
};

export default TableContainer;
