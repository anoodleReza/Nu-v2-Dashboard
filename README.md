# Nu-v2 Dashboard
Nu-v2 provides a webapp dashboard for my Nu-chan streaming assistant. The dashboard provides an interface that connects to the main server to provide functionalities such as chatting. Some of the functionalities are available only once connected to the Nu-v2 server.

### Main dashboard for the project for the user to interact with all planned features:
- Homepage contains navigation for nu-chan, chat, configuration, and stream
- Added an authentication system and login system linked to your google account
- Functional navigation bar with logout button

### Implementation of the chatbot utilizing ChatGPT 3.5 Turbo. 
- User can chat using the chatbox in the chat page
- Client sends a request to OpenAI to generate a response

### Implementation of Elevenlabs for Text-to-speech generation
- Once AI response is obtained, send the text to Elevenlabs API
- Obtain the audio data from Elevenlabs in the form of an arraybuffer
- Play the audio on the client

### Build a discord bot connected to the main functionalities of Nu-v2

- Setup discord bot
- Connect to a call on demand
- Play the audio in the channel
- Automatically disconnect the bot after a timeout

<img width="930" alt="image" src="https://github.com/anoodleReza/nu-v2/assets/38813206/e80d5706-df9b-4674-9a5f-06800e0f6c6d">
<img width="919" alt="image" src="https://github.com/anoodleReza/nu-v2/assets/38813206/d82396a4-47a7-44b8-a11a-4f592459e981">

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
