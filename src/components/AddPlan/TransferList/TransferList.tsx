import React, { useState } from 'react';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Typography from '@material-ui/core/Typography';
import TextField from '../../TextField';
import AddNameToPlan from '../AddNameToPlan';

const useStyles = makeStyles(theme => ({
  card: {
    borderRadius: 0,
    boxShadow: 'unset',
  },
  root: {
    margin: 'unset',
    color: theme.palette.grey[300],
    height: 'calc(100% - 192px)',

    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.grey[300],
    borderBottom: `1px solid ${theme.palette.grey[700]}`,
  },
  listWrapper: {
    [theme.breakpoints.down('xs')]: {
      maxWidth: 'unset',
    },
  },
  list: {
    height: '450px',
    borderTop: `1px solid ${theme.palette.grey[700]}`,
    borderBottom: `1px solid ${theme.palette.grey[700]}`,
    backgroundColor: theme.palette.secondary.main,
    overflow: 'auto',

    [theme.breakpoints.down('xs')]: {
      height: '300px',
    },
  },
  buttonWrapper: {
    display: 'flex',
    padding: '32px 8px',
    backgroundColor: theme.palette.secondary.main,
    border: `1px solid ${theme.palette.grey[700]}`,
    borderBottom: 'unset',

    [theme.breakpoints.down('xs')]: {
      maxWidth: 'unset',
      borderLeft: 'unset',
      borderTop: `1px solid ${theme.palette.grey[700]}`,
    },
  },
  button: {
    margin: theme.spacing(0.5, 0),
    color: theme.palette.grey[300],
    borderColor: theme.palette.grey[300],
    backgroundColor: theme.palette.secondary.main,
  },
  color: {
    color: theme.palette.grey[300],
  },
  textField: {
    backgroundColor: theme.palette.secondary.main,
    width: '100%',
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
  searchIcon: {
    color: theme.palette.grey[300],
    marginLeft: '12px',
  },
  noItems: {
    padding: '16px',
    textAlign: 'center',
    color: theme.palette.grey[300],
  },
}));

const CustomCheckBox = withStyles({
  root: {
    color: '#e0e0e0',
    '&$checked': {
      color: '#e0e0e0',
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="primary" {...props} />);

const not = (a: any[], b: any[]) => a.filter(value => b.indexOf(value) === -1);

const intersection = (a: number[], b: number[]) => a.filter(value => b.indexOf(value) !== -1);

const union = (a: number[], b: number[]) => [...a, ...not(b, a)];

const removeDuplicates = (data: any) => {
  return data.filter(function(value: any, index: number, array: any) {
    return array.indexOf(value) === index;
  });
};

interface TransferListProps {
  left: any[];
  setLeft: (value: string[]) => void;
  right: any[];
  setRight: (value: string[]) => void;
  setData: (value: any) => void;
  setPlanName: (value: string) => void;
  planName: string;
}

const TransferList = ({
  left,
  setLeft,
  right,
  setRight,
  setData,
  planName,
  setPlanName,
}: TransferListProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));
  const [checked, setChecked] = useState<number[]>([]);
  const [filteredLeft, setFilteredLeft] = useState<String[]>(removeDuplicates(left));
  const [filteredRight, setFilteredRight] = useState<String[]>(right);

  const leftChecked = intersection(checked, removeDuplicates(left));
  const rightChecked = intersection(checked, right);

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

  const handleToggleAll = (items: number[]) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setFilteredRight(right.concat(leftChecked));
    setData([
      {
        name: planName,
        training: right.concat(leftChecked).map((item: any, index: any) => ({
          id: index,
          name: item,
          series: [{ id: 0, kg: 1, time: 1, repeat: 1 }],
        })),
      },
    ]);
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleSetFiltered = (value: any, title: any) => {
    title === 'Wybory'
      ? setFilteredLeft(
          removeDuplicates(left).filter((item: any) =>
            item.toLowerCase().includes(value.toLowerCase()),
          ),
        )
      : setFilteredRight(
          right.filter((item: any) => item.toLowerCase().includes(value.toLowerCase())),
        );
  };

  const itemList = (title: React.ReactNode, items: any[]) => (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <CustomCheckBox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} wybranych`}
        subheaderTypographyProps={{ className: classes.color }}
      />
      <TextField
        className={classes.textField}
        onChange={(e: any) => handleSetFiltered(e.target.value, title)}
        placeholder="Wyszukaj"
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
        {items.length ? (
          items.map((value: number, index: number) => {
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
          })
        ) : (
          <Typography className={classes.noItems}>
            {left.length === 0 ? 'Brak ćwiczeń do wybrania' : 'Brak wybranych ćwiczeń'}
          </Typography>
        )}
      </List>
    </Card>
  );

  return (
    <>
      <AddNameToPlan planName={planName} setPlanName={setPlanName} />
      <Grid container justify="center" className={classes.root}>
        <Grid xs={5} item className={classes.listWrapper}>
          {itemList('Wybory', not(filteredLeft, right).sort())}
        </Grid>
        <Grid item xs={2} className={classes.buttonWrapper}>
          <Grid container direction="column">
            <Button
              variant="outlined"
              size="large"
              className={classes.button}
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
            >
              {mobile ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
            </Button>
            <Button
              variant="outlined"
              size="large"
              className={classes.button}
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
            >
              {mobile ? <ArrowDropUpIcon /> : <ArrowLeftIcon />}
            </Button>
          </Grid>
        </Grid>
        <Grid xs={5} item className={classes.listWrapper}>
          {itemList('Wybrane', not(filteredRight, left))}
        </Grid>
      </Grid>
    </>
  );
};

export default TransferList;
