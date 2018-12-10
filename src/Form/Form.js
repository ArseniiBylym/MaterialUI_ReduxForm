import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import { Field, reduxForm } from 'redux-form'

const theme = createMuiTheme({
    overrides: {
        MuiInput: {
            root: {
                fontSize: 24,
                color: 'white',
            },
            
            underline: {
                '&:before': {
                    borderBottom: 'none',
                    color: 'red'
                },
            }
        },
        MuiInputBase: {
            input: {
                border: 'none',
                '&$before': {
                    border: 'none'
                }
            }
        },
        // Name of the component ⚛️ / style sheet
        MuiButton: {
            label: {
                color: 'black',
                '&:hover': {
                    color: 'white'
                }
            },
          // Name of the rule
          root: {
            // Some CSS
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            borderRadius: 3,
            border: 0,
            color: 'white',
            height: 48,
            padding: '0 30px',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            '&$hover': {
                color: 'black',
            }
          },
        },
      },
    typography: {
        fontSize: 8,
        useNextVariants: true,
    },
    palette: {
      type: 'dark',
      primary: {
        light: teal[100],
        main: teal[500],
        dark: teal[700],
      },
      secondary: {
        light: red[100],
        main: red[500],
        dark: red[700],
      },
      error: {
        light: yellow[100],
        main: yellow[500],
        dark: yellow[700],
      }
    },
  });


const styles = theme => ({
    root:{
        margin: '30px auto',
        borderRadius: '10px',
        padding: '20px',
        width: '250px'
    },
    container: {
        display: 'flex',
        flexFlow: 'column nowrap',
        width: '100%',
    },
    textField: {
        width: '100%',
    },
});

const validate = values => {
    const errors = {}
    const requiredFields = [
      'name',
      'last_name',
      'password',
    ]
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Required'
      }
    })
    if(values.name && values.name.length < 6){
        console.log(values.name)
        errors.name = 'Plese eneter your name'
    }
    
   
    return errors
  }


class TextFields extends React.Component {
  state = {
    name: '',
    last_name: '',
    password: '',
  };

  handleChange = name => event => {
      console.log(event, name)
    this.setState({
      [name]: event.target.value,
    });
  };

  sendFormHander = () => {
      console.log(this.state)
  }

  renderTextField = ({
    name,
    input,
    label,
    meta: { touched, error },
    onChange,
    ...custom
  }) => {
    return <TextField
        label={label}
        helperText={touched && error}
        // className={classes.textField}
        value={this.state[name]}
        errorText={touched && error}
        // onChange={onChange}
        margin="normal"
        error={touched && error&& true}
        {...input}
        {...custom}
    />
  }

  render() {
    // const { classes } = this.props;
    const { handleSubmit, pristine, reset, submitting } = this.props

    return (
        <MuiThemeProvider theme={theme}>
            <div>
                {/* <Paper className={classes.root} elevation={4}> */}
                <Paper elevation={4}>
                    <Typography component="p">
                        Forms
                    </Typography>
                    {/* <form onSubmit={handleSubmit} className={classes.container} noValidate autoComplete="off"> */}
                    <form onSubmit={this.sendFormHander}  noValidate autoComplete="off">
                    <Grid container direction='column' nowrap justify='center' spacing={16}>
                        <Grid item sm={12}>
                            <Field
                                name="name"
                                component={this.renderTextField}
                                label="First Name"
                                onChange={this.handleChange("name")}
                            />
                        </Grid>
                        <Grid item sm={12}>
                        <Field
                                name="last_name"
                                component={this.renderTextField}
                                label="Last name"
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <Field
                                name="password"
                                component={this.renderTextField}
                                label="Password"
                                type="password"
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <Button disabled={pristine} onClick={this.sendFormHander} variant="contained" color="primary" >
                                Send form 
                            </Button>
                        </Grid>
                        </Grid>
                    </form>
                </Paper>
            </div>
        </MuiThemeProvider>
    );
  }
}

TextFields = reduxForm({ 
    form: 'contact',
    validate,
    
})(TextFields);


export default withStyles(styles)(TextFields);