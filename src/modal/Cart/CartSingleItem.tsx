import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Link from "next/link";
import React, { type FC } from "react";
import { useTypedSelector } from "../../hooks/redux";
import { type ICartItem } from "../../types/ICartItem";
import { cartSelector } from "../../store/selectors/cart";
import CountModifier from "./CountModifier";

interface Props {
    cartItem: ICartItem;
}

enum CardClassName {
    translucent = "translucent",
    empty = ""
}

const CartSingleItem: FC<Props> = ({ cartItem }) => {
    const removingIDs = useTypedSelector(cartSelector).status.itemsIsRemoving;
    const [deleteInProgress, setIsDeleteInProgress] = React.useState<boolean>(false);
    const [cardClassName, setCardClassName] = React.useState<CardClassName>(CardClassName.empty);
    React.useEffect(
        // find out if current cart item id is in the array of items being in delete process
        () => {
            const inProgress = removingIDs?.find(
                (removingID) => removingID === cartItem.product._id
            );
            if (inProgress !== undefined) {
                setIsDeleteInProgress(true);
                setCardClassName(CardClassName.translucent);
            } else {
                setIsDeleteInProgress(false);
                setCardClassName(CardClassName.empty);
            }
        },
        [removingIDs]
    );
    return (
        <Card className={`cart-card__wrapper ${cardClassName}`}>
            <Link href={`/product/${cartItem.product._id}`} className="cart-img__wrapper">
                <CardMedia component="img" image={cartItem.product.image} alt="product card" />
            </Link>
            <CardContent className="cart-card">
                <Typography component="div" fontSize={13}>
                    <span className="flex">
                        <Link href={`/product/${cartItem.product._id}`}>
                            {cartItem.product.title}
                        </Link>
                        <span>${cartItem.product.price}</span>
                    </span>
                    <span className="cart-features">
                        Size: <span className="bold">{cartItem.selectedSize}</span>
                    </span>
                    <span className="cart-features">
                        Color: <span className="bold">{cartItem.product.color}</span>
                    </span>
                    <CountModifier
                        {...cartItem}
                        _id={cartItem.product._id}
                        deleteInProgress={deleteInProgress}
                    />
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CartSingleItem;
