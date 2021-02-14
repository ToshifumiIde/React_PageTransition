import React, { useState, useEffect, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
// import firebase from "../config/firebase";
import { auth } from "../config/firebase";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../AuthService";
// import { Link as Lnk } from "react-router-dom";
import { googleProvider } from "../config/firebase";

import CameraIcon from "@material-ui/icons/Camera";
import EmailIcon from "@material-ui/icons/Email";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://toshifumiide-portfolio.web.app/"
        target="_blank"
        rel="noopener"
      >
        Toshifumi Ide
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
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 3),
  },
}));

export const Login = ({ history }) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const user = useContext(AuthContext);

  useEffect(() => {
    //emailとpasswordの入力情報の判別
    const disabledEmail = email !== "";
    const disabledPassword = password.length >= 6;
    if (disabledEmail && disabledPassword) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  if (user) {
    return <Redirect to="/" />;
  }

  const signInGoogle = async () => {
    await auth.signInWithPopup(googleProvider).catch((err) => {
      alert(err.message);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        alert(err.message);
      });
    setEmail("");
    setPassword("");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h4">
          ログイン
        </Typography>
        <Grid container>
          <Grid item xs={4}>
            仮メールアドレス:
          </Grid>
          <Grid item xs={8}>
            test@example.com
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={4}>
            仮パスワード:
          </Grid>
          <Grid item xs={8}>
            testsample
          </Grid>
        </Grid>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="メールアドレス"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="パスワード（6文字以上）"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
          <p style={{ color: "red", textAlign: "center" }}>
            {password.length >= 1 &&
              password.length <= 5 &&
              "パスワードは6文字以上入力してください"}
          </p>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={disabled}
            onClick={handleSubmit}
            startIcon={<EmailIcon />}
          >
            ログイン
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            // className={classes.submit}
            onClick={signInGoogle}
            startIcon={<CameraIcon />}
          >
            Googleアカウントでログイン
          </Button>
          <Grid container>
            <Grid item>
              <Link variant="body2" href="/signup">
                {"アカウントはお持ちですか ? ご登録はこちらから"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};
