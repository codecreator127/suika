'use client'
import { db } from '../firebase';
import { useState, useEffect } from 'react';


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
        <div className="content-normal items-center p-20"> 
            <table>
                <tr>
                    <th>Leaderboard</th>
                </tr>
                <tbody>
                    {leaderboardData.map(item => (
                        <tr key={"leaderboardData"}>
                        <td><img src={item.image} width={20} height={20}></img></td>
                        <td>{item.rank}</td>
                        <td>{item.score}</td>
                        </tr>
                    ))}
                    </tbody>
            </table>
        
        </div>
    )
}

export default Leaderboard;