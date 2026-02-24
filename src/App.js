import React from 'react';
import Typewriter from 'typewriter-effect';
import TorusBackground from './components/TorusBackground';
import deb1 from "./components/debbie/12.jpg";
import deb4 from "./components/debbie/4.jpg";
import deb5 from "./components/debbie/5.jpg";
import deb6 from "./components/debbie/6.jpg";
import deb7 from "./components/debbie/7.jpg";
import deb8 from "./components/debbie/8.jpg";

function App() {
  return (
    <div className='bg-white w-screen h-screen flex-col relative'>
      <TorusBackground />
      <div className='relative z-10 pl-2 text-2xl font-mono font-bold text-purple-950 flex-col h-screen w-screen'>
        <Typewriter 
          options={{
            strings: ['To many more trips around the sun!!', 'Happy Birthday in Advance Poofy Hair'],
            autoStart: true,
            loop: true,
          }}
        />
        <div className='flex-col justify-center mt-10 mx-1'>
          Really don't understand what you meant by distance and space. so if it's not talking to you anymore then makes sense that I don't text you if not I just don't know what space means but just wanted to let you know, you've made me a better person than I was. Happy Birthday Poof.
          <div></div>
          - Dummy
        </div>
        <div className='xl:flex xl:mt-5 xl:mx-1 xl:h-100 xl:w-200 md:mt-1 md:grid md:grid-cols-3 md:gap-1 md:place-content-center md:h-40'>
          <img src={deb1} alt="bg" />
          <img src={deb4} alt="bg" />
          <img src={deb5} alt="bg" />
          <img src={deb6} alt="bg" />
          <img src={deb7} alt="bg" />
          <img src={deb8} alt="bg" />
        </div>
      </div>
    </div>
  );
}

export default App;
