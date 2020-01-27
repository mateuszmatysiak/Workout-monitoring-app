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
  tableContainer: {
    borderBottom: 'unset',
    background: '#424242',
    border: `1px solid ${theme.palette.grey[700]}`,
    boxShadow: 'unset',
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
    <TableContainer component={Paper} className={classes.tableContainer}>
      {(data || []).map(({ name, series }: any, index: any) => {
        return (
          <Table key={index}>
            <TableHead className={classes.tableHeader}>
              <TableRow>
                <TableCell style={{ width: '400px' }} className={classes.tableCell}>
                  {name}
                </TableCell>
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
              {series.map(({ id, kg, time, repeat }: any, index: any) => {
                return (
                  <TableRow key={index}>
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
  );
};

export default TrainingPlanTable;
