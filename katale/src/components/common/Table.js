import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { StyledTableCell } from '../helperStyles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
}));

const TableContainer = (props) => {
  const {renderTableBody, tableHeaders} = props;

  return (
    <React.Fragment>
      <Paper className={useStyles.root}>
        <Table className={useStyles.table}>
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
