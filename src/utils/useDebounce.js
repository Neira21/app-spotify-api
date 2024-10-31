import { useState, useEffect } from "react"

const useDebounce = (value, delay) => {

  const [debounceValue, setDeboundValue] = useState(value)

  useEffect(()=>{
    const handler = setTimeout(()=>{
      setDeboundValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return (
    debounceValue
  )
}

export default useDebounce