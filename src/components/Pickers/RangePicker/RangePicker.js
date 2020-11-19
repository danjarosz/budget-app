import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import MomentUtils from "@date-io/moment";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(() => ({
  picker: {
    marginRight: 12
  },
  input: {
    fontWeight: 300,
    fontSize: "1.8rem",
    maxWidth: 100,
    borderRadius: "0 !important"
  },
  inputLabel: {
    fontSize: "1.4rem"
  }
}))

export const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#364051"
    },
  }
})


const RangePicker = ({ startDate, endDate, setStartDate, setEndDate }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <MuiThemeProvider theme={customTheme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker
          label="Start date"
          value={startDate}
          maxDate={endDate || moment("2100-01-01")}
          onChange={(date) => {
            dispatch(setStartDate(date));
          }}
          format="DD.MM.YYYY"
          animateYearScrolling
          clearable={true}
          inputVariant={"outlined"}
          className={classes.picker}
          inputProps={{
            className: classes.input
          }}
          InputLabelProps={{
            className: classes.inputLabel
          }}
        />
        <DatePicker
          label="End date"
          value={endDate}
          minDate={startDate || moment("1900-01-01")}
          onChange={(date) => {
            dispatch(setEndDate(date));
          }}
          format="DD.MM.YYYY"
          animateYearScrolling
          clearable={true}
          inputVariant={"outlined"}
          inputProps={{
            className: classes.input
          }}
          InputLabelProps={{
            className: classes.inputLabel
          }}
        />
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
};

export default RangePicker;
