import { UserAuthentication } from "@/context/AuthContext";
import { db } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";

export default function SendMessage() {
    const [value, setValue] = useState('')
    const [audioURL, setAudioURL] = useState('');

    // @ts-ignore
    const { currentUser } = UserAuthentication();

    function removeAfterSymbol(str: string, key: string) {
        const index = str.indexOf(key); // Find the index of "$$"
        if (index !== -1) { // If "$$" is found in the string
            return str.substring(0, index); // Return the substring before "$$"
        } else {
            return str; // Return the original string if "$$" is not found
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

    const handleVoiceInput = async () => {

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
                    className="input w-full focus:outline-none rounded-none bg-gray-500">

                </input>
                <button
                    type="submit"
                    className="btn w-auto rounded-none px-5 rounded-r-lg btn-accent">Send
                </button>
            </form>
        </div>
    );
}