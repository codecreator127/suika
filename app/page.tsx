import Leaderboard from './leaderboard'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Leaderboard></Leaderboard>
      <FruitCycle></FruitCycle>

    </main>
  )
}
