import React, {FC} from 'react';
import {IconButton, Typography} from "@mui/material";
import {Favorite, FavoriteBorderOutlined} from "@mui/icons-material";

type Props = {isNew: boolean, isFavorite: boolean}

const ProductCardHeader: FC<Props> = ({isNew, isFavorite}) => {
    return (
        <div className='product-card__header'>
            <Typography sx={{fontWeight: '400', fontSize: '14px'}}>{isNew && 'New'}</Typography>
            {isFavorite
                ? <IconButton> <Favorite  sx={{color: '#181818'}} fontSize='small'/> </IconButton>
                : <IconButton> <FavoriteBorderOutlined sx={{color: '#181818'}} fontSize='small' /> </IconButton>
            }
        </div>
    );
};

export default ProductCardHeader;