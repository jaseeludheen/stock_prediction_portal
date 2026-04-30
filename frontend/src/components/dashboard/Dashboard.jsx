import axios from 'axios'
import React, {useEffect, useState} from 'react'
import axiosInstance from '../../axiosInstance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner} from '@fortawesome/free-solid-svg-icons'


const Dashboard = () => {

    const [ticker, setTicker] = useState('')
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const [plot, setPlot] = useState()
    const [ma100, setMA100] = useState()
    const [ma200, setMA200] = useState()
    const [prediction, setPrediction] = useState()
    const [mse, setMSE] = useState()
    const [rmse, setRMSE] = useState()
    const [r2, setR2] = useState()

    // import the base URL from the environment
    const BASE_URL = import.meta.env.VITE_BASE_URL;


    useEffect( ()=> {
        const fetchProtectedData = async () => {
            try{
                const response = await axiosInstance.get('/protected-view/');
                //console.log('Sucess:', response.data);
            }catch(error){
                console.error('Error fetching data :', error)
            }
        }

        fetchProtectedData()
    },[])

    const handleSubmit = async (e)=> {
        e.preventDefault();
        setLoading(true)
        try{
            const response = await axiosInstance.post('/predict/', {
                ticker: ticker
            })

            console.log(response.data)

            // Set the Plot
            const plotUrl = `${BASE_URL}${response.data.plot_img}`
            const ma100Url = `${BASE_URL}${response.data.plot_100_dma}`
            const ma200Url = `${BASE_URL}${response.data.plot_200_dma}`
            const predictionUrl = `${BASE_URL}${response.data.plot_prediction}`
            //console.log(plotUrl)

            setPlot(plotUrl)
            setMA100(ma100Url)
            setMA200(ma200Url)
            setPrediction(predictionUrl)

            setMSE(response.data.mse)
            setRMSE(response.data.rmse)
            setR2(response.data.r2)

            if(response.data.error){
                setError(response.data.error)
            }
               
        }catch(error){
            console.error('There was an error making the API request', error)
        }finally{
            setLoading(false)
        }
    }

  return (
        <div className='container'>
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <form onSubmit={handleSubmit}>
                        <input type="text" className='form-control' placeholder='Enter Stock Ticker' 
                        onChange={(e) => setTicker(e.target.value)} required
                        />
                        <small>{error && <div className="text-danger">{error}</div>}</small>
                        <div className="d-flex justify-content-center mt-3">
                            <button type="submit" className='btn btn-info mt-3 '>
                                {loading ? <span><FontAwesomeIcon icon={faSpinner} spin /> Please wait... </span> : 'See The Prediction'}
                            </button>
                        </div>
                        
                    </form>
                </div>

                {/* Display the  prediction plots */}
                { prediction && (
                    <div className="prediction mt-5">
                    <div className="p-3">
                        {plot && (
                            <img src={plot} alt="" style={ {maxWidth: '100%'} }/>
                        )}
                    </div>

                    <div className="p-3">
                        {ma100 && (
                            <img src={ma100} alt="" style={ {maxWidth: '100%'} }/>
                        )}
                    </div>

                    <div className="p-3">
                        {ma200 && (
                            <img src={ma200} alt="" style={ {maxWidth: '100%'} }/>
                        )}
                    </div>

                    <div className="p-3">
                        {prediction && (
                            <img src={prediction} alt="" style={ {maxWidth: '100%'} }/>
                        )}
                    </div>

                    <div className="text-light p-3 bg-dark rounded text-center">
                        <h4>Model Evaluation Metrics</h4>
                        <p><strong>Mean Squared Error (MSE):</strong> {mse}</p>
                        <p><strong>Root Mean Squared Error (RMSE):</strong> {rmse}</p>
                        <p><strong>R-squared (R²):</strong> {r2}</p>
                    </div>

                </div>
                )}

                

            </div>
        </div>
    



  )
}

export default Dashboard