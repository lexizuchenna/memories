import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Typography, Paper, TextField, Button } from "@mui/material";
import FileBase from "react-file-base64";

import useStyles from "./styles";
import { createPost, updatePost } from "../../features/post/postSlice";

function Form({ currentId, setCurrentId }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const { authData } = useSelector((state) => state.auth);
  let post = posts.filter((x) => x._id === currentId);
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  useEffect(() => {
    if (post[0] !== undefined) {
      setPostData(post[0]);
    }
  }, [currentId]);

  const handleSubmit = (e) => {
    const { title, message, tags, selectedFile } = postData;
    e.preventDefault();
    if (
      title === "" ||
      message === "" ||
      tags === "" ||
      selectedFile === ""
    ) {
      toast.error("Fill All");
    } else if (currentId) {
      dispatch(updatePost({currentId, ...postData, name: authData?.result?.name}));
    } else {
      dispatch(createPost({ ...postData, name: authData?.result?.name}));
    }

    clear()
  };

  const clear = () => {
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
    setCurrentId(null)
  };

  if(authData === null) {
    return (
      <Paper className={classes.paper}>
        <Typography variant='h6' align='center'>Sign in to create memories</Typography>
      </Paper>
    )
  }


  return (
    <Paper className={classes.paper}>
      <form
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} A Memory</Typography>
        
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
}

export default Form;
