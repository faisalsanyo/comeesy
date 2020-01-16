/* -- libs -- */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';

/* -- utils -- */
import { formatDateToRelTime } from '../../utils/helperFns';

/* -- components -- */
import PopupMenu from '../UI/PopupMenu';
import RippleBadge from '../UI/RippleBadge';
import EmptyData from '../UI/EmptyData';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TimeIcon from '@material-ui/icons/AccessTime';
import NotificationIcon from '@material-ui/icons/NotificationsNoneOutlined';

/* -- styles -- */
const useStyles = makeStyles(theme => ({
  navLink: {
    fontSize: 28,
    position: 'relative',
  },
  paper: {
    width: 350,
    minHeight: 'calc(100vh - 55px)',
    top: '53px !important',
    paddingTop: 8,
    paddingBottom: 8,
    overflowX: 'hidden',
    overflowY: 'auto',
    display: 'flex',
  },
  menuItem: {
    whiteSpace: 'normal',
    '&:not(:last-child)': {
      borderBottom: `1px solid ${theme.palette.colors.greylight}`,
    },
  },
  unReadIndicator: {
    backgroundColor: theme.palette.colors.whitesmoke,
    borderBottom: `1px solid ${theme.palette.colors.white}`,
  },
  avatar: {
    marginRight: 6,
    width: 40,
    height: 40,
  },
  content: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  sender: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  createdAt: {
    fontSize: '0.75rem',
    lineHeight: 0,
    letterSpacing: -0.5,
    display: 'flex',
    alignItems: 'center',
    '& > span': {
      marginLeft: 4,
    },
  },
}));

const NotificationMenu = ({ notifications = [], onMarkRead }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const onOpenMenu = e => {
    // 1. Set anchor element
    setAnchorEl(e.currentTarget);

    // 2. Mark notification read
    if (notifications && notifications.length > 0) {
      setTimeout(() => {
        const unReadNotificationIds = notifications
          .filter(item => !item.read)
          .map(item => item.notificationId);

        if (unReadNotificationIds.length > 0) onMarkRead(unReadNotificationIds);
      }, 6000);
    }
  };
  const onCloseMenu = e => {
    setAnchorEl(null);
  };

  const renderNotifications = () =>
    notifications.map((item, idx) => (
      <MenuItem
        key={idx}
        component={Link}
        to={`/post/${item.postId}`}
        onClick={onCloseMenu}
        className={clsx(
          classes.menuItem,
          !item.read ? classes.unReadIndicator : ''
        )}
        dense
      >
        <Avatar
          alt={item.sender.username}
          src={item.sender.imageUrl}
          className={classes.avatar}
        />
        <div className={classes.content}>
          <div className={classes.sender}>
            <Typography variant="body2" component="span" color="textPrimary">
              {item.sender.name}
            </Typography>
            <Typography
              component="span"
              variant="caption"
              color="textSecondary"
              className={classes.createdAt}
            >
              <TimeIcon fontSize="inherit" />
              <span>{formatDateToRelTime(item.createdAt)}</span>
            </Typography>
          </div>
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.message}
          >
            {item.body}
          </Typography>
        </div>
      </MenuItem>
    ));
  return (
    <div className="notification-menu">
      <IconButton
        id="notificationMenuButton"
        onClick={onOpenMenu}
        aria-controls="notificationMenu"
        aria-haspopup="true"
        color="inherit"
        className={classes.navLink}
      >
        {notifications && notifications.some(el => el.read === false) ? (
          <RippleBadge>
            <NotificationIcon fontSize="inherit" />
          </RippleBadge>
        ) : (
          <NotificationIcon fontSize="inherit" />
        )}
      </IconButton>
      <PopupMenu
        id="notificationMenu"
        anchorEl={anchorEl || null}
        open={Boolean(anchorEl)}
        onClose={onCloseMenu}
        classes={{ paper: classes.paper }}
      >
        {notifications && notifications.length > 0 ? (
          renderNotifications()
        ) : (
          <EmptyData text="No notifications yet" className={classes.empty} />
        )}
      </PopupMenu>
    </div>
  );
};

NotificationMenu.propTypes = {
  notifications: PropTypes.array.isRequired,
  onMarkRead: PropTypes.func.isRequired,
};

export default NotificationMenu;
