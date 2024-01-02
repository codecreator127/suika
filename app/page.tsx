import Leaderboard from './leaderboard'
import FruitCycle from './fruit-cycle'

export default function Home() {
  return (
    <main className="flex min-h-screen justify-center items-start p-24">
      <Leaderboard></Leaderboard>
      <FruitCycle></FruitCycle>

    </main>
  )
}
