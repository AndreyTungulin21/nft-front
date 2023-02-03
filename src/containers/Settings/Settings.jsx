import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { unwrapResult } from '@reduxjs/toolkit';
import { yupResolver } from '@hookform/resolvers/yup';

import { toast } from "react-hot-toast";
import SettingsBar from './components/SettingsBar'
import Fields from '@components/Inputs/Inputs'

import { updaterUser } from '@src/store/user/userSlice'
import { selectAccount } from '@src/store/user/userSlice';

import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

import { settingsSchema } from './data';
import { toBase64 } from '@src/helpers/Common';

export default function Settings() {
    const dispatch = useDispatch()
    const account = useSelector(selectAccount);
    const router = useRouter()

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        shouldUnregister: true,
        mode: "onBlur",
        resolver: yupResolver(settingsSchema(account))
    });

    useEffect(() => {
        reset(account)
    }, [account])


    const onSubmit = async (data) => {

        if (data.profile_logo?.length > 0 && data.profile_logo[0]?.size) {
            data.logoImage = await toBase64(data.profile_logo[0])
        }

        if (data.profile_back?.length > 0 && data.profile_back[0]?.size) {
            data.backImage = await toBase64(data.profile_back[0])
        }

        // delete data.profile_logo
        // delete data.profile_back

        dispatch(updaterUser({ ...data, id: account.id }))
            .then(unwrapResult)
            .then(() => {
                toast.success('The profile has been successfully updated')
                router.push({ pathname: '/account/[wallet]', query: { wallet: account.wallet } })
            })
            .catch((err) => {
                toast.error('The profile was not saved')
            })
    }

    return (
        <div className='settings'>
            <div className='settings__left'>
                <SettingsBar />
            </div>
            <div className='settings__right'>
                <div className='settings__right__body'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='settings__right__body__content'>
                            <h2 className='header'>Profile details</h2>
                            <Fields.input
                                title={'Username'}
                                label='username'
                                defaultValue={account.username}
                                placeholder='Enter username'
                                register={register}
                                error={errors.username}
                                required
                            />
                            <Fields.textArea
                                title={'Bio'}
                                defaultValue={account.bio}
                                label='bio'
                                error={errors.bio}
                                placeholder='Tell the world your story!'
                                register={register}
                            />
                            <Fields.input
                                title={'Email address'}
                                label='email'
                                defaultValue={account.links?.email}
                                placeholder='Enter email'
                                register={register}
                                error={errors.email}
                            />
                            <Fields.input
                                title={'Phone'}
                                label='phone'
                                defaultValue={account.links?.phone}
                                placeholder='ex. 1(111)111-111'
                                register={register}
                                error={errors.phone}
                            />
                            <Fields.linksInput
                                label='socials'
                                title={'Social links'}
                                inputs={[
                                    { img: <InstagramIcon />, defaultValue: account.links?.instagram, label: 'instagram' },
                                    { img: <TwitterIcon />, defaultValue: account.links?.twitter, label: 'twitter' },
                                    // { img: <YouTubeIcon />, label: 'youtube' }
                                ]}
                                register={register}
                            />
                            <button className='btn btn-blue' type='submit' >Save</button>
                        </div>
                        <div className='settings__right__body__imgs'>
                            <Fields.image
                                defaultValue={account.profileImg}
                                className='profile'
                                title={'Profile Image'}
                                label='profile_logo'
                                register={register}
                            />

                            <Fields.image
                                defaultValue={account.profileBackImg}
                                className='banner'
                                title={'Profile banner'}
                                label='profile_back'
                                register={register}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
