import React from 'react';
import './ImageList.css'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

class ImageList extends React.Component {
  constructor() {
    super();
    this.state = {
      user: JSON.parse(localStorage.getItem('user'))
    };
  }

  componentWillMount() {
    console.log(this.props)
  }
  onDelete = () => {
    this
      .props
      .onDelete(this.props.post);
  }

  render() {
    return (
      <div>

        <Card className="card">
          <CardActionArea>
            <CardContent>
              <Grid container justify="space-between">
                <Avatar alt="" src={this.props.post.user.photoURL}></Avatar>
                <Typography gutterBottom variant="h5" component="h2">
                  {this.props.post.user.displayName}
                </Typography>
                {this.state.user.uid === this.props.post.user.uid
                  ? (
                    <IconButton onClick={this.onDelete}>
                      <DeleteIcon></DeleteIcon>
                    </IconButton>
                  )
                  : (
                    <span></span>
                  )}
              </Grid>

            </CardContent>
            <img src={this.props.post.imgURL} alt="" className="media"></img>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {this.props.post.title}
              </Typography>
              <Typography component="p">
                {this.props.post.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions></CardActions>
        </Card>
      </div>

    )
  }

}

export default ImageList;
