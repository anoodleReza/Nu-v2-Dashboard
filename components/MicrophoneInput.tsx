import { UserAuthentication } from "@/context/AuthContext";
import { db } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState, useRef } from "react";

export default function MicrophoneInput() {
    const [value, setValue] = useState('')
    const [audioURL, setAudioURL] = useState('');

    // @ts-ignore
    const { currentUser } = UserAuthentication();

    //microphone input
    const mediaRecorderRef = useRef(null);
    const [audioData, setAudioData] = useState(null);

    const handleVoiceInput = async () => {
        if (!window.MediaRecorder) {
            alert('MediaRecorder not supported in your browser');
            return;
        }

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        // @ts-ignore
        mediaRecorderRef.current = new MediaRecorder(stream);
        // @ts-ignore
        mediaRecorderRef.current.ondataavailable = (e) => {
            setAudioData(e.data);
        };
        // @ts-ignore
        mediaRecorderRef.current.start();
    };
    const handleVoiceStop = () => {
        if (mediaRecorderRef.current) {
            // @ts-ignore
            mediaRecorderRef.current.stop();
        }
    };

    //SEND TO AI ENGINE
    const handleSendMessage = async (e: any) => {
        //FORMAT MESSAGE -> remove spaces
        e.preventDefault();
        if (value.trim() === "") {
            return;
        }

        //SET TEMP VAR TO VALUE AND RESET VALUE OF MESSAGEBOX -> increase responsiveness
        const tempValue = value;
        setValue("");

        //ADD MESSAGE TO FIRESTORE
        try {
            const { uid, displayName } = currentUser;
            await addDoc(collection(db, "messages"), {
                text: tempValue,
                name: displayName,
                uid: uid,
                createdAt: serverTimestamp()
            })
        } catch (error) {
            console.log(error);
        }
        //SEND MESSAGE TO AI SYSTEM
        try {
            console.log('sending: ', tempValue);

            const response = await fetch('http://localhost:8000/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: tempValue })
            });
            //GET RESPONSE FROM SERVER
            const aiResponse = await response.json();
            var content = await aiResponse.message;

            //SEND RESPONSE TO FIREBASE
            await addDoc(collection(db, "messages"), {
                text: content,
                name: 'Nu-chan',
                uid: 'AI',
                createdAt: serverTimestamp()
            })
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="bg-base-100 fixed bottom-0 w-full py-10 shadow-lg">
            {/* USER INPUT FORM */}

            <form
                onSubmit={handleSendMessage}
                className="containerWrap flex px-2 justify-center">
                <button
                    onMouseDown={handleVoiceInput}
                    onMouseUp={handleVoiceStop}
                    className="btn w-auto rounded-lg px-5 btn-accent">
                    Record
                </button>
            </form>
        </div>
    );
}