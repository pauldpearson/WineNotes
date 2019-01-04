import React from 'react';
import {
  Card,
  IconButton,
  CardActions,
  CardActionArea,
  CardContent,
  Typography,
  withStyles,
} from '@material-ui/core';
import { MdMoreVert } from 'react-icons/md';
import { TiWine } from 'react-icons/ti';

const isIEorFF = navigator.userAgent.indexOf('Firefox') !== -1 || navigator.userAgent.indexOf('MSIE') !== -1 || document.documentMode;
const nameLength = isIEorFF ? {
  overflow: 'hidden',
  lineHeight: '1em',
  maxHeight: '2em',
  textOverflow: 'ellipsis',
}
  : {
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': '3',
    '-webkit-box-orient': 'vertical',
  };

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'row',
    minWidth: 275,
    margin: '2px 0',
    height: 125,
  },
  photo: {
    alignContent: 'center',
    padding: 4,
    height: '100%',
    width: '40px',
    marginLeft: '18px',
  },
  pos: {
    marginBottom: 12,
  },
  actionArea: {
    width: '80%',
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '10%',
  },
  nameLength,
};

function WineNoteCard(props) {
  const { classes, note } = props;

  return (
    <Card className={classes.card}>
      <TiWine className={classes.photo} />
      <CardActionArea className={classes.actionArea}>
        <CardContent>
          <Typography variant="subheading" component="p" className={classes.nameLength}>
            {note.name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
          Date:
            {' '}
            {note.date}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.actions}>
        <IconButton color="inherit">
          <MdMoreVert />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default withStyles(styles)(WineNoteCard);
