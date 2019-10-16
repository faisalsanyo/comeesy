/* -- libs -- */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

/* -- actions -- */
import { getPosts } from '../../actions/dataActions';

/* -- components -- */
import Posts from '../../components/Posts/Posts.js';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

/* -- styles -- */
const useStyles = makeStyles(theme => ({
  homeWrapper: {
    padding: `${theme.spacing(8)}px 0px`,
  },
}));

const Home = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.data);

  useEffect(() => {
    dispatch(getPosts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // TODO: extract loading logic to a seprate component
  if (!posts || !posts.length) return 'Loading...';
  return (
    <div className={classes.homeWrapper}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={8} md={6}>
            <Posts posts={posts} />
          </Grid>
          <Hidden only="xs">
            <Grid item sm={4}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Assumenda voluptatum aut fugit? Id dolor deleniti aliquam
              excepturi explicabo voluptatibus delectus nam nisi illo, corporis
              ad. Voluptate consectetur eligendi assumenda officia.
            </Grid>
          </Hidden>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
