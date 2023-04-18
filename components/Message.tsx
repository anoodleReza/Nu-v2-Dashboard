import { Timestamp } from "firebase/firestore";
import { useEffect } from "react";

interface IChatMessage {
    name: string;
    createdAt: Timestamp;
    text: string;
    uid: string;
}

export default function ChatMessage({ message }: { message: IChatMessage }) {
    //TEXT CLEANING
    function removeAfterSymbol(str: string, key: string) {
        const index = str.indexOf(key); // Find the index of "$$"
        if (index !== -1) { // If "$$" is found in the string
            return str.substring(0, index); // Return the substring before "$$"
        } else {
            return str; // Return the original string if "$$" is not found
        }
    }

    return (
        <div className="chat chat-start">
            <div className="chat-header">
                {message.name}
            </div>
            <div className="chat-bubble">{removeAfterSymbol(removeAfterSymbol(message.text, 'My current emotions are'), '$$')}</div>
        </div>
    );
}