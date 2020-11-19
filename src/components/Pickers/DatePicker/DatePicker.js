import React from "react";
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

const Picker = ({ createdAt, setCreatedAt }) => {
  const classes = useStyles();
  return (
    <MuiThemeProvider theme={customTheme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker
          label={"Date"}
          value={createdAt}
          onChange={(date) => {
            setCreatedAt(date);
          }}
          format="DD.MM.YYYY"
          animateYearScrolling
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

export default Picker;
