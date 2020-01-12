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
  textFieldBorder: {
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

interface ExercisesSeriesTableProps {
  data: any[];
  setData: any;
}

let arr: Array<any> = [];
function createCopies(obj: any, copies: any, arrLength: any) {
  let addedSeries = getNumber(arr, obj.exname);
  let diff = Math.abs(copies - addedSeries);
  if (addedSeries > copies) {
    for (let j = 0; j < diff; j++) {
      let params = getParams(arr, 'exname');
      let index = params.lastIndexOf(obj.exname);
      if (index > -1) {
        arr.splice(index, 1);
      }
    }
  } else {
    if (addedSeries > 0 && addedSeries < copies) {
      let ids = getParams(arr, 'id');
      for (let i = 0; i <= arrLength + diff; i++) {
        if (isEmpty(ids, i)) {
          let newObj = JSON.parse(JSON.stringify(obj));
          newObj.id = i;
          arr.push(newObj);
          if (arrLength + diff === arr.length) {
            break;
          }
        }
      }
    }
    if (addedSeries === 0) {
      for (let i = arrLength; i < copies + arrLength; i++) {
        let newObj = JSON.parse(JSON.stringify(obj));
        newObj.id = i;
        arr.push(newObj);
      }
    }
  }
  return arr;
}

function getNumber(seriesArray: any, ex: any) {
  let seriesQuantity = 0;
  seriesArray.filter((obj: any) => {
    if (obj.exname === ex) {
      seriesQuantity++;
    }
    return null;
  });
  return seriesQuantity;
}

function isEmpty(idsArray: any, i: any) {
  if (idsArray.indexOf(i) < 0) {
    return true;
  } else return false;
}

function getParams(seriesArray: any, param: any) {
  let params = [];
  let x;
  for (x of seriesArray) {
    params.push(x[param]);
  }
  return params;
}

let obj = {
  id: '',
  kg: '1',
  time: '1',
  repeat: '1',
};

const ExercisesSeriesTable = ({ data, setData }: ExercisesSeriesTableProps) => {
  const classes = useStyles();
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
          {data.map((item: any, index: number) => {
            return (
              <TableRow key={index}>
                <TableCell className={classes.tableCell} scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="right" className={classes.tableCell}>
                  <TextField
                    type="number"
                    variant="outlined"
                    value={data[index].series.length}
                    id={`${index}`}
                    className={classes.textField}
                    onChange={(e: any) => {
                      setData(
                        data.map((item: any) => ({
                          ...item,
                          series:
                            `${item.id}` === e.target.id
                              ? createCopies(obj, parseInt(e.target.value), arr.length)
                              : item.series.map((item: any) => item),
                        })),
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
    </TableContainer>
  );
};

export default ExercisesSeriesTable;
