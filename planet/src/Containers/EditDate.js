import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Description from '@material-ui/icons/Description';
import { Redirect } from 'react-router-dom';
import red from '@material-ui/core/colors/red';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette: {
    primary: red,
  },
});



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
    backgroundColor: '#F23A2F',
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
  textArea: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 600,
  },
});

  class EditDate extends Component {
    constructor(props){
    super(props)

    this.state = {
      title: '',
      date: '',
      description: '',
      category: '',
    }
    this.fetchDate()
  }

  handleChange = (ev) => {
    this.setState({[ev.target.name]: ev.target.value})
  }

  handleSubmit(ev) {
    ev.preventDefault()
    this.postEditDate()
  }

  fetchDate() {
    fetch((`https://dateplanet.herokuapp.com/fetch/${localStorage.getItem('hi')}`), {
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
      fetch(`https://dateplanet.herokuapp.com/date_posts/${localStorage.getItem('hi')}`, {
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
      .then(response => response.json())
      .then(res => console.log(res))
      .then(alert("Date edited!"))
      .then(window.location.href='/yourdates')
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


        <Avatar style={{color: 'FF7F68'}} className={classes.avatar}>
          <Description />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit Your Date
        </Typography>
        <form className={classes.form}>
          <FormControl  margin="normal" >
            <InputLabel >Title</InputLabel>
            <Input onChange={this.handleChange} name="title" type="text" id="title" autoComplete="Title" className={classes.textField} margin="normal"
              />
          </FormControl>

          <FormControl  margin="normal" >

          <TextField
            id="datetime-local"
            label="Date"
            type="date"
            name='date'
            defaultValue="2019-05-01"
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
          onChange={this.handleChange}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Type of date"
          margin="normal"
            >
            <MenuItem key='sports' value='sports'>
              Sport
            </MenuItem>

            <MenuItem key='music' value='music'>
              Music
            </MenuItem>

            <MenuItem key='animals' value='animals'>
              Animals
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

            <MenuItem key='coffee' value='coffee'>
              Coffee
            </MenuItem>

            <MenuItem key='parks' value='parks'>
              Outdoors
            </MenuItem>

            <MenuItem key='nightlife' value='nightlife'>
              Nightlife
            </MenuItem>

            <MenuItem key='other' value='other'>
              Other
            </MenuItem>

            </TextField>
        </FormControl>


          <TextField
            name='description'
            placeholder="Describe the essence of your date! Why are you excited about this particular outing? What type of adventure partner are you looking for?"
            multiline={true}
            rows={4}
            rowsMax={4}
            className={classes.textArea}
            onChange={this.handleChange}
          />
        <br></br>
          <MuiThemeProvider theme={theme}>
          <Button
            margin="normal"
            onClick={(ev) => this.handleSubmit(ev)}
            type="submit"
            sizeLarge
            variant="contained"
            color="primary"
            className={classes.submit}
            >
            Submit Edit
          </Button>
        </MuiThemeProvider>


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
