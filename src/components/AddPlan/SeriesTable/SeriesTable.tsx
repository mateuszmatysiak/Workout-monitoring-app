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
import { arr, createCopies } from '../../../utils/createCopies';

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
  tableCell: {
    color: theme.palette.common.white,
    borderColor: theme.palette.grey[700],
  },
  container: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 0,
    boxShadow: 'unset',
  },
  textField: {
    width: '65px',
  },
}));

let obj = {
  id: 0,
  kg: 1,
  time: 1,
  repeat: 1,
};

interface ExercisesSeriesTableProps {
  data: any[];
  setData: (value: any) => void;
}

const SeriesTable = ({ data, setData }: ExercisesSeriesTableProps) => {
  const classes = useStyles();
  const [training] = data.map(({ training }: any) => training);

  const handleCreateSeries = (value: string, id: string, arr: number) => {
    setData(
      data.map((item: any) => ({
        ...item,
        training: item.training.map((item: any) => ({
          ...item,
          series:
            `${item.id}` === id
              ? createCopies(obj, parseInt(value), arr)
              : item.series.map((item: any) => item),
        })),
      })),
    );
  };

  const handleOnInput = (value: string) => {
    value = Math.max(0, parseInt(value))
      .toString()
      .slice(0, 3);
  };

  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeader}>Rodzaj ćwiczenia</TableCell>
            <TableCell className={classes.tableHeader} align="right">
              Ilość serii
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {training.map(({ name }: any, index: number) => {
            return (
              <TableRow key={index}>
                <TableCell className={classes.tableCell} scope="row">
                  {name}
                </TableCell>
                <TableCell align="right" className={classes.tableCell}>
                  <TextField
                    type="number"
                    value={training[index].series.length}
                    id={`${index}`}
                    className={classes.textField}
                    onChange={(e: any) =>
                      handleCreateSeries(e.target.value, e.target.id, arr.length)
                    }
                    onInput={(e: any) => handleOnInput(e.target.value)}
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

export default SeriesTable;
