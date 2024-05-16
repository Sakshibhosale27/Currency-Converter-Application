import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
     let [exchangeRates,setExchangeRates] = useState({});
     let [amount,setAmount] = useState(1);
     let [fromCurrency,setFromCurrency] = useState('USD');
     let [toCurrency,setToCurrency] = useState('INR');
     let [convertedAmount,setConvertedAmount] = useState(null);
    
     useEffect(() => {
      // Fetch exchange rates from a free API (replace with your preferred API)
      const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
       
      axios.get(apiUrl)
        .then(response => {
          setExchangeRates(response.data.rates);
          console.log(response.data.rates);
        })
        .catch(error => {
          console.error('Error fetching exchange rates:', error);
        });
    }, [fromCurrency]);


  useEffect(()=>{
    const conversionRate = exchangeRates[toCurrency];
    if(conversionRate)
    {
      const converted = amount * conversionRate;
      setConvertedAmount(converted.toFixed(2));
    }
  },[amount,fromCurrency,toCurrency,exchangeRates]);

          
     const handleChange =(e) =>{
       const {name,value} = e.target;
       switch(name){
            case 'amount':
            setAmount(value);
            break;

            case 'fromCurrency':
            setFromCurrency(value);
            break;

            case 'toCurrency':
            setToCurrency(value);
            break;
       }

     }
 
 
  return (
    <div className='card'>      
      <h1 className='text-6x1'>Currency Converter</h1>
     
     {/*wrapper*/}
      <div className='currency_exchange'>
          
      


     
     {/*input container 1*/}
      <div className="input_container"> 
           <lable className="input_lable"> Amount:</lable> 
           <input type='number'  name='amount' value={amount} className="input_field" onChange={handleChange} />
            </div>
            



       {/*input container 2*/}
      <div className="input_container"> 
            <lable className="input_lable">From Currency:</lable>
          <select name="fromCurrency" value={fromCurrency} onChange={handleChange} className='input_field'>
          {
              Object.keys(exchangeRates).map(currency =>(
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))
            }
          </select>
          </div>

        {/*input container 3*/} 
        <div className="input_container"> 
            <lable className="input_lable">To Currency:</lable>
          <select name="toCurrency"  value={toCurrency} onChange={handleChange} className='input_field'>
          {Object.keys(exchangeRates).map(currency => (
              <option key={currency} value={currency}>
                {currency}
              </option>
              ))
            }
           </select>
          </div> 

          
         
        
        
        
      
        </div> 
          <div className='output'>
           <h2>Convert Amount:<b>{convertedAmount}</b></h2>
          </div>
  
      </div>
   
  );
}

export default App;
