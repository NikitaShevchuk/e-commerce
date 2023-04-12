import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(8).max(24),
    confirmPassword: yup
        .string()
        .required()
        .min(8)
        .max(24)
        .oneOf([yup.ref("password")], "Please enter same password"),
    name: yup
        .string()
        .required()
        .min(3)
        .max(100)
        .test({
            test: (value) => !value.includes(" "),
            message: "Please enter your name without spaces"
        }),
    image: yup.string().notRequired().min(10).max(256)
});

export const resolver = yupResolver(schema);
