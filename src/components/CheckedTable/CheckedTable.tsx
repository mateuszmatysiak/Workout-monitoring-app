import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  InputAdornment,
  Card,
  CardHeader,
} from '@material-ui/core';
import TextField from '../TextField';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  card: {
    height: '100%',
    borderRadius: 0,
    boxShadow: 'unset',
    backgroundColor: theme.palette.secondary.main,
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.grey[300],
    borderBottom: `1px solid ${theme.palette.grey[700]}`,
  },
  searchIcon: {
    color: theme.palette.grey[300],
    marginLeft: '12px',
  },
  textField: {
    width: '100%',
    borderLeft: `1px solid ${theme.palette.grey[700]}`,
    backgroundColor: theme.palette.secondary.main,

    [theme.breakpoints.down('sm')]: {
      borderLeft: `unset`,
    },
  },
  textFieldBorder: {
    borderWidth: '1px',
    borderColor: `${theme.palette.grey[700]} !important`,
    color: theme.palette.grey[300],
    borderRadius: 0,
    border: 'unset',
  },
  textFieldFont: {
    color: theme.palette.grey[300],
    padding: '12px 4px 12px 12px',
  },
  list: {
    height: 'calc(100% - 100px)',
    borderTop: `1px solid ${theme.palette.grey[700]}`,
    borderLeft: `1px solid ${theme.palette.grey[700]}`,
    borderBottom: `1px solid ${theme.palette.grey[700]}`,
    backgroundColor: theme.palette.secondary.main,
    overflow: 'auto',

    [theme.breakpoints.down('sm')]: {
      borderLeft: 'none',
      borderBottom: 'none',
    },
  },
  color: {
    color: theme.palette.grey[300],
  },
}));

const not = (a: any[], b: any[]) => a.filter(value => b.indexOf(value) === -1);

const intersection = (a: number[], b: number[]) => a.filter(value => b.indexOf(value) !== -1);

const union = (a: number[], b: number[]) => [...a, ...not(b, a)];

const removeDuplicates = (data: any) => {
  return data.filter(function(value: any, index: number, array: any) {
    return array.indexOf(value) === index;
  });
};

interface CheckedTableProps {
  data: any[];
  filteredData: any[];
  setFilteredData: (value: any) => void;
  title: string;
  checked: any[];
  setChecked: (value: any) => void;
}

const CheckedTable = ({
  data,
  filteredData,
  setFilteredData,
  title,
  checked,
  setChecked,
}: CheckedTableProps) => {
  const classes = useStyles();

  const CustomCheckBox = withStyles({
    root: {
      color: '#e0e0e0',
      '&$checked': {
        color: '#e0e0e0',
      },
    },
    checked: {},
  })((props: CheckboxProps) => <Checkbox color="primary" {...props} />);

  const handleToggleAll = (items: number[]) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items: number[]) => intersection(checked, items).length;

  const handleSetFiltered = (value: any, data: any) => {
    setFilteredData(
      removeDuplicates(data).filter((item: any) =>
        item.toLowerCase().includes(value.toLowerCase()),
      ),
    );
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <CustomCheckBox
            onClick={handleToggleAll(data)}
            checked={numberOfChecked(data) === data.length && data.length !== 0}
            indeterminate={numberOfChecked(data) !== data.length && numberOfChecked(data) !== 0}
            disabled={data.length === 0}
          />
        }
        title={title}
        subheader={`${numberOfChecked(data)}/${data.length} wybranych`}
        subheaderTypographyProps={{ className: classes.color }}
      />
      <TextField
        onChange={(e: any) => handleSetFiltered(e.target.value, data)}
        placeholder="Wyszukaj"
        className={classes.textField}
        Icon={
          <InputAdornment position="start">
            <SearchIcon className={classes.searchIcon} />
          </InputAdornment>
        }
        inputClasses={{
          notchedOutline: classes.textFieldBorder,
          input: classes.textFieldFont,
        }}
      />
      <List className={classes.list} dense component="div" role="list">
        {filteredData.map((value: number, index: number) => {
          return (
            <ListItem key={index} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <CustomCheckBox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText className={classes.color} id={`${value}`} primary={value} />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
};

export default CheckedTable;
