import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import * as Yup from "yup";
import { Field, Form, Formik, FormikProps } from "formik";
import { useForm, Controller } from "react-hook-form";
import BasicTable from "./table";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SingUp = ({ onSubmit, row }) => {
  // console.log(row);
  // const validationSchema = Yup.object({
  //   fname: Yup.string().required("firstname is required"),
  //   lname: Yup.string().required("secondname is required"),
  //   email: Yup.string().required("email is required"),
  //   password: Yup.string().required("password is required"),
  // });

  // const [state, setRegisData] = useState([]);
  // const values = {
  //   fname: "",
  //   lname: "",
  //   email: "",
  //   password: "",
  // };

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    errors,
    formState,
  } = useForm();

  const classes = useStyles();

  // useEffect(() => {
  //   const fetchRegis = async () => {
  //     const { data } = await getRegister();
  //     setRegisData(data.regis);
  //   };
  //   fetchRegis();
  // }, []);

  React.useEffect(() => {
    const fields = ["fname", "sname", "email", "pswd"];
    if (row !== null) {
      fields.map((field) => setValue(field, row[field]));
    } else {
    }
  }, [row]);

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form
            className={classes.form}
            onSubmit={handleSubmit(onSubmit)}
            onReset={reset}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="fname"
                  as={
                    <TextField
                      autoComplete="fname"
                      variant="outlined"
                      required
                      fullWidth
                      id="fname"
                      label="First Name"
                      autoFocus
                    />
                  }
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Required",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="sname"
                  as={
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="sname"
                      label="Last Name"
                    />
                  }
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Required",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  as={
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Your email"
                    />
                  }
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Required",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="pswd"
                  as={
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="pswd"
                      label="password"
                    />
                  }
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Required",
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
};

export default SingUp;
