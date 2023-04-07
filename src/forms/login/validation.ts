import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(8).max(24)
});

export const resolver = yupResolver(schema);
