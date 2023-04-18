import { UserAuthentication } from "@/context/AuthContext";
import { auth } from "@/firebase";
import { useRouter } from 'next/router'

export default function Navbar() {
    const {currentUser, signinGoogle} = UserAuthentication();
        
    const router = useRouter()
    const handleClick = (e:any) => {
        console.log('Redirecting to Login');        
        e.preventDefault()
        router.push('/Login')
    }
    const handleLogout = async () => {
        console.log('Logging Out User');
        auth.signOut().then(() => router.push('/Login'));
      };

    return (
        <div className="navbar bg-base-100 flex justify-between fixed top-0 z-10 pt-5 pb-5">
            <div className="containerWrap">
                <div className="flex-1">
                    <a href="/" className="btn btn-ghost normal-case text-xl">Nu-chan Dashboard</a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li><a href="/Chat">Chat</a></li>
                        <li><a href="/Config">Config</a></li>
                        <li><a href="/Stream">Stream</a></li>
                        <li>
                        {currentUser != null
                            ? <button className="btn btn-accent" onDoubleClick={handleLogout}>Log Out</button>
                            : <button className="btn btn-accent" onClick={handleClick}>Log in</button>
                        }
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
  }