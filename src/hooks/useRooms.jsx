import { useState, useEffect } from 'react';


function useRooms(userId) {
    const [joinedRooms, setJoinedRooms] = useState([]);

    async function fetchAllJoinedRooms (userId) {
        var res = await fetch(`http://localhost:8080/getJoinedRooms?userId=${userId}`); 
        var data = await res.json();
        console.log(data);
        return data;
    }

    useEffect(() => {
        fetchAllJoinedRooms(userId).then(data => {
            setJoinedRooms(data);
        });
    }, [userId]);

    return joinedRooms;
}

export { useRooms };