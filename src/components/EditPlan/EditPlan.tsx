import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '../TextField';

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
    border: `1px solid ${theme.palette.grey[700]}`,
  },
  tableCell: {
    borderColor: theme.palette.grey[700],
    textAlign: 'center',
    maxWidth: '80px',
    minWidth: '80px',

    [theme.breakpoints.down('xs')]: {
      minWidth: '50px',
    },
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

interface EditPlanProps {
  data: any;
  onChange: (value: any) => void;
}

const EditPlan = ({ data, onChange }: EditPlanProps) => {
  const classes = useStyles();
  const [editData, setEditData] = useState(data);
  const [training] = editData.map(({ training }: any) => training);
  onChange(editData);
  const handleAddInfoToTable = (
    itemId: number,
    seriesId: number,
    series: any[],
    value: number,
    type: string,
  ) => {
    setEditData(
      editData.map((item: any) => ({
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

  return (
    <>
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
                    <TableCell className={classes.tableCell}>
                      <TextField
                        type="number"
                        value={series.kg || 0}
                        id={`${id}`}
                        className={classes.textField}
                        onChange={(e: any) => {
                          handleAddInfoToTable(
                            item.id,
                            series.id,
                            series,
                            parseInt(e.target.value),
                            'kg',
                          );
                        }}
                        onInput={(e: any) => handleOnInput(e.target.value)}
                      />
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <TextField
                        type="number"
                        value={series.time || 0}
                        id={`${id}`}
                        className={classes.textField}
                        onChange={(e: any) =>
                          handleAddInfoToTable(
                            item.id,
                            series.id,
                            series,
                            parseInt(e.target.value),
                            'time',
                          )
                        }
                        onInput={(e: any) => handleOnInput(e.target.value)}
                      />
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <TextField
                        type="number"
                        value={series.repeat || 0}
                        id={`${id}`}
                        className={classes.textField}
                        onChange={(e: any) =>
                          handleAddInfoToTable(
                            item.id,
                            series.id,
                            series,
                            parseInt(e.target.value),
                            'repeat',
                          )
                        }
                        onInput={(e: any) => handleOnInput(e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ))}
      </TableContainer>
    </>
  );
};

export default EditPlan;
