import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  tableHeader: {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.common.white,
    top: 0,
    left: 0,
    zIndex: 2,
    position: 'sticky',
  },
  fontWhite: {
    color: theme.palette.common.white,
  },
  container: {
    maxHeight: 440,
    backgroundColor: theme.palette.secondary.main,
  },
  textField: {
    width: '10%',
  },
  textFieldBorder: {
    borderWidth: '1px',
    borderColor: `${theme.palette.grey[300]} !important`,
    color: theme.palette.grey[300],
  },
  textFieldFont: {
    color: theme.palette.grey[300],
    padding: '8px 4px 8px 12px',
  },
}));

// const data = [{ name: 'Biceps' }, { name: 'Triceps' }];

interface ExercisesSeriesTableProps {
  data: any[];
}

const ExercisesSeriesTable = ({ data }: ExercisesSeriesTableProps) => {
  const classes = useStyles();
  const [value, setValue] = useState('1');
  const seriesData = data.map((item: any, index) => ({
    id: index,
    name: item,
    value: value,
  }));

  console.log(seriesData);

  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeader}>Rodzaj ćwiczenia</TableCell>
            <TableCell className={classes.tableHeader} align="right">
              Ilość serii
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {seriesData.map((item: any, index: number) => {
            return (
              <TableRow key={index}>
                <TableCell className={classes.fontWhite} scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="right">
                  <TextField
                    type="number"
                    variant="outlined"
                    defaultValue={1}
                    id={`${index}`}
                    className={classes.textField}
                    onChange={(e: any) => setValue(e.target.value)}
                    InputProps={{
                      classes: {
                        notchedOutline: classes.textFieldBorder,
                        input: classes.textFieldFont,
                      },
                    }}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExercisesSeriesTable;
