import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthService";
import { Redirect } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
// import firebase from "../config/firebase";
import { auth, googleProvider } from "../config/firebase";
import EmailIcon from "@material-ui/icons/Email";
import CameraIcon from "@material-ui/icons/Camera";

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

export const SignUp = ({ history }) => {
  const classes = useStyles();
  const [disabled, setDisabled] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const user = useContext(AuthContext);

  useEffect(() => {
    const disabledName = name !== "";
    const disabledEmail = email !== "";
    const disabledPassword = password.length >= 6;
    if (disabledEmail && disabledPassword && disabledName) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password, name]);

  console.log(user);
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
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        user.updateProfile({
          displayName: name,
        });
      })
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        alert(err.message);
      });
    setEmail("");
    setPassword("");
    setName("");
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h4">
          ご登録
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            autoComplete="email"
            fullWidth
            id="email"
            label="メールアドレス"
            margin="normal"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            value={email}
            variant="outlined"
          />
          <TextField
            autoComplete="current-password"
            fullWidth
            id="password"
            variant="outlined"
            label="パスワード（6文字以上）"
            margin="normal"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            type="password"
            value={password}
          />
          <TextField
            autoComplete="name"
            autoFocus
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="お名前"
            name="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
          {password.length >= 1 && password.length <= 5 && (
            <p style={{ color: "red", textAlign: "center" }}>
              パスワードは6文字以上で設定してください
            </p>
          )}
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
            ご登録
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
              <Link variant="body2" href="/login">
                {"アカウントはお持ちですか ? ログインはこちらから"}
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
