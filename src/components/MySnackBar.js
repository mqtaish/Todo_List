import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Alert } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

export default function MySnackBar({ open, message }) {


    const Alert = React.forwardRef(function Alert(
        props,
        ref,
    ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const action = (
        <React.Fragment>

            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div>
            <Snackbar
                autoHideDuration={6000}
                message="Note archived"
                action={action}
                open={open}

            >
                <Alert severity="success" sx={{ width: '100%' }}>
                    {message}
                </Alert>

            </Snackbar>
        </div >
    );
}
