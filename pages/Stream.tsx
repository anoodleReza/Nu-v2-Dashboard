import AuthCheck from "@/components/AuthCheck";
import Chatbox from "@/components/Chatbox";
import MicrophoneInput from "@/components/MicrophoneInput";

export default function Stream() {
    return (
      <div>
        <AuthCheck />
        <Chatbox />
        <MicrophoneInput />
      </div>
    );
  }