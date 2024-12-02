import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const LOCAL_IP_ADDRESS = "192.168.1.13:8000";

function CallRoom () {
    const roomId = useParams()["roomId"];
    const socketRef = useRef(null); // Lưu trữ instance socket
    const btnToggleVideoRef = useRef(null);
    const btnToggleAudioRef = useRef(null);
    const roomDivRef = useRef(null);
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);

    // if (!socketRef.current) {
    //     socketRef.current = io(`http://${LOCAL_IP_ADDRESS}`);
    // }

    // socketRef.current.on("connected", (clientId) => {
    //     console.log("Client connected with ID:", clientId);
    //     // socketRef.current.emit("joinRoom", roomId);
    //     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    //         .then(stream => {
    //             localStream = stream;
    //             if (localVideoRef.current) {
    //                 localVideoRef.current.srcObject = stream; // Phát video lên local video element
    //             }

    //             // Sau khi có stream, gửi sự kiện "ready" lên server
    //             socketRef.current.emit("ready", roomId);
    //         })
    //         .catch(err => {
    //             console.error("Error getting user media:", err);
    //         });
    // });

    useEffect(() => {
        if (!socketRef.current) {
            socketRef.current = io(`http://${LOCAL_IP_ADDRESS}`, {
                transports: ["websocket"], // Buộc sử dụng websocket
            });
        }

        socketRef.current.on("connected", (clientId) => {
            console.log("Client connected with ID:", clientId);

            // Chờ sự kiện 'ready' từ server hoặc xử lý việc gọi camera tại đây
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then(stream => {
                    localStream = stream;
                    if (localVideoRef.current) {
                        localVideoRef.current.srcObject = stream; // Phát video lên local video element
                    }

                    // Sau khi có stream, gửi sự kiện "ready" lên server
                    socketRef.current.emit("ready", roomId);
                })
                .catch(err => {
                    console.error("Error getting user media:", err);
                });
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.off("connected"); // Cleanup khi component unmount
            }
        };
    }, [roomId]); // Đảm bảo rằng `roomId` được sử dụng đúng khi thay đổi


    const toggleTrack = (trackType) => {
        if (!localStream) return;

        const track =
            trackType === "video"
                ? localStream.getVideoTracks()[0]
                : localStream.getAudioTracks()[0];
        track.enabled = !track.enabled;

        const buttonRef =
            trackType === "video" ? btnToggleVideoRef.current : btnToggleAudioRef.current;
        const icon = buttonRef.querySelector("i");
        icon.className =
            trackType === "video"
                ? track.enabled
                    ? "bi bi-camera-video-fill"
                    : "bi bi-camera-video-off-fill"
                : track.enabled
                    ? "bi bi-mic-fill"
                    : "bi bi-mic-mute-fill";
    };


    // useEffect(() => {
    //     // Chỉ khởi tạo socket nếu chưa có
    //     if (!socketRef.current) {
    //         socketRef.current = io(`http://${LOCAL_IP_ADDRESS}`, {
    //             transports: ["websocket"], // Buộc sử dụng websocket
    //         });

    //         socketRef.current.on("connected", (clientId) => {
    //             console.log("Client connected with ID:", clientId);
    //             socketRef.current.emit("joinRoom", roomId);
    //         });

    //         socketRef.current.on("created", (room) => {
    //             console.log(`Room created: ${room}`);
    //         });

    //         socketRef.current.on("joined", (room) => {
    //             console.log(`Joined room: ${room}`);
    //         });
    //     }

    //     return () => {
    //         if (socketRef.current) {
    //             socketRef.current.emit("leaveRoom", roomId);
    //             socketRef.current.disconnect();
    //             socketRef.current = null; // Dọn sạch socket khi component unmount
    //         }
    //     };
    // }, [roomId]);

    return (
        <div>
            <h1 style={{ textAlign: "center", margin: "15px 10px 30px 10px" }}>VIDEO CALL</h1>
            <div id="roomDiv" ref={roomDivRef} className="d-flex flex-column align-items-center mt-3">
                <h4 style={{ paddingBottom: "10px" }}>Remote Video</h4>
                <div
                    id="remoteVideoContainer"
                    style={{
                        width: "600px",
                        height: "450px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#363636",
                    }}
                >
                    <video
                        id="remoteVideo"
                        ref={remoteVideoRef}
                        autoPlay
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    ></video>
                </div>

                <div className="d-flex mt-3">
                    <button
                        id="toggleVideo"
                        ref={btnToggleVideoRef}
                        className="btn-circle enabled-style"
                        onClick={() => toggleTrack("video")}
                    >
                        <i className="bi bi-camera-video-fill"></i>
                    </button>
                    <button
                        id="toggleAudio"
                        ref={btnToggleAudioRef}
                        className="btn-circle enabled-style"
                        onClick={() => toggleTrack("audio")}
                    >
                        <i className="bi bi-mic-fill"></i>
                    </button>
                </div>

                <video
                    muted
                    id="localVideo"
                    ref={localVideoRef}
                    autoPlay
                    style={{
                        width: "200px",
                        height: "200px",
                        position: "absolute",
                        bottom: "20px",
                        right: "20px",
                    }}
                ></video>
            </div>
        </div>
    );
}

export default CallRoom;
