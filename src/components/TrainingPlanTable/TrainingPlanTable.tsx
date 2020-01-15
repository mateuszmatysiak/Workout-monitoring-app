import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles(theme => ({
  table: {
    padding: '16px',
    backgroundColor: theme.palette.secondary.main,
  },
  tableContainer: {
    border: '1px solid #e0e0e0',
    borderBottom: 'unset',
    background: '#424242',
    height: '100%',
  },
  tableHeader: {
    backgroundColor: theme.palette.secondary.light,
  },
  tableCell: {
    color: theme.palette.grey[300],
  },
}));

interface TrainingPlanTableProps {
  data: any;
}

const TrainingPlanTable = ({ data }: TrainingPlanTableProps) => {
  const classes = useStyles({});

  return (
    <div className={classes.table}>
      <TableContainer component={Paper} className={classes.tableContainer}>
        {(data || []).map(({ name, series }: any, index: any) => {
          return (
            <Table key={index}>
              <TableHead className={classes.tableHeader}>
                <TableRow>
                  <TableCell className={classes.tableCell}>{name}</TableCell>
                  <TableCell className={classes.tableCell} align="right">
                    Ciężar [kg]
                  </TableCell>
                  <TableCell className={classes.tableCell} align="right">
                    Czas [m]
                  </TableCell>
                  <TableCell className={classes.tableCell} align="right">
                    Powt.
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {series.map(({ id, kg, time, repeat }: any) => {
                  return (
                    <TableRow key={id}>
                      <TableCell className={classes.tableCell}>Seria {id + 1}</TableCell>
                      <TableCell className={classes.tableCell} align="right">
                        {kg}
                      </TableCell>
                      <TableCell className={classes.tableCell} align="right">
                        {time}
                      </TableCell>
                      <TableCell className={classes.tableCell} align="right">
                        {repeat}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          );
        })}
      </TableContainer>
    </div>
  );
};

export default TrainingPlanTable;
