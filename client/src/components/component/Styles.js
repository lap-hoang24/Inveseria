import { makeStyles } from '@material-ui/core/styles';


export const useModalStyles = makeStyles((theme) => ({
   paper: {
      position: 'absolute',
      width: '90%',
      height: '60%',
      backgroundColor: theme.palette.background.paper,
      borderRadius: '5px',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
   },
}))


export const useAlertStyles = makeStyles((theme) => ({
 
   root: {
      width: "100%",
      padding: "0.5rem",
   },
}))


export const useInputStyles = makeStyles({
   input: {
      height: "40px",
   },
   root: {
      width: '100%',
   },
   label: {
      fontSize: "14px",
      fontStyle: "italic",
   }
})