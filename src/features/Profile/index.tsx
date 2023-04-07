import { useTypedSelector } from "@/hooks/redux";
import { getProfile } from "@/store/selectors/profile";
import { Button, Paper, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import profilePlaceholder from "@/assets/img/user/profile-image.svg";
import Skeleton from "react-loading-skeleton";
import style from "./profile.module.css";
import { Edit, Logout } from "@mui/icons-material";

const UserProfile = () => {
    const profile = useTypedSelector(getProfile);
    return (
        <Paper className={style.profile}>
            <Image
                width="200"
                height="200"
                src={profile.image ?? profilePlaceholder.src}
                alt="Profile image"
                className={style.profile__image}
            />
            <Typography textAlign="center" variant="h2">
                {profile.name ?? <Skeleton width="40%" inline />}
            </Typography>
            <Typography>{profile.email ?? <Skeleton width="20%" inline />}</Typography>
            <Button startIcon={<Edit />} sx={{ mt: 6, mr: 2 }} variant="contained">
                Edit
            </Button>
            <Button startIcon={<Logout />} sx={{ mt: 6 }} variant="outlined">
                Logout
            </Button>
        </Paper>
    );
};

export default UserProfile;
