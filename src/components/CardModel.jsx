import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';



const CardModel = () => {
    const { imdbID } = useParams();
    const [result, setResult] = useState([])
    const BASE_URL = "https://www.omdbapi.com";
    // console.log(imdbID)
    const [ratings, setRatings] = useState([])
    useEffect(() => {

        const getDetails = async () => {
            try {
                const response = await fetch(`${BASE_URL}/?i=${imdbID}&apikey=ac3a2822`, {
                    method: 'GET'
                })
                if (!response.ok) {
                    throw new Error(`Failed to fetch data from API: ${response.statusText}`);
                }
                const data = await response.json();
                console.log(data.Ratings)
                console.log(ratings)
                setResult(data)
                setRatings(data.Ratings)
                console.log(ratings)
            } catch (error) {
                console.log(error)
            }
        }
        getDetails();

    }, [imdbID])




    return (
        <>
            <section className="text-gray-700 body-font overflow-hidden bg-white">
                <div className="container px-5 py-24 mx-auto">
                    {
                        result && (
                            <div className="lg:w-4/5 mx-auto flex flex-wrap">
                                <img alt={result.Title} className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src={`${result.Poster}`} />
                                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                    <h2 className="text-sm title-font text-gray-500 tracking-widest capitalize">{result.Type}</h2>
                                    <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{result.Title}</h1>
                                    <div className="flex mb-4">
                                        <span className="flex flex-col gap-1 ">
                                            {
                                                ratings.map((rating, index) => (

                                                    <div key={index} className="text-gray-600 ml-3">{rating.Source} {rating.Value}</div>
                                                ))
                                            }
                                        </span>

                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <p className="leading-relaxed">{result.Plot}</p>
                                        <p className="leading-relaxed"><span>Country : </span> {result.Country}</p>
                                        <p className="leading-relaxed"><span>Languages : </span> {result.Language}</p>
                                        <p className="leading-relaxed"><span>Awards : </span> {result.Awards}</p>
                                    </div>
                                    <p></p>
                                    <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                                        <div className="flex">
                                            <span className="mr-3">IMDB Rating : {result.imdbRating}</span>
                                        </div>
                                        <div className="flex ml-6 items-center">
                                            <span className="mr-3">IMDB Voting : {result.imdbVotes}</span>

                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <p>Box Office Collection </p>
                                        <span className="title-font font-medium text-2xl text-gray-900">{result.BoxOffice}</span>
                                    </div>
                                    <div className="actorList">
                                        <p>Actors : {result.Actors}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }


                </div>
            </section>
        </>
    )
}

export default CardModel