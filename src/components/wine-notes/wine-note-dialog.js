import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  TextField,
  MenuItem,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Select,
  DialogTitle,
  FormControl,
  InputLabel,
  FilledInput,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';

const varietals = [
  'Cabernet Sauvignon', 'Pinot Noir', 'Merlot',
  'Syrah', 'Shiraz', 'Malbec', 'Zinfandel', 'Tempranillo',
  'Sangiovese', 'Nebbiolo', 'Cabernet Franc', 'Petit Verdot',
  'Petite Sirah', 'Mourvèdre', 'Chardonnay', 'Sauvignon Blanc',
  'Chenin Blanc', 'Riesling', 'Viognier', 'Gewürztraminer',
  'Pinot Grigio', 'Pinot Gris', 'Pinot Blanc', 'Moscato',
  'Sémillon', 'Grüner Veltliner', 'Müller-Thurgau',
].sort();
const yMinusX = y => x => y - x;
const thisYearMinusX = yMinusX(new Date().getFullYear());
const vintages = [...Array(100).keys()].map(thisYearMinusX).map(x => `${x}`);

const styles = {
  formControl: {
    margin: '8px 0',
  },
};

class WineNoteDialog extends React.Component {
  state = {
    varietal: 'Blend',
    vintage: new Date().getFullYear().toString(),
    nonvintage: false,
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeCB = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const { open, handleClose, classes } = this.props;
    const { vintage, varietal, nonvintage } = this.state;

    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Wine Note</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="maker"
            label="Wine Maker"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="name"
            label="Wine Name (or other designation)"
            type="text"
            fullWidth
          />
          <FormControl variant="filled" className={classes.formControl} fullWidth>
            <InputLabel htmlFor="varietal">Varietal</InputLabel>
            <Select
              value={varietal}
              onChange={this.handleChange}
              input={<FilledInput name="varietal" id="varietal" />}
            >
              <MenuItem value="Blend">Blend/Non varietal</MenuItem>
              {
                varietals.map(v => (
                  <MenuItem value={v} key={v}>{v}</MenuItem>
                ))
            }
            </Select>
          </FormControl>
          <FormControl variant="filled" className={classes.formControl} disabled={nonvintage} fullWidth>
            <InputLabel htmlFor="vintage">Vintage</InputLabel>
            <Select
              value={vintage}
              onChange={this.handleChange}
              input={<FilledInput name="vintage" id="vintage" />}
            >
              {
                vintages.map(v => (
                  <MenuItem value={v} key={v}>{v}</MenuItem>
                ))
            }
            </Select>
          </FormControl>
          <FormControlLabel
            control={(
              <Checkbox
                checked={nonvintage}
                onChange={this.handleChangeCB}
                name="nonvintage"
                value="nonvintage"
              />
)}
            label="Non Vintage Wine"
          />
          <TextField
            margin="dense"
            id="region"
            label="Region/terroir"
            type="text"
            fullWidth
          />

          <TextField
            id="tastingNote"
            label="Wine Notes"
            multiline
            rowsMax="4"
            margin="normal"
            variant="outlined"
            fullWidth
          />

          <TextField
            id="technicalNote"
            label="Technical Notes"
            multiline
            rowsMax="4"
            margin="normal"
            variant="outlined"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
          Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
          Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}


export default withStyles(styles)(WineNoteDialog);
