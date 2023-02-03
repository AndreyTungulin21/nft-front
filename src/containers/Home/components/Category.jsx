import React from 'react'

import category1 from '@img/category/category_1.png'
import category2 from '@img/category/category_2.png'
import category3 from '@img/category/category_3.png'
import category4 from '@img/category/category_4.png'
import category5 from '@img/category/category_5.png'
import category6 from '@img/category/category_6.png'
import category7 from '@img/category/category_7.png'
import category8 from '@img/category/category_8.png'
import category9 from '@img/category/category_9.png'
import Image from 'next/image'
import { categoryItems } from '@src/helpers/variables'
import Link from 'next/link'

export default function Category() {

    const cards = categoryItems.map(item => {
        let img
        switch (item.value) {
            case 1:
                img = category1
                break;
            case 2:
                img = category2
                break;
            case 3:
                img = category3
                break;
            case 4:
                img = category4
                break;
            case 5:
                img = category5
                break;
            case 6:
                img = category6
                break;
            case 7:
                img = category7
                break;
            case 8:
                img = category8
                break;
            case 9:
                img = category9
                break;
        }


        return new Object({ img, ...item })
    })

    const CategoryCard = ({ item }) => {
        return (
            <Link href={{ pathname: '/explore-collections', query: { name: item.name } }} className='category-card'>
                <div className='img'>
                    <Image alt="" src={item.img} />
                </div>
                <div className='name'>{item.name}</div>
            </Link>

        )
    }

    return (
        <div className='home__category'>
            <h2 className='home__category__title'>Browse by category</h2>
            <div className='home__category__body'>
                {cards.map((item, i) => {
                    return <CategoryCard key={i} item={item} />
                })}
            </div>
        </div>
    )
}
