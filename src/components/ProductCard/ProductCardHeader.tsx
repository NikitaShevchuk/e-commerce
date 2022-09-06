import React, {FC} from 'react';
import {IconButton, Typography} from "@mui/material";
import {Favorite, FavoriteBorderOutlined} from "@mui/icons-material";

interface Props {
    isNew: boolean,
    isFavorite: boolean
    toggleFavorite: () => void
}

const ProductCardHeader: FC<Props> = ({isNew, isFavorite, toggleFavorite}) => {
    return (
        <div className='product-card__header'>
            {isNew &&
                <Typography
                    sx={{fontWeight: '400', fontSize: '14px'}}
                >
                    New
                </Typography>
            }
            <IconButton onClick={toggleFavorite}>
                {isFavorite &&
                    <Favorite
                        sx={{color: '#181818'}}
                        fontSize='small'
                    />
                }
                {!isFavorite &&
                    <FavoriteBorderOutlined
                        sx={{color: '#181818'}}
                        fontSize='small'
                    />
                }
            </IconButton>
        </div>
    );
};

export default ProductCardHeader;