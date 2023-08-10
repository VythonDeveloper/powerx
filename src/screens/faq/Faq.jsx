import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import { dbObject } from '../../helper/constant'

const Faq = () => {
    const [list, setList] = useState([])

    const fetchData = async () => {
        try {
            const { data } = await dbObject('documents/faq.php')
            if(!data.error) return setList(data.response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className='container'>
            <Header title={'Faq'} path={'/profile'} />

            <div>
                <div class="accordion mt-4" id="accordionExample">
                    {
                        list.map((item, i) => (
                            <div class="accordion-item" key={i}>
                                <h2 class="accordion-header" id={"heading"+i}>
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse"+i} aria-expanded="true" aria-controls={"collapse"+i}>
                                       {item.title}
                                    </button>
                                </h2>
                                <div id={"collapse"+i} class="accordion-collapse collapse show" aria-labelledby={"heading"+i} data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        {item.content}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Faq