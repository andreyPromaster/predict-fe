import { useState, useEffect } from 'react';
import { fetchTickerData, fetchGraphData } from "api/Tickers"
// material-ui
import {
  Breadcrumbs,
  Button,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Alert,
  Snackbar,
  Link
} from '@mui/material';


export const Notification = props => {
    const [isOpen, setVisibility] = useState(false);
    useEffect(
        () => {
            if(props.message.length !== 0){
                setVisibility(true)
            }
        }, 
        [props.message]
    )
    const handleClose = () => {
        setVisibility(false)
    }
    return (
        <Snackbar open={isOpen} onClose={handleClose} autoHideDuration={6000}>
            <Alert
            onClose={handleClose}
            severity="error"
            variant="filled"
            sx={{ width: '100%' }}
            >
           {props.message}
            </Alert>
        </Snackbar>
    )
}

export default Notification;
