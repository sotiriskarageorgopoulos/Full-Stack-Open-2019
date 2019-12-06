import React, {useEffect,useState} from 'react'
import axios from 'axios'

const App = () => {

   const [countries,setCountries] = useState([])
   const [country,setCountry] = useState('')
   let   [possibleCountries,setPossibleCountries] = useState([])
   
   useEffect(()=>{
       axios.get('https://restcountries.eu/rest/v2/all')
           .then(response =>{
               setCountries(response.data)
           })
   },[])

   const handleCountries = (event) =>{
      event.preventDefault()
      setCountry(event.target.value)
      console.log(event.target.value)
      possibleCountries = countries.filter(c=>c.name.toUpperCase().includes(event.target.value.toUpperCase()) 
                                          || c.name.toLowerCase().includes(event.target.value.toLowerCase()))
      setPossibleCountries(possibleCountries)
      console.log(possibleCountries)
   }
  
   const display = () => {
        if(possibleCountries.length > 10){
            return (<p>Too many matches,specify another filter</p>)
        } 
        else if(possibleCountries.length > 1 && possibleCountries.length <= 10){
            return possibleCountries.map((c,i)=>(<p key={i}>{c.name}</p>))
        }
        else if(possibleCountries.length === 1){
            return (<p>{possibleCountries[0].name}</p>)
        }
   }

   return (
       <div>
         <p>find countries<input value={country} onChange={handleCountries}/></p>
         {display()}
       </div>
   )
}

export default App