import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../firebase.config'
// import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
// import 'swiper/swiper-bundle.css'
import Spinner from './Spinner'
// SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
// import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/a11y';

function Slider() {
    const swiperRef = useRef(null);
    const [loading, setLoading] = useState(true)
    const [listings, setListings] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchListings = async () => {
            const listingsRef = collection(db, 'listings')
            const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5))
            const querySnap = await getDocs(q)

            let listings = []

            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })

            setListings(listings)
            setLoading(false)
        }

        fetchListings()
    }, [])

    if (loading) {
        return <Spinner />
    }

    if (listings.length === 0) {
        return <></>
    }


    return (
        listings && (
            <>
                <p className='exploreHeading'>Recommended</p>
                <div id="previousButton" onClick={() => swiperRef.current.swiper.slidePrev()} />
                <div id="nextButton" onClick={() => swiperRef.current.swiper.slideNext()} />
                <Swiper
                    ref={swiperRef}
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    navigation
                    style={{ height: '300px' }}
                >
                    {
                        listings.map(({ data, id }) => (
                            <SwiperSlide
                                key={id}
                                onClick={() => navigate(`/category/${data.type}/${id}`)}
                            >
                                <div
                                    style={{
                                        background: `url(${data.imgUrls[0]}) center no-repeat`,
                                        // backgroundSize: 'cover',
                                    }}
                                    className='swiperSlideDiv'
                                >
                                    <p className='swiperSlideText'>{data.name}</p>
                                    <p className='swiperSlidePrice'>
                                        ${data.discountedPrice ?? data.regularPrice}{' '}
                                        {data.type === 'rent' && '/ month'}
                                    </p>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                    )
                </Swiper>
            </>
        )
    )
}

export default Slider