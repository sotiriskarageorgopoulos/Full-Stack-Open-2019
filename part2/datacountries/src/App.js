import React, {useEffect,useState} from 'react'
import axios from 'axios'

const App = () => {

   const [countries,setCountries] = useState([])
   const [name,setName] = useState('')
   let   [possibleCountries,setPossibleCountries] = useState([])
   
   useEffect(()=>{
       axios.get('https://restcountries.eu/rest/v2/all')
           .then(response =>{
               setCountries(response.data)
           })
   },[])

   const handleCountries = (event) =>{
      event.preventDefault()
      setName(event.target.value)
      console.log(event.target.value)
      possibleCountries = countries.filter(c=>c.name.toUpperCase().includes(event.target.value.toUpperCase()) 
                                          || c.name.toLowerCase().includes(event.target.value.toLowerCase()))
      setPossibleCountries(possibleCountries)
      console.log(possibleCountries)
   }
  
   const displayCountries = () => {
        if(possibleCountries.length > 10){
            return (<p>Too many matches,specify another filter</p>)
        } 
        else if(possibleCountries.length > 1 && possibleCountries.length <= 10){
            return possibleCountries.map((c,i)=>(<p key={i}>{c.name}</p>))
        }
        else if(possibleCountries.length === 1){
            return (<>
                <h1>{possibleCountries[0].name}</h1>
                <p>capital:{possibleCountries[0].capital}</p>
                <p>population:{possibleCountries[0].population}</p>
                <div>
                   <h1>languages</h1>
                   {possibleCountries[0].languages.map((l,i)=>(<li key={i}>{l.name}</li>))}
                   <img src={possibleCountries[0].flag} alt={possibleCountries[0].name} width="200px" height="200px"/> 
                </div> 
                 </>)
        }
   }

   return (
       <div>
         <p>find countries<input value={name} onChange={handleCountries}/></p>
         {displayCountries()}
       </div>
   )
}

export default App