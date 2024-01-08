import Leaderboard from './leaderboard'
import FruitCycle from './fruit-cycle'
import GameArea from './gamearea'

export default function Home() {
  return (
    <main className="flex min-h-screen p-10 justify-center">
      <Leaderboard></Leaderboard>
      <GameArea/>
      <FruitCycle></FruitCycle>

    </main>
  )
}
