import Image from 'next/image'
import Leaderboard from './leaderboard'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Leaderboard></Leaderboard>
    </main>
  )
}
