import { getSizeInMB } from "@src/helpers/Common";
import * as yup from "yup";

//todo add getSizeInMB
export const editCollectionSchema = yup.object({
    name: yup.string()
        .required('Name is required')
        .max('30'),
    externalLink: yup.string()
        .url(),
    description: yup.string()
        .max(300),
    creatorFee: yup.number()
        .nullable()
        .min(0)
        .max(29)
        .required('Creator fee is required')
        .typeError('You must specify a number'),
}).required();


export const editNftSchema = yup.object({
    name: yup.string()
        .required('Name is required')
        .max('30'),
    externalLink: yup.string()
        .url(),
    description: yup.string()
        .max(300),
}).required();
