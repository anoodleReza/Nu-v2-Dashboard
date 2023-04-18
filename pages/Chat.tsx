import AuthCheck from "@/components/AuthCheck";
import Chatbox from "@/components/Chatbox";
import SendMessage from "@/components/SendMessage";

const Chat = () => {
  return (
    <main className="pt-20 flex-1 min-h-screen">
      <AuthCheck />
      <Chatbox />
      <SendMessage />
    </main>
  );
};

export default Chat;