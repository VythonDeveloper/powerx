import React, { useEffect, useState } from 'react'
import { dbObject } from '../../helper/constant'
import Header from '../../components/header/Header'

const About = () => {
    const [about, setAbout] = useState('')

    const fetchData = async () => {
        try {
            const { data } = await dbObject.get('/documents/about-us.php')
            if (!data.error) {
                setAbout(data.response.content)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className='container'>
            <Header title={'About Us'} path={'/profile'} />
            <div className="content" dangerouslySetInnerHTML={{__html: about}}></div>
        </div>
    )
}

export default About