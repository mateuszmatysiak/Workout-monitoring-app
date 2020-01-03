import React from 'react';
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
  tableHeader: {
    // width: '80%',
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
    // width: '0%',
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

const data = [
  { name: 'Biceps', series: [{ value: 1 }] },
  { name: 'Triceps', series: [{ value: 1 }, { value: 2 }, { value: 3 }] },
  { name: 'Scryzoryk', series: [{ value: 1 }, { value: 2 }] },
];

const ExercisesInfoTable = () => {
  const classes = useStyles();

  return (
    <TableContainer className={classes.container} component={Paper}>
      {data.map((item: any, index: number) => (
        <Table key={index}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeader}>{item.name}</TableCell>
              <TableCell className={classes.tableHeader} align="right">
                KG
              </TableCell>
              <TableCell className={classes.tableHeader} align="right">
                Czas
              </TableCell>
              <TableCell className={classes.tableHeader} align="right">
                Powtórzenia
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {item.series.map((item: any, id: any) => {
              return (
                <TableRow key={id}>
                  <TableCell style={{ width: '79%' }} className={classes.fontWhite} scope="row">
                    Seria {item.value}
                  </TableCell>
                  <TableCell style={{ width: '7%' }}>
                    <TextField
                      type="number"
                      variant="outlined"
                      //   className={classes.textField}
                      InputProps={{
                        classes: {
                          notchedOutline: classes.textFieldBorder,
                          input: classes.textFieldFont,
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell style={{ width: '7%' }}>
                    <TextField
                      type="number"
                      variant="outlined"
                      //   className={classes.textField}
                      InputProps={{
                        classes: {
                          notchedOutline: classes.textFieldBorder,
                          input: classes.textFieldFont,
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell style={{ width: '7%' }}>
                    <TextField
                      type="number"
                      variant="outlined"
                      //   className={classes.textField}
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
      ))}
    </TableContainer>
  );
};

export default ExercisesInfoTable;
