import { useState, useEffect } from 'react';


function useRooms(userId) {
    const [joinedRooms, setJoinedRooms] = useState([]);

    useEffect(() => {
        const fetchAllJoinedRooms = async (userId) => {
            try {
                const res = await fetch(`http://localhost:8080/getJoinedRooms?userId=${userId}`);

                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await res.json();
                console.log("Joined Rooms Data:", data); 
                setJoinedRooms(data);
            } catch (error) {
                console.error("Error fetching joined rooms:", error);
            }
        };
    
        fetchAllJoinedRooms(userId);
    }, [userId]);
    

    return joinedRooms;
}

export { useRooms };