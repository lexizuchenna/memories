import {useState, useEffect} from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import decode from 'jwt-decode'
import { AppBar, Typography, Toolbar, Avatar, Button } from "@mui/material";

import useStyles from "./styles";
import {logout} from '../../features/auth/authSlice'
import memories from '../../assets/images/memories.png'

function Navbar() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const {authData} = useSelector((state) => state.auth)

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

  console.log(authData)

  useEffect(() => {
    const token = user?.token

    if(token) {
      const decodedToken = decode(token)
      console.log(decodedToken.exp)
      console.log(new Date().getTime())
      if(decodedToken.exp * 1000 < new Date().getTime()) {
        logout()
      }
    }

    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])

  const handleLogout = () => {
    setUser(null)
    dispatch(logout())
    navigate('/')
  }
  
  return (
    <AppBar position="static" color="inherit" className={classes.appBar}>
      <div className={classes.brandContainer}>
          <Typography variant="h2" align="center" className={classes.heading} component={Link} to='/'>
            Memories
          </Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result?.name}
              src={user?.result?.imageUrl}
            >
              {!user?.result?.imageUrl && user?.result?.name?.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.result?.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        ) : (
          //<Link to="/auth">
            <Button variant="contained" color="primary" component={Link} to='/auth'>
              Sign In
            </Button>
          //</Link>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
