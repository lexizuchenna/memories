import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, AppBar, Typography, Grid, Grow } from "@mui/material";

import { fetchPosts, reset } from "./features/post/postSlice";
import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";
import useStyles from "./styles";

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(fetchPosts());
    return () => {
      reset();
    };
  }, [dispatch]);

  return (
    <>
      <Container>
        <AppBar position="static" color="inherit" className={classes.appBar}>
          <Typography variant="h2" align="center" className={classes.heading}>
            Memories
          </Typography>
        </AppBar>
        <Grow in>
          <Container>
            <Grid
              container
              justify="space-between"
              alignItems="stretch"
              spacing={3}
            >
              <Grid item xs={12} sm={7}>
                <Posts
                  currentId={currentId}
                  setCurrentId={setCurrentId}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Form
                  currentId={currentId}
                  setCurrentId={setCurrentId}
                />
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
      <ToastContainer />
    </>
  );
}

export default App;
