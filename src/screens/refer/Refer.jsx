import React from 'react'
import { BottomNav, Header } from '../../components'
import './refer.css'
import { ReferBanner } from '../../assets/svg/CustomSVG'

const Refer = () => {

    const shareLink = () => {
        // Replace this URL with the link you want to share
        const linkToShare = 'https://example.com';
        
        // Use the Web Share API to share the link
        if (navigator.share) {
          navigator.share({
            title: 'Share this link',
            url: linkToShare,
          })
          .then(() => console.log('Link shared successfully'))
          .catch(error => console.error('Error sharing link:', error));
        } else {
          console.warn('Web Share API not supported');
          // Fallback behavior if Web Share API is not supported
          // You can open a new window with the link or display a message
        }
      };
    return (
        <div >
            <div className="container">
                <BottomNav />
                <Header title={"Refer"} path={"/"} />

                <div className='mt-3 d-flex justify-content-center'>
                    <ReferBanner />
                </div>

                <div>
                    <h1 className='text-center mt-4 refer-heading'>Refer and Earn ₹500</h1>
                    <p className='refer-desc text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit esse saepe, quaerat perspiciatis aliquam earum!</p>
                </div>

                <div className='d-flex justify-content-center mt-5'>
                    <button
                        className="w-75 mb-2 withdraw__btn refer-btn"
                        style={{ height: 55 }}
                        onClick={shareLink}
                    >
                        Refer
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Refer