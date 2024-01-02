import Leaderboard from './leaderboard'
import FruitCycle from './fruit-cycle'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Leaderboard></Leaderboard>
      <FruitCycle></FruitCycle>

    </main>
  )
}
