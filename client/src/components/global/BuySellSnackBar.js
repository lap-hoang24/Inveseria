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

function BuySellSnackBar({ action, message }) {
   const [open, setOpen] = useState(false);
   const classes = useStyles();

   const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
         return;
      }
      setOpen(false);
   };


   useEffect(() => {
      setTimeout(() => {
         if (action) {
            setOpen(true);
         }
         sessionStorage.removeItem('stockAction');
      }, 500)
   }, [])

   return (
      <article>
         <Snackbar className={classes.root} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={1800} TransitionComponent={Slide} onClose={handleClose}>
            <Alert className={classes.snack} onClose={handleClose} severity="success" variant="filled">
               {message}
            </Alert>
         </Snackbar>
      </article>
   )
}

export default BuySellSnackBar
