import React, { type FC } from "react";
import { Container, Typography } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";

interface Props {
    reload?: () => void;
    text?: string;
    allowReload?: boolean;
}

const LoadingError: FC<Props> = ({
    text = "Loading error. Please try again later.",
    allowReload = false,
    reload
}) => {
    const handleClick = () => {
        if (reload !== undefined && allowReload) reload();
    };
    return (
        <Container className="error-component" maxWidth="md">
            <Typography>{text}</Typography>
            {allowReload && (
                <Typography className="link-style try-again" onClick={handleClick}>
                    Try again
                    <ReplayIcon fontSize="small" sx={{ ml: 1 }} />
                </Typography>
            )}
        </Container>
    );
};

export default LoadingError;
