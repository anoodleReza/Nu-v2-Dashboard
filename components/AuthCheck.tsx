import { UserAuthentication } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function AuthCheck() {
    const auth = getAuth();
    const user = auth.currentUser;

    const router = useRouter()
    useEffect(()=> {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
            } else {
                console.log('No user found');
                router.push('/Login')
            };
        });
    }, []);

    return (
        <div></div>
    );
}