import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import AppBar from 'material-ui-next/AppBar';
import Avatar from 'material-ui-next/Avatar';
import Chip from 'material-ui-next/Chip';
import Toolbar from 'material-ui-next/Toolbar';
import Typography from 'material-ui-next/Typography';
import Button from 'material-ui-next/Button';
import Paper from 'material-ui-next/Paper';


const styles = theme => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    chip: {
      margin: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
      },
      paper: theme.mixins.gutters({
        paddingTop: 8,
        paddingBottom: 8,
        marginBottom :23,
        marginTop: theme.spacing.unit * 3,
      }),
  });

const Header = (props) => {
  const { classes , scores,winner, toggleScore, toggleMode, onPlay} = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
            <Paper className={classes.paper} elevation={4}>
                <Typography variant="headline" component="h3">
                Player 1 : <span style={{color : 'blue'}}>{scores.player1Score}</span>
                </Typography>
             </Paper>
             <Paper className={classes.paper} elevation={4}>
                <Typography variant="headline" component="h3">
                Player 2 : <span style={{color : 'blue'}}>{scores.player2Score}</span>
               
                </Typography>
             </Paper>
          <div>
             <Button variant="raised" color="primary" className={classes.button} onClick={()=>toggleScore()}>
                Toggle Score
            </Button>
            <Button variant="raised" color="primary" className={classes.button} onClick={()=>toggleMode()}>
                Toggle Mode
            </Button>
            {/* <Button variant="raised" color="primary" className={classes.button} onClick={()=>onPlay()}>
               Play
            </Button> */}
            </div>
        </Toolbar>
      </AppBar>
    
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);