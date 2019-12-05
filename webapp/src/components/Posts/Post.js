/* -- libs -- */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/* -- components -- */
import CommentPost from '../CommentPost/CommentPost';
import LikePost from '../LikePost/LikePost';

/* -- utils -- */
import { formatDateToRelTime } from '../../utils/helperFns';

/* -- mui -- */
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

/* -- styles -- */
import useStyles from './postStyles';

const Post = ({ post }) => {
  const classes = useStyles();
  return (
    <div className={classes.post}>
      <Card>
        <CardHeader
          avatar={
            <Avatar
              alt={post.user.username}
              src={post.user.imageUrl}
              component={Link}
              to={`/u/${post.user.username}`}
              className={classes.avatar}
            />
          }
          title={
            <Fragment>
              <Typography
                component={Link}
                to={`/u/${post.user.username}`}
                variant="subtitle1"
                color="primary"
                className={classes.title}
              >{`${post.user.name}`}</Typography>
              <span>{`@${post.user.username}`}</span>
            </Fragment>
          }
          subheader={
            <Typography
              variant="caption"
              color="textSecondary"
              className={classes.createdAt}
            >
              {formatDateToRelTime(post.createdAt)}
            </Typography>
          }
        />
        <CardContent>
          <Typography variant="body1" color="textSecondary">
            {post.body}
          </Typography>
        </CardContent>
        {/* <Divider /> */}
        <CardActions disableSpacing>
          <LikePost post={post} />
          <CommentPost post={post} />
        </CardActions>
      </Card>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
};
export default Post;
