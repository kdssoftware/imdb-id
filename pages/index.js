import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from "axios";
import { useEffect, useState } from 'react';

export default function Home() {
  const [searchValue,setSearchValue] = useState('')
  const [found,setFound] = useState([])
  const [showAlert,setShowAlert] = useState(false)
  const search = (e) => {
    e.preventDefault()
    axios.get(`/api/search?search=${searchValue}`)
    .then(res => {
      setFound(Array.from(res.data.Search));
    })
    .catch(err => {
      console.log(err)
    })
  }


  const copy = (copyThis) => { 
    const el = document.createElement('textarea');
    el.value = copyThis;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setShowAlert(true)
    setTimeout(() => {
      setShowAlert(false)
    } , 2000)
  }

  useEffect(()=>{
    console.log(showAlert)
  },[showAlert])

  const changeSearchValue = (e) => {
    setSearchValue(e.target.value)
  }

  return (
    <div>
      <div className='relative m-5 px-6 pt-10 pb-8 bg-white shadow-xl ring-1 ring-gray-900/5 sm:max-w-lg sm:mx-auto sm:rounded-lg sm:px-10'>
        <h1 className='trailing-tight text-3xl font-semibold pb-1 mb-5 border-x-slate-50 border-y-4 flex justify-center'>FIND IMDB ID</h1>
        <form onSubmit={search} className=''>
          <div className="relative z-0 mb-6 w-full group">
            <input type="text" id="search" value={searchValue} onChange={changeSearchValue} placeholder='' name="floating_email" className="block py-2.5 px-0 w-full text- text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
            <label htmlFor="search" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Search a movie</label>
          </div>
        </form>
      </div>
      <div className='flex flex-wrap'>
        {
          found.map(item => (
            <div key={item.imdbID} className='w-1/2 sm:w-1/3'>
              <div onClick={()=>{copy(item.imdbID)}} className={"cursor-pointer relative m-5 flex md:flex-row md:max-w-xl items-center flex-col bg-white rounded-lg border shadow-md  hover:bg-gray-100 transition ease-in-out hover:scale-105"}  >
                {
                  item.Poster!=='N/A' ?
                   ( <Image className='object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg' src={item.Poster} alt={item.Title} width={100} height={150} /> )
                    :
                    ( <div className='w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg'></div> )
                }
                <div className="flex w-full flex-col justify-between p-4 leading-normal">
                  <h5 className="mb-2 text-1xl   text-gray-800">{item.Title}</h5>
                  <div className='flex justify-center flex-row w-full mx-1' >
                    <p className="flex flex-col  w-full text-2xl font-bold mb-3 tracking-tight font-normal text-gray-900 ">{item.imdbID}</p>
                  </div>
                  <div className="absolute right-3 bottom-4 w-6 ">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M320 64h-49.61C262.1 27.48 230.7 0 192 0S121 27.48 113.6 64H64C28.65 64 0 92.66 0 128v320c0 35.34 28.65 64 64 64h256c35.35 0 64-28.66 64-64V128C384 92.66 355.3 64 320 64zM192 48c13.23 0 24 10.77 24 24S205.2 96 192 96S168 85.23 168 72S178.8 48 192 48zM336 448c0 8.82-7.178 16-16 16H64c-8.822 0-16-7.18-16-16V128c0-8.82 7.178-16 16-16h18.26C80.93 117.1 80 122.4 80 128v16C80 152.8 87.16 160 96 160h192c8.836 0 16-7.164 16-16V128c0-5.559-.9316-10.86-2.264-16H320c8.822 0 16 7.18 16 16V448z"/></svg>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <div className={"absolute w-full duration-600 transition-opacity ease-in-out bottom-2 flex justify-center"+(showAlert?" opacity-90 ":" opacity-0 ")} >
        <div class="p-5 rounded-lg border border-gray-400 bg-slate-200 text-gray-900 flex w-1/2 justify-center">
            <span class="mr-2">
            <svg width={15} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M320 64h-49.61C262.1 27.48 230.7 0 192 0S121 27.48 113.6 64H64C28.65 64 0 92.66 0 128v320c0 35.34 28.65 64 64 64h256c35.35 0 64-28.66 64-64V128C384 92.66 355.3 64 320 64zM192 48c13.23 0 24 10.77 24 24S205.2 96 192 96S168 85.23 168 72S178.8 48 192 48zM336 448c0 8.82-7.178 16-16 16H64c-8.822 0-16-7.18-16-16V128c0-8.82 7.178-16 16-16h18.26C80.93 117.1 80 122.4 80 128v16C80 152.8 87.16 160 96 160h192c8.836 0 16-7.164 16-16V128c0-5.559-.9316-10.86-2.264-16H320c8.822 0 16 7.18 16 16V448z"/></svg>
            </span>
            Copied to clipboard!
        </div>
      </div>
    </div>
  )
}
