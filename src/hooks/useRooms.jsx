import { useState, useEffect } from 'react';


function useRooms (userId) {
    const [joinedRooms, setJoinedRooms] = useState([]);

    const onCreateRoom = async (formData) => {
        try {
            const response = await fetch("http://localhost:8080/createChatRoom", {
                method: "POST",
                body: formData,
            });

            const textResponse = await response.text();

            if (response.ok) {
                const data = JSON.parse(textResponse);
                updateWithNewRoom(data);
                console.log("Room created successfully:", data);
                return data
            }
        } catch (error) {
            console.error("Error creating room:", error);
        }
    };

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

            setJoinedRooms(combinedRooms);
        } catch (error) {
            console.error("Error fetching joined rooms:", error);
        }
    };

    useEffect(() => {
        fetchAllJoinedRooms(userId);
    }, [userId]);

    const updateWithNewRoom = (newRoom) => {
        setJoinedRooms((prevRooms) => {
            const updatedRooms = [...prevRooms, newRoom];
            return updatedRooms;
        });
        console.log("Updated joinedRooms: ", joinedRooms);

    };

    return { joinedRooms, onCreateRoom };
}

export { useRooms };