import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
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
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles(theme => ({
  card: {
    width: '50%',
  },
  root: {
    margin: 'auto',
    color: theme.palette.grey[300],
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.grey[300],
    borderBottom: `1px solid ${theme.palette.grey[700]}`,
  },
  list: {
    height: 550,
    backgroundColor: theme.palette.secondary.main,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
    color: theme.palette.grey[300],
    backgroundColor: theme.palette.secondary.main,
  },
  checkbox: {
    color: theme.palette.grey[300],
  },
  text: {
    color: theme.palette.grey[300],
  },
  textField: {
    backgroundColor: theme.palette.secondary.main,
    width: '100%',
    padding: '8px',
  },
  textFieldBorder: {
    borderWidth: '1px',
    borderColor: `${theme.palette.grey[500]} !important`,
    color: theme.palette.grey[500],
  },
  textFieldFont: {
    color: theme.palette.grey[500],
    padding: '8px 4px 8px 12px',
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

const not = (a: number[], b: number[]) => a.filter(value => b.indexOf(value) === -1);

const intersection = (a: number[], b: number[]) => a.filter(value => b.indexOf(value) !== -1);

const union = (a: number[], b: number[]) => [...a, ...not(b, a)];

interface ExercisesTransferListProps {
  left: any;
  setLeft: any;
  right: any;
  setRight: any;
}

const ExercisesTransferList = ({ left, setLeft, right, setRight }: ExercisesTransferListProps) => {
  const classes = useStyles();
  const [checked, setChecked] = useState<number[]>([]);

  console.log(left, right);
  const leftChecked = intersection(checked, left);
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
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const itemList = (title: React.ReactNode, items: number[]) => (
    <Card>
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
        subheaderTypographyProps={{ className: classes.text }}
      />
      <TextField
        placeholder="Wyszukaj"
        variant="outlined"
        className={classes.textField}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon style={{ color: '#9e9e9e' }} />
            </InputAdornment>
          ),
          classes: {
            notchedOutline: classes.textFieldBorder,
            input: classes.textFieldFont,
          },
        }}
      />
      <List className={classes.list} dense component="div" role="list">
        {items.map((value: number) => {
          return (
            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <CustomCheckBox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText className={classes.text} id={`${value}`} primary={value} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
      <Grid xs={5} item>
        {itemList('Wybory', not(left, right))}
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="large"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="large"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid xs={5} item>
        {itemList('Wybrane', right)}
      </Grid>
    </Grid>
  );
};

export default ExercisesTransferList;
