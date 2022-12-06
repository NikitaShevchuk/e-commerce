import React, {FC} from 'react';
import {Card, CardContent, CardMedia, Typography} from "@mui/material";
import {CartProduct} from "../../models/CartProduct";
import {NavLink} from "react-router-dom";
import {useTypedSelector} from "../../hooks/redux";
import {cartSelector} from "../../store/selectors/cart";
import CountModifier from "./CountModifier";

interface Props {
    cartItem: CartProduct
}

enum CardClassName {
    translucent= 'translucent',
    empty = ''
}

const CartSingleItem: FC<Props> = ({cartItem}) => {
    const removingIDs = useTypedSelector(cartSelector).status.itemsIsRemoving
    const [deleteInProgress, setIsDeleteInProgress] = React.useState<boolean>(false)
    const [cardClassName, setCardClassName] = React.useState<CardClassName>(CardClassName.empty)
    React.useEffect(
        // find out if current cart item id is in the array of items being in delete process
        () => {
            let inProgress = removingIDs && removingIDs.find(
                removingID => removingID === cartItem.id
            )
            if (inProgress) {
                setIsDeleteInProgress(true)
                setCardClassName(CardClassName.translucent)
            } else {
                setIsDeleteInProgress(false)
                setCardClassName(CardClassName.empty)
            }
        }, [removingIDs]
    )
    return (
        <Card className={`cart-card__wrapper ${cardClassName}`}>
            <NavLink
                to={`/product/${cartItem.categoryId}/${cartItem.productId}`}
                className="cart-img__wrapper"
            >
                <CardMedia
                    component='img'
                    image={cartItem.image}
                    alt='product card'
                />
            </NavLink>
            <CardContent className='cart-card'>
                <Typography component='div' fontSize={13}>
                    <span className='flex'>
                        <NavLink to={`/product/${cartItem.categoryId}/${cartItem.productId}`}>
                            {cartItem.name}
                        </NavLink>
                        <span>${cartItem.price}</span>
                    </span>
                    <span className='cart-features'>
                        Size: <span className="bold">{cartItem.size}</span>
                    </span>
                    <span className='cart-features'>
                        Color: <span className="bold">{cartItem.color}</span>
                    </span>
                    <CountModifier 
                        {...cartItem}
                        deleteInProgress={deleteInProgress} 
                    />
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CartSingleItem;