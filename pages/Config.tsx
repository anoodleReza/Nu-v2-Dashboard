import AuthCheck from "@/components/AuthCheck";
import Image from "next/image";
import { useState } from "react";
const settings = require('../settings.json')


export default function Config() {
  const [aikey, setAikey] = useState('');
  const [ttskey, setTtskey] = useState('');
  const [discordkey, setDiscordkey] = useState('');
  const handleSave = () => {
    // your existing logic here...
    if (aikey !== '') {
      console.log('aikey: ' + aikey);
      settings.aikey = aikey;
    }
    if (ttskey !== '') {
      console.log('ttskey: ' + ttskey);
      settings.ttskey = ttskey;
    }
    if (discordkey !== '') {
      console.log('discordkey: ' + discordkey);
      settings.discordkey = discordkey;
    }
    // save settings to file
    fetch('/api/saveSettings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    })
        .then(response => response.json())
        .then(data => console.log(data.message))
        .catch((error) => {
          console.error('Error:', error);
        });
  }

  return (
    <div>
      <AuthCheck />
      <h1>Config Page</h1>
      <div className="hero min-h-screen bg-base-200 flex justify-around">

        <div className="card w-96 bg-base-400 text-primary-content">
          <div className="card-body">
            <h2 className="card-title">AI Settings</h2>
            <div className="card-actions">
              <div className="btn-group btn-group-vertical lg:btn-group-horizontal">
                <button className="btn btn-active">Button</button>
                <button className="btn">Button</button>
                <button className="btn">Button</button>
              </div>
            </div>
          </div>
        </div>

        <div className="card w-96 bg-accent text-primary-content">
          <div className="card-body">
            <h2 className="card-title">TTS Settings</h2>
            <div className="card-actions">
              <div className="btn-group btn-group-vertical lg:btn-group-horizontal">
                <button className="btn w-30">Dashboard</button>
                <button className="btn min-w-30">Discord</button>
                <button className="btn min-w-30">Both</button>
              </div>
            </div>
          </div>
        </div>

        <div className="card w-96 bg-accent text-primary-content">
          <div className="card-body">
            <h2 className="card-title">API Keys</h2>
            <div className="card-actions">
            
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-primary-content">Gemini API</span>
              </div>
              <input type="password" 
                  placeholder="Type here" 
                  className="input input-bordered w-full max-w-xs" 
                  value={aikey}
                  onChange={e => setAikey(e.target.value)}/>
              <div className="label">
              </div>
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-primary-content">TTS API</span>
              </div>
              <input type="password" 
                placeholder="Type here" 
                className="input input-bordered w-full max-w-xs" 
                value={ttskey}
                onChange={e => setTtskey(e.target.value)}
              />
              <div className="label">
              </div>
            </label>
            
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-primary-content">Discord API</span>
              </div>
              <input type="password" 
                placeholder="Type here" 
                className="input input-bordered w-full max-w-xs" 
                value={discordkey}
                onChange={e => setDiscordkey(e.target.value)}/>
              <div className="label">
              </div>
            </label>
            {/* button to save and send keys that have been modified */}
            <button className="btn btn-primary" onClick={handleSave}>Save</button>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}