import React from 'react'
import Button from './Button'

const Main = () => {
  return (
    <>
    <div className='container'>
        <div className="p-5 text-center bg-light-dark rounded-3">
            <h2 className='text-light'>Stock Prediction Portal</h2>
            <p className='text-light lead'>
                Welcome to the Stock Prediction Portal. This platform leverages advanced machine learning algorithms to provide accurate stock price predictions. Whether you're an investor, trader, or financial enthusiast, our portal offers valuable insights to help you make informed decisions in the stock market.
            </p>
            <Button text='Login' class='btn-outline-danger' />

        </div>

    </div>

    
    </>
  )
}

export default Main