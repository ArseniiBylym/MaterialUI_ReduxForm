import React from 'react';
import './Form.css';
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
                fontSize: 18,
                color: 'white',
                border: '1px solid white',
                borderRadius: '3px',
                padding: '5px',
            },
            input: {
                padding: '5px 0'
            },
            focused: {
                borderColor: teal[100],
            },
            error: {
                borderColor: red[500],
            },
        },
        MuiButton: {
            root: {
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                borderRadius: 3,
                border: 0,
                color: 'white',
                height: 48,
                padding: '0 30px',
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                cursor: 'pointer'
            },
            disabled: {
                background: 'linear-gradient(45deg, #ccc 30%, #ccc 90%)',
                boxShadow: 'none'
            },
            label: {
                color: 'white',
            },
        },
      },
    typography: {
        fontSize: 16,
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
        light: yellow[100],
        main: yellow[500],
        dark: yellow[700],
      },
      error: {
        light: red[100],
        main: red[500],
        dark: red[700],
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
      'email',
    ]
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Required'
      }
    })
    if(values.password && values.password.length < 6){
        errors.password = 'Name should be longer than 6'
    }
    if(values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        errors.email = 'Invalid email address'
    }
    return errors
  }


class TextFields extends React.Component {
  state = {
    name: '',
    last_name: '',
    password: '',
    email: '',
  };

  handleChange = name => event => {
      console.log(event, name)
    this.setState({
      [name]: event.target.value,
    });
  };

  sendFormHander = (reset) => {
      reset()
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
        value={this.state[name]}
        margin="dense"
        error={touched && error && true}
        InputProps={{
            disableUnderline: true
        }}
        InputLabelProps={{
            shrink: true,
        }}
        FormHelperTextProps={{
            filled: true,
            focused: true
        }}
        {...input}
        {...custom}
    />
  }

  render() {
    // const { classes } = this.props;
    // console.log(classes)
    const { handleSubmit, pristine, reset, invalid, submitting } = this.props

    return (
        <MuiThemeProvider theme={theme}>
            <div>
                <Paper className='customPaper' elevation={4}>
                    <Typography component="p">
                        Forms
                    </Typography>
                    <form onSubmit={this.sendFormHander}  noValidate autoComplete="off">
                        <Grid container direction='column' wrap='nowrap' justify='center' spacing={16}>
                            <Grid item sm={12}>
                                <Field
                                    name="name"
                                    component={this.renderTextField}
                                    label="Name"
                                    onChange={this.handleChange("name")}
                                />
                            </Grid>
                            <Grid item sm={12}>
                                <Field
                                    name="last_name"
                                    component={this.renderTextField}
                                    label="Last name"
                                    onChange={this.handleChange("last_name")}
                                />
                            </Grid>
                            <Grid item sm={12}>
                                <Field
                                    name="password"
                                    component={this.renderTextField}
                                    label="Password"
                                    type="password"
                                    onChange={this.handleChange("password")}
                                />
                            </Grid>
                            <Grid item sm={12}>
                                <Field
                                    name="email"
                                    component={this.renderTextField}
                                    label="Email"
                                    type="email"
                                    onChange={this.handleChange("email")}
                                />
                            </Grid>
                            <Grid item sm={12}>
                                <Button disabled={pristine || invalid} onClick={this.sendFormHander.bind(this, reset)}  >
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


// TextFields = reduxForm({ 
//     form: 'contact',
//     validate,
// })(withStyles(styles)(TextFields));

export default TextFields
// export default withStyles(styles)(TextFields);