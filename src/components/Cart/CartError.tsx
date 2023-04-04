import React from "react";
import { Alert } from "@mui/material";
import { useTypedSelector } from "../../hooks/redux";
import { cartSelector } from "../../store/selectors/cart";

const CartError = () => {
    const { errors } = useTypedSelector(cartSelector);
    const [showAlert, setShowAlert] = React.useState(true);
    const handleAlertClose = () => {
        setShowAlert(false);
    };
    return (
        <div className="alert">
            {showAlert &&
                errors[0] !== undefined &&
                errors.map((err) => (
                    <Alert
                        className="alert-item"
                        onClose={handleAlertClose}
                        severity={err.alertType}
                        key={err.body}
                    >
                        {err.body}
                    </Alert>
                ))}
        </div>
    );
};

export default CartError;
