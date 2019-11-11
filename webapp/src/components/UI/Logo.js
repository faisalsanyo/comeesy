/* -- libs -- */
import React from 'react';
import PropTypes from 'prop-types';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';

/* -- images -- */
import logoWhitePath from '../../assets/images/logo-white.svg';
import logoBlackPath from '../../assets/images/logo-black.svg';

/* -- styles -- */
const useStyles = makeStyles({
  logo: {
    width: 32,
    height: 32,
  },
});

const Logo = ({ variant = 'white', title }) => {
  const classes = useStyles();
  return (
    <img
      src={variant === 'white' ? logoWhitePath : logoBlackPath}
      alt="logo"
      className={classes.logo}
      title={title}
    />
  );
};
Logo.propTypes = {
  variant: PropTypes.string,
  title: PropTypes.string,
};
export default Logo;
