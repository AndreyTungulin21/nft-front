import Fields from '@components/Inputs/Inputs';
import { useDispatch } from "react-redux";
import WindowIcon from '@mui/icons-material/WindowOutlined';
import GridOnIcon from '@mui/icons-material/GridOnOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesomeMosaicOutlined';
import React, { useEffect } from 'react';
import { setBarSwitchGrid, setFilterProfile } from '@src/store/info/infoSlice';
import { useForm, useWatch } from "react-hook-form";

export default function Search() {
    const dispatch = useDispatch();

    const multiSwitchBtns = [
        {
            icon: <WindowIcon />,
            title: 'window'
        },
        {
            icon: <GridOnIcon />,
            title: 'grid'
        },
        {
            icon: <AutoAwesomeIcon />,
            title: 'autoAwesome'
        }
    ]

    const { register, control } = useForm({
        defaultValues: {
            search: ''
        }
    })

    const search = useWatch({
        control,
        name: 'search'
    })

    useEffect(() => {
        dispatch(setFilterProfile({ search }))
        return () => { }
    }, [search])

    const onChangeMultiSwitch = (btn) => {
        dispatch(setBarSwitchGrid(btn.title))
    }

    return (
        <div className='search-content'>
            <div className='search-content__search'>
                <Fields.search register={register} label={'search'} />
            </div>
            <div className='search-content__fresnel'>
                <Fields.multiSwitch defaultValue="window" btns={multiSwitchBtns} onChange={onChangeMultiSwitch} />
            </div>
        </div>
    )
}
