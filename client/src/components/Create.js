import { useEffect, useRef, useState } from "react";


function Create(){
    const [data,setData] = useState({
        name: "",
        description: "",
        release_date: "",
        rating: "",
        platforms: "",
        genres: "",
        background_image: ""
    })
    const [genres,setGenres] = useState([]);
    const [result, setResult] = useState("Hello there!");
    const divErr = useRef();
    const divCov = useRef();
    useEffect(() => {
        fetch('http://localhost:3001/genres/')
        .then(res => res.json())
            .then(response => setGenres(response))
            .catch(err => console.log(err));
        },[])
        function hideButton(){
            divErr.current.id="hidden";
            divCov.current.id="hidden";
        }
        function handleChange(e){
            if(e.target.name === "genres"){
                e.target.value = `,${e.target.value}`;
                if(data.genres.includes(e.target.value)){
                    setData({
                        ...data,
                        genres: data.genres.replace(e.target.value, "")
                    })
                } else {
                    setData({
                    ...data,
                    genres: data.genres +e.target.value
                })
            }
        } else {
            setData({
                ...data,
                [e.target.name]: e.target.value
            });
        }
    }
    async function handleSubmit(e){
        e.preventDefault();
        if(!data.name){
            setResult("You must write a name")
        } else if(!data.description){
            setResult("You must write a description")
        } else if(!data.rating){
            setResult("You must add a rating")
        } else if(!data.platforms){
            setResult("You must write at least 1 platform")
        } else{
            fetch('http://localhost:3001/videogames/',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(data)
        }).then(() => {
            setResult("Game added correctly!")
            e.target.reset()
            setData({
                name: "",
                description: "",
                release_date: "",
                rating: "",
                platforms: "",
                genres: "",
                background_image: ""
            })
        })
        .catch(err => console.log(err));
        }
        divErr.current.id="";
        divCov.current.id="";
    }
    return (
        <div className="create">
            <h1>Create a videogame!</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='name'>*Name</label>
                <input value={data.name} name='name' type='text' onChange={handleChange}/>
                <label htmlFor='description'>*Description</label>
                <textarea value={data.description} name='description' maxLength="1500" onChange={handleChange}/>
                <label htmlFor='release_date'>Release Date</label>
                <input value={data.release_date} name='release_date' type='date' onChange={handleChange}/>
                <label htmlFor='rating'>*Rating (0.00-5.00)</label>
                <input value={data.rating} name='rating' type='number' step="0.01" min='0' max='5' onChange={handleChange}/>
                <label htmlFor='platforms'>*Platforms</label>
                <input value={data.platforms} name='platforms' type='text' placeholder='PC,Xbox..' onChange={handleChange}/>
                <p>Genres</p>
                <div className="genres">
                {genres?.map(genre => {
                    return (
                            <label key={genre.name}>
                            <input name='genres' value={genre.name} type='checkbox' onChange={handleChange}/>
                            <span>{genre.name}</span>
                            </label>
                    )
                })}
                </div>
                <label htmlFor='background_image'>ImageURL:</label>
                <input value={data.background_image} name='background_image' type='text' onChange={handleChange}/>
                <button type='submit'>Add Game!</button>
            </form>
            <div className="cover" ref ={divCov} id="hidden"></div>
            <div className="ferror" ref={divErr} id="hidden">
                {result[0] === "G" ? <h2 style={{color: "green"}}>✓</h2> : <h2 style={{color: "red"}}>X</h2>}
                <p>{result}</p>
                <button onClick={hideButton}>OK</button>
            </div>
        </div>
    )
}

export default Create;