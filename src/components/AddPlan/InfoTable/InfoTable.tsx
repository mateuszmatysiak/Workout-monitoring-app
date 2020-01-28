import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '../../TextField';

const useStyles = makeStyles(theme => ({
  tableHeader: {
    position: 'sticky',
    top: 0,
    left: 0,
    zIndex: 2,
    backgroundColor: theme.palette.secondary.light,
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
  data: any[];
  setData: (value: any) => void;
}

const InfoTable = ({ data, setData }: ExercisesInfoTableProps) => {
  const classes = useStyles();
  const [training] = data.map(({ training }: any) => training);

  const handleAddInfoToTable = (
    itemId: number,
    seriesId: number,
    series: any[],
    value: number,
    type: string,
  ) => {
    setData(
      data.map((item: any) => ({
        ...item,
        training: training.map((elem: any) => {
          if (elem.id === itemId) {
            return {
              ...elem,
              series: elem.series.map((ser: any) => {
                if (ser.id === seriesId) {
                  return {
                    ...series,
                    [type]: value,
                  };
                }
                return ser;
              }),
            };
          }
          return elem;
        }),
      })),
    );
  };

  const handleOnInput = (value: string) => {
    value = Math.max(0, parseInt(value))
      .toString()
      .slice(0, 3);
  };

  const createTextField = (
    value: number,
    id: any,
    itemId: number,
    seriesId: number,
    series: any,
    type: any,
  ) => (
    <TableCell className={classes.tableCell}>
      <TextField
        type="number"
        value={value || 0}
        id={`${id}`}
        className={classes.textField}
        onChange={(e: any) => {
          handleAddInfoToTable(
            itemId,
            seriesId,
            series,
            parseInt(e.target.value.replace(/\D/, '')),
            type,
          );
        }}
        onInput={(e: any) => handleOnInput(e.target.value)}
      />
    </TableCell>
  );

  return (
    <TableContainer className={classes.container} component={Paper}>
      {training.map((item: any, index: number) => (
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
                  {createTextField(series.kg, id, item.id, series.id, series, 'kg')}
                  {createTextField(series.time, id, item.id, series.id, series, 'time')}
                  {createTextField(series.repeat, id, item.id, series.id, series, 'repeat')}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ))}
    </TableContainer>
  );
};

export default InfoTable;
