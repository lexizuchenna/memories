import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import {
  ThumbUpAlt,
  Delete,
  MoreHoriz,
  ThumbUpAltOutlined,
} from "@mui/icons-material";

import { deletePost, likePost } from "../../../features/post/postSlice";
import useStyles from "./styles";

function Post({ post, setCurrentId }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { authData } = useSelector((state) => state.auth);
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleEdit = () => {
    setCurrentId(post._id);
  };

  const handleDelete = () => {
    dispatch(deletePost(post._id));
  };

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAlt fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        {authData !== null &&
          post.creator === (user?.result?.googleId || user?.result?._id) && (
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={handleEdit}
            >
              <MoreHoriz fontSize="default" />
            </Button>
          )}
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={authData === null}
          onClick={() => dispatch(likePost(post._id))}
        >
          <Likes />
        </Button>
        {authData !== null &&
          post.creator === (user?.result?.googleId || user?.result?._id) && (
            <Button size="small" color="primary" onClick={handleDelete}>
              <Delete fontSize="small" /> Delete
            </Button>
          )}
      </CardActions>
    </Card>
  );
}

export default Post;
