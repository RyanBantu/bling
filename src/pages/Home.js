import React from 'react';
import Typewriter from 'typewriter-effect';

const Home = () => {
  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-4xl w-full bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 md:p-12">
        <div className="text-2xl md:text-3xl font-mono font-bold text-purple-950 mb-6 text-center">
          <Typewriter
            options={{
              strings: ['To many more trips around the sun!!', 'Happy Birthday in Advance Poofy Hair'],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
        <div className="text-base md:text-lg text-purple-900 leading-relaxed text-center">
          Really don't understand what you meant by distance and space. so if it's not talking to you anymore then makes sense that I don't text you if not I just don't know what space means but just wanted to let you know, you've made me a better person than I was. Happy Birthday Poof.
        </div>
        <div className="text-right mt-6 text-purple-800 font-medium">
          - Dummy
        </div>
      </div>
    </div>
  );
};

export default Home;
