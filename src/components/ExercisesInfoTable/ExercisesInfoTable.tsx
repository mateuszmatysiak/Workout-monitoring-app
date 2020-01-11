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
    position: 'sticky',
    top: 0,
    left: 0,
    zIndex: 2,
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.common.white,
    borderColor: theme.palette.grey[700],
  },
  titleTable: {
    width: '70%',
    color: theme.palette.common.white,
    borderColor: theme.palette.grey[700],
  },
  container: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 0,
    boxShadow: 'unset',
  },
  tableCell: {
    borderColor: theme.palette.grey[700],
    textAlign: 'center',
    maxWidth: '60px',
  },
  textField: {
    minWidth: '40px',
    maxWidth: '60px',
  },
  textFieldBorder: {
    borderWidth: '1px',
    borderColor: `${theme.palette.grey[300]} !important`,
    color: theme.palette.grey[300],
    borderRadius: 0,
    border: 'none',
    borderBottom: `2px solid ${theme.palette.grey[300]}`,
  },
  textFieldFont: {
    color: theme.palette.grey[300],
    padding: '8px 4px 8px 12px',
  },
}));

interface ExercisesInfoTableProps {
  data: any;
  setData: any;
}

const ExercisesInfoTable = ({ data, setData }: ExercisesInfoTableProps) => {
  const classes = useStyles();
  return (
    <TableContainer className={classes.container} component={Paper}>
      {data.map((item: any, index: number) => (
        <Table key={index}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeader}>{item.name}</TableCell>
              <TableCell className={classes.tableHeader} align="center">
                Ciężar [kg]
              </TableCell>
              <TableCell className={classes.tableHeader} align="center">
                Czas [m]
              </TableCell>
              <TableCell className={classes.tableHeader} align="center">
                Powt.
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {item.series.map((series: any, id: any) => {
              return (
                <TableRow key={id}>
                  <TableCell className={classes.titleTable} scope="row">
                    Seria {series.id + 1}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <TextField
                      type="number"
                      variant="outlined"
                      className={classes.textField}
                      value={series.kg}
                      id={`${id}`}
                      onChange={(e: any) => {
                        setData(
                          data.map((elem: any) => {
                            if (elem.id === item.id) {
                              return {
                                ...elem,
                                series: elem.series.map((ser: any) => {
                                  if (ser.id === series.id) {
                                    return {
                                      ...series,
                                      kg: e.target.value,
                                    };
                                  }
                                  return ser;
                                }),
                              };
                            }
                            return elem;
                          }),
                        );
                      }}
                      InputProps={{
                        classes: {
                          notchedOutline: classes.textFieldBorder,
                          input: classes.textFieldFont,
                        },
                      }}
                      inputProps={{
                        min: 1,
                        max: 999,
                      }}
                      onInput={(e: any) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 3);
                      }}
                    />
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <TextField
                      type="number"
                      variant="outlined"
                      className={classes.textField}
                      value={series.time}
                      id={`${id}`}
                      onChange={(e: any) => {
                        setData(
                          data.map((elem: any) => {
                            if (elem.id === item.id) {
                              return {
                                ...elem,
                                series: elem.series.map((ser: any) => {
                                  if (ser.id === series.id) {
                                    return {
                                      ...series,
                                      time: e.target.value,
                                    };
                                  }
                                  return ser;
                                }),
                              };
                            }
                            return elem;
                          }),
                        );
                      }}
                      InputProps={{
                        classes: {
                          notchedOutline: classes.textFieldBorder,
                          input: classes.textFieldFont,
                        },
                      }}
                      inputProps={{
                        min: 1,
                        max: 999,
                      }}
                      onInput={(e: any) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 3);
                      }}
                    />
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <TextField
                      type="number"
                      variant="outlined"
                      className={classes.textField}
                      value={series.repeat}
                      id={`${id}`}
                      onChange={(e: any) => {
                        setData(
                          data.map((elem: any) => {
                            if (elem.id === item.id) {
                              return {
                                ...elem,
                                series: elem.series.map((ser: any) => {
                                  if (ser.id === series.id) {
                                    return {
                                      ...series,
                                      repeat: e.target.value,
                                    };
                                  }
                                  return ser;
                                }),
                              };
                            }
                            return elem;
                          }),
                        );
                      }}
                      InputProps={{
                        classes: {
                          notchedOutline: classes.textFieldBorder,
                          input: classes.textFieldFont,
                        },
                      }}
                      inputProps={{
                        min: 1,
                        max: 999,
                      }}
                      onInput={(e: any) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 3);
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
