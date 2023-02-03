import { getSizeInMB } from "@src/helpers/Common";
import * as yup from "yup";

export const createCollectionSchema = yup.object({
    name: yup.string()
        .required('Name is required')
        .max('30'),
    externalLink: yup.string()
        .url(),
    collectionImg: yup.mixed()
        .required('A file is required')
        .test(
            "fileSize",
            "Image file is required. Maximum size is 2 MB",
            value => value[0] && getSizeInMB(value[0].size) <= 2
        ),
    collectionBackImg: yup.mixed()
        .required("A file is required")
        .test(
            "fileSize",
            "Image file is required. Maximum size is 2 MB",
            value => value[0] && getSizeInMB(value[0].size) <= 2
        ),
    customUrl: yup.string()
        .required('Custom url is required'),
    description: yup.string()
        .max(300),
    creatorFee: yup.number()
        .min(0)
        .max(29)
        .required('Creator fee is required')
        .typeError('You must specify a number'),
}).required();


export const createNftSchema = yup.object({
    name: yup.string()
        .required('Name is required')
        .max('30'),
    nftThumbnailImage: yup.mixed()
        .required("A file is required")
        .test(
            "fileSize",
            "Image file is required. Maximum size is 2 MB",
            value => value[0] && getSizeInMB(value[0].size) <= 2
        ),
    externalLink: yup.string()
        .url(),
    description: yup.string()
        .max(300),
}).required();
