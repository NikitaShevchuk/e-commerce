import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Link from "next/link";
import React, { type FC } from "react";
import { useTypedSelector } from "../../hooks/redux";
import { type CartProduct } from "../../types/CartProduct";
import { cartSelector } from "../../store/selectors/cart";
import CountModifier from "./CountModifier";

interface Props {
    cartItem: CartProduct;
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
            const inProgress = removingIDs?.find((removingID) => removingID === cartItem._id);
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
            <Link href={`/product/${cartItem.productId}`} className="cart-img__wrapper">
                <CardMedia component="img" image={cartItem.image} alt="product card" />
            </Link>
            <CardContent className="cart-card">
                <Typography component="div" fontSize={13}>
                    <span className="flex">
                        <Link href={`/product/${cartItem.productId}`}>{cartItem.name}</Link>
                        <span>${cartItem.price}</span>
                    </span>
                    <span className="cart-features">
                        Size: <span className="bold">{cartItem.size}</span>
                    </span>
                    <span className="cart-features">
                        Color: <span className="bold">{cartItem.color}</span>
                    </span>
                    <CountModifier {...cartItem} deleteInProgress={deleteInProgress} />
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CartSingleItem;
