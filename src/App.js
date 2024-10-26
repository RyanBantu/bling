
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
 <Typewriter options={{strings: ['To many more trips around the sun!! ' , 'Happy Birthday in Advance Poofy Hair '], autoStart: true, loop: true, }}/> 
//   
<div className='flex-col justify-center mt-10 mx-1'>

 being friends with you was not so hard,
I didn't have to change myself or be someone else around you.Thank you for reminding me to love myself and most importantly to love and trust god over my fears.For all the times you've tolerated me and my crap, sometimes I believe that more than the clinics it was me who drained your energy out..... XD XD!
I pray and wish that you'll succeed and be a testimony and encouragement to many people.I'm leaving Manipal soon and out of all the 4 years,finding a friend like you was one of the best things that ever happened to me.Imma come back, this time in a 330LI FOHSHO. Till then this keyboard is custom built by me and all parts underneath the keys were tuned to make it sound like the 13:44 vid you sent me. Have fun doing your assignments now TOPPER....

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
