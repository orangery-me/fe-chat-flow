import React, { useEffect, useRef } from "react";

const LOCAL_IP_ADDRESS = "192.168.1.12:8000";

function CallRoom () {
    const roomNameRef = useRef(null);
    const btnConnectRef = useRef(null);
    const btnToggleVideoRef = useRef(null);
    const btnToggleAudioRef = useRef(null);
    const roomConfigRef = useRef(null);
    const roomDivRef = useRef(null);
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);

    useEffect(() => {
        const socket = io.connect(`http://${LOCAL_IP_ADDRESS}`);
        const streamConstraints = { audio: true, video: true };
        const iceServers = {
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        };

        let localStream, remoteStream, rtcPeerConnection;
        let isCaller = false;
        let roomName = "";

        // Tạo các hàm xử lý toggle
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
            icon.className = trackType === "video"
                ? track.enabled
                    ? "bi bi-camera-video-fill"
                    : "bi bi-camera-video-off-fill"
                : track.enabled
                    ? "bi bi-mic-fill"
                    : "bi bi-mic-mute-fill";
        };

        // Nút kết nối phòng
        btnConnectRef.current.onclick = () => {
            const input = roomNameRef.current.value;
            if (!input) {
                alert("Room cannot be empty!");
                return;
            }

            roomName = input;
            socket.emit("joinRoom", roomName);
            roomConfigRef.current.classList.add("d-none");
            roomDivRef.current.classList.remove("d-none");
        };

        // Gắn các sự kiện socket
        const handleSocketEvent = (eventName, callback) => socket.on(eventName, callback);

        handleSocketEvent("created", () => {
            navigator.mediaDevices
                .getUserMedia(streamConstraints)
                .then((stream) => {
                    localStream = stream;
                    localVideoRef.current.srcObject = stream;
                    isCaller = true;
                })
                .catch(console.error);
        });

        handleSocketEvent("joined", () => {
            navigator.mediaDevices
                .getUserMedia(streamConstraints)
                .then((stream) => {
                    localStream = stream;
                    localVideoRef.current.srcObject = stream;
                    socket.emit("ready", roomName);
                })
                .catch(console.error);
        });

        handleSocketEvent("ready", () => {
            if (isCaller) {
                rtcPeerConnection = new RTCPeerConnection(iceServers);
                rtcPeerConnection.onicecandidate = (event) => {
                    if (event.candidate) {
                        socket.emit("candidate", {
                            type: "candidate",
                            label: event.candidate.sdpMLineIndex,
                            id: event.candidate.sdpMid,
                            candidate: event.candidate.candidate,
                            room: roomName,
                        });
                    }
                };
                rtcPeerConnection.ontrack = (event) => {
                    remoteStream = event.streams[0];
                    remoteVideoRef.current.srcObject = remoteStream;
                };
                localStream.getTracks().forEach((track) => {
                    rtcPeerConnection.addTrack(track, localStream);
                });
                rtcPeerConnection
                    .createOffer()
                    .then((offer) => {
                        return rtcPeerConnection.setLocalDescription(offer);
                    })
                    .then(() => {
                        socket.emit("offer", {
                            type: "offer",
                            sdp: rtcPeerConnection.localDescription,
                            room: roomName,
                        });
                    });
            }
        });

        return () => socket.disconnect();
    }, []);

    return (
        <div>
            <h1 style={{ textAlign: "center", margin: "15px 10px 30px 10px" }}>VIDEO CALL</h1>
            <div id="roomConfig" ref={roomConfigRef} className="d-flex justify-content-center mb-3">
                <div className="input-group input-group-lg" style={{ maxWidth: "400px" }}>
                    <input
                        id="roomName"
                        ref={roomNameRef}
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter room"
                    />
                    <button id="btnConnect" ref={btnConnectRef} className="btn btn-primary btn-lg">
                        Connect
                    </button>
                </div>
            </div>

            <div id="roomDiv" ref={roomDivRef} className="d-none d-flex flex-column align-items-center mt-3">
                <h4 style={{ paddingBottom: "10px" }}>RemoteVideo</h4>
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
                    <button id="toggleVideo" ref={btnToggleVideoRef} className="btn-circle enabled-style">
                        <i className="bi bi-camera-video-fill"></i>
                    </button>
                    <button id="toggleAudio" ref={btnToggleAudioRef} className="btn-circle enabled-style">
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
