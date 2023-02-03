import * as yup from "yup";

export const makeOfferSchema = yup.object({
    minValue: yup
        .number()
        .typeError('You must specify a number. And use dot as separator')
        .min(0.001, "Price must be greater than or equal to 0.001")
        .max(10000)
        .required('Price is required')
}).required();

export const saleSchema = yup.object({
    price: yup
        .number({})
        .typeError('You must specify a number. And use dot as separator')
        .min(0.001, "Price must be greater than or equal to 0.001")
        .max(10000)
        .required('Price is required')
}).required();