/* -- libs -- */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';

/* -- images -- */
const logoWhitePath = '../assets/images/logo-white.svg';
const logoBlackPath = '../assets/images/logo-black.svg';

const useStyles = makeStyles({
  logo: {
    width: 32,
    height: 32,
  },
});

const Logo = ({ variant = 'white', title }) => {
  const classes = useStyles();
  return (
    <Link to="/">
      <img
        src={variant === 'white' ? logoWhitePath : logoBlackPath}
        alt="logo"
        className={classes.logo}
        title={title}
      />
    </Link>
  );
};
Logo.propTypes = {
  variant: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
export default Logo;
