import { useEffect, useState } from 'react';

import PhotoCard from './photo';
import { Photo } from './_shared';



const LIMIT = 20;
const START = `https://api.pexels.com/v1/curated?page=1&per_page=${LIMIT}`;
const API_KEY = import.meta.env.VITE_PEXELS_KEY;


export default function PexelsAPI() {

  const [page, setPage] = useState<number>(1);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [next, setNext] = useState<string | null>(null);
  const [prev, setPrev] = useState<string | null>(null);


  useEffect(() => {
    paginate(START)
  }, [])


  function paginate(link: string | null) {

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

        <button className='h-full align-middle text-2xl' onClick={() => paginate(START)}>
          PexelAPI Photos
        </button>

        <p className='ml-auto py-[30px]'> Current Page: {page} </p>

      </div>


      <div id='pexels-body' className='flex-grow flex flex-row h-full bg-white'>

        <div id='pexels-prev' className='flex w-[20%] h-inherit'>
          <button onClick={() => paginate(prev)}
            className={`w-full h-[20%] m-auto
            rounded-r-full bg-slate-700
            ${(prev) ? '' : 'text-slate-700 disabled'}`}
          > ⇠
          </button>
        </div>

        <div id='pexels-grid' className='grid grid-cols-4 grid-rows-5 gap-[15px] p-[3%]'>

          {photos.map((photo, i) =>
            <PhotoCard id={i + 1} key={`card-${i + 1}`} photo={photo} />
          )}

        </div>

        <div id='pexels-next' className='flex w-[20%] h-inherit'>
          <button onClick={() => paginate(next)}
            className={`w-full h-[20%] m-auto
            rounded-l-full bg-slate-700
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