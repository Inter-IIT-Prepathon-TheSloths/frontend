import { useUser } from "../context/context.tsx";

const Home = () => {
  const { user } = useUser();

  return (
    <div>
      Hello {user?.name}!
    </div>
  )
}

export default Home