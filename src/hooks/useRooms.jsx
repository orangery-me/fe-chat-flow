import { useState, useEffect } from 'react';


function useRooms(userId) {
    const [joinedRooms, setJoinedRooms] = useState([]);

    useEffect(() => {
        const fetchAllJoinedRooms = async (userId) => {
            try {
                const [resJoinedRooms, resPrivateRooms] = await Promise.all([
                    fetch(`http://localhost:8080/getJoinedRooms?userId=${userId}`),
                    fetch(`http://localhost:8080/getJoinedPrivateRooms?userId=${userId}`)
                ]);
                if (!resJoinedRooms.ok) {
                    const errorMessage = await resJoinedRooms.text();
                    throw new Error(`Error fetching public rooms: ${errorMessage}`);
                }
                if (!resPrivateRooms.ok) {
                    const errorMessage = await resPrivateRooms.text();
                    throw new Error(`Error fetching private rooms: ${errorMessage}`);
                }
                
                const dataJoinedRooms = await resJoinedRooms.json();
                const dataPrivateRooms = await resPrivateRooms.json();
                const combinedRooms = [...dataJoinedRooms, ...dataPrivateRooms];

                console.log("Joined Rooms Data:", combinedRooms);
                setJoinedRooms(combinedRooms);
            } catch (error) {
                console.error("Error fetching joined rooms:", error);
            }
        };
    
        fetchAllJoinedRooms(userId);
        
    }, [userId]);
    

    return joinedRooms;
}

export { useRooms };