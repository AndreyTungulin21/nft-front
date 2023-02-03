import * as yup from "yup";

import { checkUniqueInfoByType } from '@src/API/main';

const regexPhone = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const twitterHandleRegex = /^[a-z0-9_]{1,15}$/i
const instagramHandleRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/igm

export const settingsSchema = (account) => {
    return yup.object({
        username: yup.string()
            .max(30, 'Username must be at most 30 characters')
            .required('Username is required')
            .nullable()
            .test('checUsernameUnique', 'This username is already registered', async value => {
                if (value !== account.username) {
                    return await checkUniqueInfoByType({ dbName: 'user', type: 'username', value }).then(resp => resp.data.isUnique)
                }
                return true
            }),
        bio: yup.string()
            .max(300, 'Bio must be at most 300 characters')
            .nullable(),

        email: yup.string()
            .email('Email address must be a valid email')
            .nullable()
            .transform((_, value) => {
                return value === "" ? null : value
            })
            .test('checkUniqueUserEmail', 'This email is already registered', async value => {
                if (value && value !== account.links.email) {
                    return await checkUniqueInfoByType({ dbName: 'user_links', type: 'email', value }).then(resp => resp.data.isUnique)
                }
                return true
            }),

        phone: yup.string()
            .matches(regexPhone, { message: 'Phone number must be a valid phone', excludeEmptyString: true })
            .nullable()
            .transform((_, value) => {
                return value === "" ? null : value
            })
            .test('checkUniqueUserPhone', 'This phone is already registered', async value => {
                if (value && value !== account.links.phone) {
                    return await checkUniqueInfoByType({ dbName: 'user_links', type: 'phone', value }).then(resp => resp.data.isUnique)
                }
                return true
            }),
        twitter: yup.string()
            .nullable()
            .matches(twitterHandleRegex, { message: 'This twitter name is not valid', excludeEmptyString: true }),

        instagram: yup.string()
            .nullable()
            .matches(instagramHandleRegex, { message: 'This instagram name is not valid', excludeEmptyString: true })
    })
}
