import { useEffect, useRef, useState } from "react";
import ChatMessage from "./Message";
import { collection, query, where, onSnapshot, orderBy, limit, limitToLast } from "firebase/firestore";
import { db } from "@/firebase";

export default function Chatbox() {
    const messagesEndRef = useRef();
    const [messages, setMessages] = useState([]);

    const scrollToBottom = () => {
        // @ts-ignore
        messagesEndRef.current.scrollIntoView({behavior: "smooth"})
    }

    useEffect(scrollToBottom, [messages])

    useEffect(() => {
        const q = query(
            collection(db, "messages"),
            orderBy("createdAt"),
            limitToLast(50)
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const message = [];
            querySnapshot.forEach((doc) => {
                message.push({ ...doc.data(), key: doc.id });
            });
            setMessages(message)
        });
        return () => unsubscribe;
    }, []);

    return (
        <div className="h-full containerWrap pb-40 pt-5">
            {messages.map(message => (
                <ChatMessage key={message.key} message={message} />
            ))}
            <div ref={messagesEndRef}></div>
        </div>
    );
}