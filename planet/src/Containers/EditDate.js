import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import { Redirect } from 'react-router-dom';



const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },

  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
    textAlign: 'left'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  textArea: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 600,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

  class EditDate extends Component {
    constructor(props){
    super(props)

    this.state = {
      title: '',
      date: '',
      description: '',
      category: ''
    }
    this.fetchDate()
  }

  handleChange = (ev) => {
    this.setState({[ev.target.name]: ev.target.value})
  }

  handleSubmit(ev) {
    ev.preventDefault()
    console.log('hi you are submitting')
    this.postEditDate()
  }

  fetchDate() {
    fetch((`http://localhost:3000/fetch/${localStorage.getItem('hi')}`), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('Token')}`
      }
    })
    .then(response => response.json())
    .then(json => {
      this.setState({
        title: json.title,
        date: json.date,
        description: json.description,
        category: json.category
      })
    })
  }

    postEditDate() {
      fetch(`http://localhost:3000/date_posts/${localStorage.getItem('hi')}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('Token')}`
      },
      body: JSON.stringify({
        date_post: {
          user_id: localStorage.getItem("UserID"),
          title: this.state.title,
          date: this.state.date,
          description:  this.state.description,
          category: this.state.category
          }
        })
      })
    }


  render() {
    if (!this.props.loggedIn) {
      return <Redirect to='/'/>
    }
  const { classes } = this.props;

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar style={{ backgroundColor: '#04151F' }} className={classes.avatar}>
          <LockOutlinedIcon style={{ backgroundColor: '#04151F' }}/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit Date
        </Typography>
        <form className={classes.form}>
          <FormControl  margin="normal" >
            <InputLabel >Title</InputLabel>
            <Input onChange={this.handleChange} name="title" placeholder={this.state.title} type="text" id="title" autoComplete="title" className={classes.textField} margin="normal"
              />
          </FormControl>

          <FormControl  margin="normal" >

          <TextField
            id="datetime-local"
            label="Next appointment"
            type="date"
            name='date'
            defaultValue={this.state.date}
            className={classes.textField}
            onChange={this.handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          </FormControl>

        <FormControl  margin="normal" >
          <TextField
          id="category"
          select
          label="Select"
          className={classes.textField}
          value={this.state.category}
          name="category"
          placeholder={this.state.category}

          onChange={this.handleChange}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Type of date"
          margin="normal"
            >
            <MenuItem key='event' value='event'>
              Event(concert, show, etc...)
            </MenuItem>

            <MenuItem key='restaurant' value='restaurant'>
              Restaurant
            </MenuItem>

            <MenuItem key='bar' value='bar'>
              Bar
            </MenuItem>

            <MenuItem key='fitness' value='fitness'>
              Fitness
            </MenuItem>

            <MenuItem key='arts' value='arts'>
              Art/Culture
            </MenuItem>

            </TextField>
        </FormControl>


          <TextField
            name='description'
            placeholder={this.state.description}
            multiline={true}
            rows={8}
            rowsMax={8}
            className={classes.textArea}
            onChange={this.handleChange}
          />

          <Button
            margin="normal"
            onClick={(ev) => this.handleSubmit(ev)}
            type="submit"
            sizeLarge
            variant="contained"
            color="primary"
            className={classes.submit}
            >
            Create a Date
          </Button>


        </form>
      </Paper>
    </main>
  );
  }
}

EditDate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditDate);