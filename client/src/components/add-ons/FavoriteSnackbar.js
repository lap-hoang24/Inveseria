import React, { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from "@material-ui/core/Slide";
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
   snack: {
      height: "45px",
   }
}));


function FavoriteSnackbar({ watched, favorite }) {
   const classes = useStyles();
   const [open, setOpen] = useState(false);
   const [message, setMessage] = useState('');

   const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
         return;
      }
      setOpen(false);
   };

   useEffect(() => {
      if (favorite) {
         setOpen(true);
         watched ? setMessage('Added to Watchlist') : setMessage('Removed from Watchlist');
      } else {
         setOpen(false);
      }
   }, [watched])

   return (
      <div>
         <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={1700} TransitionComponent={Slide} onClose={handleClose}>
            <Alert className={classes.snack} onClose={handleClose} severity="success" variant="filled">
               {message}
            </Alert>
         </Snackbar>
      </div>
   )
}

export default FavoriteSnackbar
