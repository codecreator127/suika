'use client'
import { db } from '../firebase';
import { useState, useEffect } from 'react';
import FruitCycleImage from '../public/assets/fruit-cycle.png';

const Leaderboard = () => {

    const [leaderboardData, setLeaderboardData] = useState<any[]>([]);;

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const leaderboardSnapshot = await db.collection('leaderboard').get();
                const data = leaderboardSnapshot.docs.map(doc => doc.data());
                setLeaderboardData(data);
            } catch (error) {
                console.log('Error fetching leaderboard data:', error);
                return null;
            }
        }

        fetchLeaderboard();
    }, [])

    return (
        <div className="content-normal items-center px-10"> 
            <table className='text-lg'>
                <tr>
                    <th>Leaderboard</th>
                </tr>
                <tbody>
                    {leaderboardData.map(item => (
                        <tr key={"leaderboardData"}>
                            <td><img src={item.image} width={40} height={40}></img></td>
                            <td>{item.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <img src={FruitCycleImage.src} alt="fruit cycle" height={200} width={200}/>
        
        </div>
    )
}

export default Leaderboard;