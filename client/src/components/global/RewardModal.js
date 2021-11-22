import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

const ownAxios = axios.create();


const RewardModal = ({ openModal, userId, jwt }) => {
   const [open, setOpen] = useState(openModal);
   ownAxios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

   const handleAccept = () => {
      ownAxios.post(process.env.REACT_APP_API_URL + '/auth/updateRewardAccept', { userId })
         .then(response => { console.log(response) })
         .catch(err => console.error(err));

      setOpen(false);
   };

   return (
      <article>
         <Dialog
            open={open}
            onClose={handleAccept}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">

            <DialogTitle id="alert-dialog-title">{"Congrats!"}</DialogTitle>
            <DialogContent>
               <DialogContentText id="alert-dialog-description">
                  Start investing with $ 10.000 subscription reward!
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleAccept} color="primary">
                  Got it, Thanks!
               </Button>
            </DialogActions>
         </Dialog>
      </article>
   )
}


export default RewardModal;