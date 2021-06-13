import React, { useState, useEffect, createRef } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const myRef = createRef();
const useStyles = makeStyles((theme) => ({
   root: {
      width: '60%',
      height: '44px'
   },
}));

function FavoriteSnackbar({watched, favorite}) {
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
      if(favorite) {
         setOpen(true);
         watched ? setMessage('Added to Watchlist') : setMessage('Removed from Watchlist');
      } else {
         setOpen(false);
      }
   },[watched])

   return (
      <div ref={myRef} >
         <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}  open={open} autoHideDuration={1700} onClose={handleClose}>
            <Alert className={classes.root}  onClose={handleClose} severity="success" variant="filled">
               {message}
            </Alert>
         </Snackbar>
      </div>
   )
}

export default FavoriteSnackbar
