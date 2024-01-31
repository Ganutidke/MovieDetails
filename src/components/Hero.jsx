
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast";
// import process from 'process'
import { Routes, Route, Link } from 'react-router-dom';
import CardModel from "./CardModel";
import posterNA from '../../public/assets/poster-holder.jpg'

const Hero = () => {

    const [results, setResults] = useState([])
    const [spinn, setSpinn] = useState(false)


    const BASE_URL = "https://www.omdbapi.com";
    const IMAGE_URL = "http://img.omdbapi.com/?apikey=ac3a2822&"

    const resultsContainerRef = useRef(null);


    const onSubmitHandle = async (e) => {
        e.preventDefault();
        let inputValue = document.getElementById("default-search").value;
        let searchValue = inputValue.replace(' ', '+')
        setSpinn(true)
        console.log(searchValue)
        toast.success('Successfully toasted!', "bottom-center")
        try {
            const response = await fetch(`${BASE_URL}/?s=${searchValue}&apikey=ac3a2822&`, {
                method: "GET",
            });


            if (!response.ok) {
                throw new Error(`Failed to fetch data from API: ${response.statusText}`);
            }

            const data = await response.json();
            // console.log(data.Search[1])
            setResults(data.Search);
            console.log(results)
            setSpinn(false)
        } catch (err) {
            console.error(err);
        }
    };


    useEffect(() => {
        // Scroll to the top of the container when results are updated
        if (resultsContainerRef.current) {
            resultsContainerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [results]);

    return (
        <section className={` bg-gradient-to-r from-cyan-500 to-blue-500 w-full min-h-full `}>
            <div className="min-h-full">
                <div className="max-w-7xl flex-col gap-7 mx-auto  min-h-screen flex justify-center items-center" >

                    <div className='flex mt-40 flex-col text-center text-gray-300 gap-4 font-medium text-xl'>
                        <span className='font-semibold text-4xl text-white'> Welcome To Movie Details</span>
                        Millions of movies, TV shows and people to discover. Search Now.
                    </div>
                    <form className="lg:w-[755px] w-full px-4 mx-auto">
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only ">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Search Movies, Shows , Searies..." required />
                            <button onClick={onSubmitHandle} className={`text-white  bg-blue-700 absolute end-2.5 bottom-2.5  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 `}>{!spinn ? "Search" : <div className="text-center">
                                <div role="status">
                                    <svg aria-hidden="true" className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>}
                            </button>
                        </div>
                    </form>


                    {
                        !results && (
                            <div className="text-center">
                                <div role="status">
                                    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        )
                    }
                    <div ref={resultsContainerRef}>

                        <div className='lg:max-w-7xl w-full mx-4 pt-10 my-10 lg:m-0 lg:mx-auto' >

                            <div className="p-4 md:p-5  ">
                                {
                                    results ? (
                                        <>
                                            <Routes >
                                                <Route path="search/:imdbID" element={<CardModel />} />
                                            </Routes>
                                            {/* <h1 className="mt-16 font-bold text-2xl text-white tracking-wide text-center">Results</h1> */}
                                            <div className="grid my-8 lg:grid-cols-3 mt-10 md:grid-cols-2 grid-cols-1 gap-5">
                                                {results.map((movie, index) => (
                                                    <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
                                                        <Link to={`search/${movie.imdbID}`} onClick={() => resultsContainerRef.current.scrollIntoView({ behavior: 'smooth' })}>
                                                            <img className="rounded-t-lg w-full h-96" src={movie.Poster == 'N/A' ? posterNA : movie.Poster} alt={movie.Poster} />
                                                        </Link>
                                                        <div className="p-5">
                                                            <Link to={`search/${movie.imdbID}`} onClick={() => resultsContainerRef.current.scrollIntoView({ behavior: 'smooth' })}>
                                                                <h5 className=" text-2xl font-bold tracking-tight text-gray-900 ">{movie.Title}</h5>
                                                                <p className='mb-2 text-sm text-gray-500 capitalize'>{movie.Type}</p>
                                                            </Link>
                                                            <p className="mb-3 font-normal text-gray-700 capitalize">{movie.Plot}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>



                                        </>
                                    ) : (


                                        <>

                                        </>
                                        // <div className="text-center">
                                        //     <div role="status">
                                        //         <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        //             <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        //             <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        //         </svg>
                                        //         <span className="sr-only">Loading...</span>
                                        //     </div>
                                        // </div>

                                    )
                                }


                            </div>


                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Hero