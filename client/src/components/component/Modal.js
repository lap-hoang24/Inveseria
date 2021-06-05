import {makeStyles} from '@material-ui/core/styles';



export const useStyles = makeStyles((theme) => ({
   paper: {
      position: 'absolute',
      width: '90%',
      height: '60%',
      backgroundColor: theme.palette.background.paper,
      borderRadius: '5px',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
   }
}))


export const modalStyle = {
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
}