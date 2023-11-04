import { useEffect, useState } from 'react';

import PhotoCard from './photo';
import { Photo } from './_shared';


// #region : Constants ---------------------------------------------------------------------------------------

const LIMIT = 20;
const START = `https://api.pexels.com/v1/curated?page=1&per_page=${LIMIT}`;
const API_KEY = import.meta.env.VITE_PEXELS_KEY;

// #endregion ------------------------------------------------------------------------------------------------


export default function PexelsAPI() {
  /**
   * Component that handles all Pexels-relevant processes.
  */

  const [page, setPage] = useState<number>(1);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [next, setNext] = useState<string | null>(null);
  const [prev, setPrev] = useState<string | null>(null);


  // Paginates on Component-Mount & Updates
  useEffect(() => { paginate(START) }, [])


  function paginate(link: string | null) {
    /**
     * Processes pagination using the API's <prev_page> and <next_page>.
     * Fetches and sets the <page>, <photos>, <prev_page>, and <next_page> states.
     * @param {string | null} link Navigates to another page using the Page's <prev_page> or <next_page> properties.
    */

    if (link) {

      const options = {
        headers: {
          'Authorization': API_KEY
        }
      }

      fetch(link, options)
        .then(response => response.json())
        .then(json => {
          setPage(json.page);
          setPhotos(json.photos);
          setPrev(json.prev_page);
          setNext(json.next_page);
        })
        .catch(error => console.error(error));

    }

  }

  return (

    <div id='pexels-api' className='flex-grow flex flex-col'>

      <div id='pexels-header' className='flex flex-row h-[80px] px-[3%] bg-slate-800'>

        <button className='h-full align-middle' onClick={() => paginate(START)}>
          <p className='w-[150px] py-[2%] text-2xl text-black bg-white rounded-xl'> Pexels API </p>
        </button>

        <p className='ml-auto py-[30px] max-sm:invisible'> Page# {page} </p>

      </div>


      <div id='pexels-body' className='flex-grow flex flex-row h-full bg-white'>

        <div id='pexels-prev' className='relative flex w-[20%] h-inherit'>
          <button onClick={() => paginate(prev)}
            className={`w-full h-[20%] m-auto
            text-5xl rounded-r-full bg-slate-700
            ${(prev) ? '' : 'text-slate-700 disabled'}`}
          > ⇠
          </button>
        </div>

        <div id='pexels-grid' className='flex-grow grid gap-[15px] p-[3%]
          grid-cols-4 grid-rows-5 max-sm:grid-cols-3 max-sm:grid-rows-6
        '>

          {photos.map((photo, i) =>
            <PhotoCard id={i + 1} key={`card-${i + 1}`} photo={photo} />
          )}

        </div>

        <div id='pexels-next' className='flex w-[20%] h-inherit'>
          <button onClick={() => paginate(next)}
            className={`w-full h-[20%] m-auto
            text-5xl rounded-l-full bg-slate-700
            {(next) ? '' : 'text-slate-700 disabled'}
          `}>
            ⇢
          </button>
        </div>

      </div>


      <a id='pexels-footer' href='https://www.pexels.com'
        className='flex w-full h-[60px] justify-center items-center bg-slate-800'
      > Photos provided by Pexels </a>

    </div>

  )

}