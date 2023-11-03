import TimeAPI from "./time/api";
import PexelsAPI from "./pexels/api";


function App() {

  return (
    <div id='app' className='flex flex-col
      w-full h-full
      portrait:flex-row portrait:min-h-[100%]
    '>
      <TimeAPI />
      <PexelsAPI />
    </div>
  )

}

export default App;