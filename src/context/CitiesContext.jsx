import { createContext, useContext, useEffect, useReducer, useState } from "react"

const CitiesContext = createContext()

const initialState = {
    cities: [],
    loading: false,
    currentCity: [],
    error: ''
}

function reducer(state, action) {
    switch (action.type) {
        case 'loading':
            return {
                ...state,
                loading:true
            }

        case 'cities/loaded':
            return {
                ...state,
                loading: false,
                cities: action.payload,
            }
        case 'city/loaded':
            return {
                ...state,
                loading: false,
                currentCity: action.payload,
            }
        
        case 'city/created':
            return {
                ...state,
                loading: false,
                cities: [...state.cities, action.payload],
                currentCity: action.payload
            }

        case 'city/deleted':
            return {
                ...state,
                loading:false,
                cities: action.payload,
                currentCity: []
            }

        case 'rejected' :
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
    
        default:
            throw new Error("Unknown action type");
    }
}

function CitiesContextProvider({children}) {
    const [{cities, loading, currentCity}, dispatch] = useReducer(reducer, initialState)

    async function getCurrentCity(visitedId) {
        if (Number(visitedId) === currentCity.id) {
            return
        }
        try {
            const res = await fetch(`http://localhost:8000/cities/${visitedId}`)
            dispatch({type: 'loading'})
            const data = await res.json()
            dispatch({type: 'city/loaded', payload:data})
          } catch (error) {
           dispatch({type: 'rejected', payload: error.message})
          }
    }

    async function createCity(newCity) {
        try {
            const res = await fetch(`http://localhost:8000/cities`, {
                method: 'POST',
                body: JSON.stringify(newCity),
                headers: {
                    'Content-Type':'application/json'
                }
            })
            dispatch({type: 'loading'})
            const data = await res.json()
            console.log(data)
            dispatch({type: 'city/created', payload: data})
          } catch (error) {
            dispatch({type: 'rejected', payload: error.message})
          } 
    }

    async function deleteCity(cityId) {
        try {
            await fetch(`http://localhost:8000/cities/${cityId}`, {
                method: 'DELETE'
            })
            dispatch({type: 'loading'})
            dispatch({type: 'city/deleted', payload: cities.filter(city => city.id !== cityId)})
          } catch (error) {
            dispatch({type: 'rejected', payload: error.message})
          } 
    }

    useEffect(function(){
      async function fetchCity(){
       try {
         const res = await fetch('http://localhost:8000/'+'cities')
         dispatch({type: 'loading'})
         const data = await res.json()
         dispatch({type: 'cities/loaded', payload:data})
       } catch (error) {
        dispatch({type: 'rejected', payload: error.message})
       }
      }
      fetchCity()
    },[])
    return (
        <CitiesContext.Provider value={{
            cities,
            loading,
            currentCity,
            getCurrentCity,
            createCity,
            deleteCity,
        }}>
            {children}
        </CitiesContext.Provider>
    )
}

function useCitiesContext() {
    const context = useContext(CitiesContext)
    if (context === undefined) {
        throw new Error("was used outside context provider")
    }
    return context
}

export { CitiesContextProvider, useCitiesContext }