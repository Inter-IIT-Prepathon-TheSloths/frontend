import { useEffect } from "react"
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [_, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams()
  }, [])
  return (
    <div>Home</div>
  )
}

export default Home