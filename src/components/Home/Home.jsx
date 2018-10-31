import React from 'react';
import './Home.css';
import Button from '@material-ui/core/Button';
import {auth} from '../../firebase/index.js'
import {withRouter} from 'react-router';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import ImageDialog from '../ImageDialog/ImageDialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import {db, firebase} from '../../firebase/firebase';
import ImageList from '../ImageList/ImageList';
import  Grid from '@material-ui/core/Grid';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user')),
            open: false,
            posts: [],
            isLoading: true,
        };
        this.singOut = this
            .singOut
            .bind(this);
    }
    componentWillMount() {
        db.collection('posts').onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if(change.type === 'added') {
                    this.setState( prevState => ({posts: [...prevState.posts, change.doc.data()]}))
                }
                if(change.type === 'removed') {
                    var arr = [...this.state.posts];
                    let postToDelete = arr.findIndex((val) => val.imgURL === change.doc.data().imgURL);
                    console.log(postToDelete);
                    arr.splice(postToDelete, 1);
                    console.log(arr);
                    this.setState({posts: arr});
                }
                
                console.log(this.state.posts);
            })
            this.setState({isLoading: false});
        })
    }
    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };
    handleDelete = (post) => {
        const postToDelete = db.collection('posts').where('imgURL', '==', post.imgURL);
        console.log(postToDelete);
    
        const imgRef = firebase.storage().refFromURL(post.imgURL);
        postToDelete.get().then(querySnapshot => {
            querySnapshot.forEach((doc) => doc.ref.delete());
        });
        console.log(imgRef);
        imgRef.delete();
        
      }
    singOut(e) {
        console.log(this.props)
        auth
            .auth
            .signOut()
            .then(() => {
                localStorage.removeItem("user")
                this
                    .props
                    .history
                    .push('/');
            })
            .catch(error => console.log(error))
    }
    render() {
        return (
            <div className="root">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className="menuButton" color="inherit" aria-label="Menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography className="grow" variant="h6" color="inherit">
                            Image-Sharing
                        </Typography>
                        <Button onClick={this.singOut} color="inherit">Logout</Button>
                        <Button onClick={this.handleClickOpen} color="inherit">
                            Add Picture
                        </Button>
                        <Avatar alt="" src={this.state.user.photoURL}/>
                    </Toolbar>
                </AppBar>
                {this.state.isLoading ? (
                    <div
          style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <CircularProgress variant="indeterminate" className="center-text"></CircularProgress>
        </div>
                ): (
                    this.state.posts.map((val, ind, arr) => {
                        return (
                            <Grid key={ind} container justify="center">
                            <ImageList onDelete={this.handleDelete} post={val} key={ind}></ImageList>
                            </Grid>
                            
                        )
                    })
                    
                )}
                <ImageDialog open={this.state.open} onClose={this.handleClose}></ImageDialog>
            </div>
        )

    }

    componentDidMount() {
        this.setState({someKey: 'otherValue'});
    }
}

export default withRouter(Home);