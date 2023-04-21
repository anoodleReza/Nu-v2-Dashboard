import AuthCheck from "@/components/AuthCheck";
import Image from "next/image";
const settings = require('../settings.json')

export default function Config() {
  console.log(settings.ttsmode);
  
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
            <h2 className="card-title">Other Settings</h2>
            <div className="card-actions">
              <div className="btn-group btn-group-vertical lg:btn-group-horizontal">
                <button className="btn btn-active">Button</button>
                <button className="btn">Button</button>
                <button className="btn">Button</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}