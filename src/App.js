
import React from 'react';
// import Pageuno from './components/landing';
 import Typewriter from 'typewriter-effect';
 import Carousel from "./components/carousel";
 import deb1 from "./components/debbie/12.jpg";
 import deb4 from "./components/debbie/4.jpg";
 import deb5 from "./components/debbie/5.jpg";
 import deb6 from "./components/debbie/6.jpg";
 import deb7 from "./components/debbie/7.jpg";
 import deb8 from "./components/debbie/8.jpg";



function App() {
  return (
  <div className='bg-pink-200 w-screen h-screen flex-col '>
    <div className='absolute pl-2 text-2xl font-mono font-bold text-purple-950 flex-col h-screen w-screen bg-pink-200 ' >  
//       
 <Typewriter options={{strings: ['To many more trips around the sun!! ' , 'Happy Birthday debs '], autoStart: true, loop: true, }}/> 
//   
<div className='flex-col justify-center mt-10 mx-1 bg-pink-200 '>

I really don’t understand what you meant by distance and space. If it means you don’t want to talk anymore, I get it — it makes sense that I shouldn’t text you. If not, I’m just unsure what space means, but I wanted to wish you a happy birthday anyway.

Happy Birthday, Poof.

<div> </div>
- Dummy

</div>
<div className=' xl:flex xl:mt-5 xl:mx-1 xl:h-100 xl:w-200    md:mt-1 md:grid md:grid-cols-3 md:gap-1  md:place-content-center md:h-40 ...'>
<img src={deb1} alt = "bg"/>
<img src={deb4} alt = "bg"/>
<img src={deb5} alt = "bg"/>
<img src={deb6} alt = "bg"/>
<img src={deb7} alt = "bg"/>
<img src={deb8} alt = "bg"/>
</div>
 </div>

    {/* <div className='text-2xl font-bold  text-purple-950 flex-col w-screen'>
    jdilnvd
    </div> */}
 {/* <Pageuno/>  */}

  </div>
   

  );
}

export default App;
