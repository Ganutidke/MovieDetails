
import { useState } from "react"
import toast from "react-hot-toast";
// import process from 'process'

const Hero = () => {

    const [results, setResults] = useState([])

    const BASE_URL = "https://www.omdbapi.com";
    const IMAGE_URL = "http://img.omdbapi.com/?apikey=ac3a2822&"
    // const apikey = process.env.API_KEY

    const onSubmitHandle = async (e) => {
        e.preventDefault();
        let inputValue = document.getElementById("default-search").value;

        toast.success('Successfully toasted!', "bottom-center")
        try {
            const response = await fetch(`${BASE_URL}/?s=${inputValue}&apikey=ac3a2822`, {
                method: "GET",
            });


            if (!response.ok) {
                throw new Error(`Failed to fetch data from API: ${response.statusText}`);
            }

            const data = await response.json();
            // console.log(data.Search[1])
            setResults(data.Search);
            // console.log(results)
        } catch (err) {
            console.error(err);
        }
    };







    return (
        <section className=' bg-hero-pattern w-full h-full bg-cover bg-no-repeat'>
            <div className="max-w-7xl flex-col gap-7 mx-auto h-screen  flex justify-center items-center">
                <div className='flex flex-col text-center gap-4 font-medium text-xl'>
                    <span className='font-semibold text-4xl'> Welcome To Movie Details</span>
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
                        <button onClick={onSubmitHandle} className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ">Search</button>
                    </div>
                </form>
            </div>
            <div className='lg:max-w-7xl w-full mx-4 my-10 lg:m-0 lg:mx-auto'>



                <div className="p-4 md:p-5 ">

                    <div className="grid my-8 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                        {   

                            
                            results.map((movie, index) => {

                                return (
                                    <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
                                        <a href="#">
                                            <img className="rounded-t-lg w-full h-96" src={movie.Poster} alt={movie.Title} />
                                        </a>
                                        <div className="p-5">
                                            <a href="#">
                                                <h5 className=" text-2xl font-bold tracking-tight text-gray-900 ">{movie.Title}</h5>
                                                <p className='mb-2 text-sm text-gray-500'>{movie.Type}</p>
                                            </a>
                                            <p className="mb-3 font-normal text-gray-700 ">{movie.Plot}</p>
                                            <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                                                Read more
                                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5h12m0 0L9 1m4 4L9 9" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                )
                            })
                        }




                    </div>



                </div>


            </div>
        </section>
    )
}

export default Hero