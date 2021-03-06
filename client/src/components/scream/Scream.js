import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

// Components
import CustomButton from '../custom/CustomButton'
import DeleteScream from './DeleteScream'
import ScreamDialog from './ScreamDialog'
import LikeButton from './LikeButton'

// DayJS
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';

// Material UI
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

// Icons
import ChatIcon from '@material-ui/icons/Chat';

// Redux
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../../redux/actions/dataAction'

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
};

export class Scream extends Component {
  render() {
    dayjs.extend(relativeTime)
    const { 
      classes, 
      scream : { 
        body, 
        createdAt, 
        userImage, 
        userHandle, 
        screamId, 
        likeCount, 
        commentCount 
      },
      user: {
        authenticated,
        credentials: {
          handle
        }
      }
    } = this.props

    const deleteButton = (authenticated && userHandle===handle) ? (
      <DeleteScream screamId={screamId}/>
    ) : null

    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile Image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          <LikeButton screamId={screamId}/>
          <span>{likeCount} Likes</span>
          <CustomButton tip="comments">
            <ChatIcon color="primary" />
          </CustomButton>
          <span>{commentCount} comments</span>
          <ScreamDialog
            screamId={screamId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
        </CardContent>
      </Card>
    );
  }
}

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = { 
  likeScream, 
  unlikeScream 
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Scream));  //withStyles creates a "classes" obj in component to access styles variable
