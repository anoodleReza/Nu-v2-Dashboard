import { UserAuthentication } from "@/context/AuthContext";
import { db } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import axios from "axios";


export default function SendMessage() {
    const [value, setValue] = useState('')
    const [audioURL, setAudioURL] = useState('');

    const { currentUser } = UserAuthentication();

    function removeAfterSymbol(str: string, key: string) {
        const index = str.indexOf(key); // Find the index of "$$"
        if (index !== -1) { // If "$$" is found in the string
            return str.substring(0, index); // Return the substring before "$$"
        } else {
            return str; // Return the original string if "$$" is not found
        }
    }

    //TTS SUPPORT
    const handleTTSMessage = async (mes: string) => {
        //SEND MESSAGE TO TTS SYSTEM
        try {
            //GET API KEY
            const res = await fetch('http://localhost:8000/tts').then(response => response.json());

            //OBTAIN VOICE DATA FROM ELEVENLABS
            const VOICE_ID = '21m00Tcm4TlvDq8ikWAM';
            const _url = 'https://api.elevenlabs.io/v1/text-to-speech/' + VOICE_ID;
            const options: any = {
                method: 'POST',
                url: _url,
                headers: {
                    accept: 'audio/mpeg',
                    'content-type': 'application/json',
                    'xi-api-key': res.message,
                },
                data: {
                    text: mes,
                },
                responseType: 'arraybuffer',
            };

            // RECEIVE THE REQUEST FROM THE SERVER
            const speechDetails = await axios.request(options);

            // PLAY TTS
            const blob = new Blob([speechDetails.data], { type: 'audio/mpeg' });

            // SEND TO DISCORD BOT
            //
            const formData = new FormData();
            formData.append('audioBlob', blob, 'audio.wav');

            fetch('http://localhost:8000/tts-audio', {
                method: 'POST',
                body: formData
                }).then(response => {
                console.log('Audio uploaded successfully');
                }).catch(error => {
                console.error('Error uploading audio:', error);
                });
            //

            // BLOB URL
            const url = URL.createObjectURL(blob);
            setAudioURL(url);

            //PLAY AUDIO
            const audioElement = new Audio();
            audioElement.src = url;
            audioElement.play().then(() => {
                //console.log(url);
                URL.revokeObjectURL(url)
            });
        } catch (error) {
            console.error('SendMessage - TTS Error: ', error);
        }
    }

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

            //REMOVE \n FROM STRING
            content = content.replace(/\n/g, '');
            const cleaned = removeAfterSymbol(removeAfterSymbol(content, 'My current emotions are'), '$$')

            //SEND TTS REQUEST
            handleTTSMessage(cleaned);

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
                className="containerWrap flex px-2">
                <input
                    type="text"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    className="input w-full focus:outline-none rounded-none bg-gray-500 rounded-l-lg">

                </input>
                <button
                    type="submit"
                    className="btn w-auto rounded-none px-5 rounded-r-lg btn-accent">Send
                </button>
            </form>
            {/* <button
                onClick={() => handleTTSMessage('hello')}
                className="btn w-auto rounded-none px-5 rounded-r-lg btn-accent">Debug: TTS
            </button> */}
            {/* <button
                onClick={async() => await fetch('http://localhost:8000/dev')}
                className="btn w-auto rounded-none px-5 rounded-r-lg btn-accent">Debug: Discord TTS
            </button> */}
        </div>
    );
}