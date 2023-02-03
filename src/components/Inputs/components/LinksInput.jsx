import React from 'react'
import Fields from '../Inputs'

export default function LinksInput({ inputs, register, title }) {
  return (
    <>
      <div className='linksInputContainer__title'>{title}</div>
      <div className='linksInputContainer'>
        {inputs.map((item, key) => {
          return <div key={key} className='linksInputContainer__input'>
            {item.img}
            <Fields.input
              label={item.label}
              defaultValue={item.defaultValue}
              register={register}
              placeholder={item.label}
            />
          </div>
        })}
      </div>

    </>
  )
}
