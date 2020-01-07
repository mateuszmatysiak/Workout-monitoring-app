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
  kg: '',
  time: '',
  repeat: '',
};

const ExercisesSeriesTable = ({ data, setData }: ExercisesSeriesTableProps) => {
  const classes = useStyles();
  console.log(data);

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
          {data.map((item: any, index: number) => {
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
