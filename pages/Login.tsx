import { UserAuthentication } from "@/context/AuthContext";

export default function Login() {
    const {currentUser, signinGoogle} = UserAuthentication();
    
    const handleLogin = async() => {
        try {
            await signinGoogle();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
            <div className="max-w-lg">
            <h1 className="text-5xl font-bold">Nu-Chan Dashboard</h1>
            <p className="py-6">Private dashboard for Nu-chan AI Assistant</p>
            {currentUser != null
                ? <p className="py-6 font-bold">Welcome, {currentUser.email}</p>
                : <button className="btn btn-primary" onClick={handleLogin}> Log in </button>
            }

            </div>
        </div>
        </div>
    );
  }