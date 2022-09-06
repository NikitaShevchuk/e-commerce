import React, {FC} from 'react';
import {Container, Typography} from "@mui/material";
import ReplayIcon from '@mui/icons-material/Replay';

interface Props {
    reload: () => void
}

const LoadingError: FC<Props> = ({reload}) => {
    const handleClick = () => reload()
    return (
        <Container
            className='error-component'
            maxWidth='md'
        >
            <Typography>
                Loading error. Please try again later.
            </Typography>
            <Typography
                className='link-style try-again'
                onClick={handleClick}
            >
                Try again
                <ReplayIcon
                    fontSize='small'
                    sx={{ml: 1}}
                />
            </Typography>
        </Container>
    );
};

export default LoadingError;