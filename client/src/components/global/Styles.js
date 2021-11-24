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
      top: '40%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
   },
}))



export const useRewardModalStyles = makeStyles((theme) => ({
   paper: {
      width: '100%',
      position: 'absolute',
      backgroundColor: theme.palette.background.paper,
      borderRadius: '5px',
      // boxShadow: theme.shadows[5],
      // padding: theme.spacing(2, 4, 3),
      top: '0px',
      left: '0px',
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
      padding: "1rem 0px",
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