import { type FC } from "react";
import style from "./spinner.module.css";

interface Props {
    fullScreen?: boolean;
    fill?: boolean;
}

const Spinner: FC<Props> = ({ fullScreen = false, fill = false }) => {
    const wrapperClassName = fullScreen ? style.wrapper : fill ? style.fullWidth : "";
    return (
        <div className={wrapperClassName}>
            <div className={style.loader} />
        </div>
    );
};

export default Spinner;
