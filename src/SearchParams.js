import React, {useState, useEffect, useContext } from 'react';
import pet,{ANIMALS} from '@frontendmasters/pet'
import useDropdown from "./useDropdown";
import Results from './results';
import ThemeContext from "./ThemeContext";

const SearchParams = () => {
    const [loc, setLoc] = useState("Seattle, WA");
    const [breeds, setBreeds] = useState([]);
    const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
    const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
    const [pets, setPets] = useState([]);
    const [theme, setTheme] = useContext(ThemeContext);

    console.log(theme);

    async function requestPets() {
        const {animals} = await pet.animals({
            loc,
            breed,
            type: animal
        })
        setPets(animals || []);
    }

    useEffect(() => {
        setBreeds([]);
        setBreed("");
        pet.breeds(animal).then(({breeds}) => {
            const breedStr = breeds.map(({name}) => name);
            setBreeds(breedStr);
        }, console.error)
        }, [animal, setBreed, setBreeds]
    )
    return(

        <div className={"search-params"}>
            <h1>{loc}</h1>
            <form onSubmit={(e) => {
            e.preventDefault();
            requestPets();
            }
            }>
                <label htmlFor="location">
                    Location
                    <input id={"location"} value={loc} placeholder={"Location"} onChange ={e => setLoc(e.target.value)}/>

                </label>
                <AnimalDropdown/>
                <BreedDropdown />
                <label htmlFor={"theme"}>
                    Theme
                </label>
                    <select
                        value={theme}
                        onChange={e => setTheme(e.target.value)}
                        onBlur={e => setTheme(e.target.value)}
                        >
                        <option value={"peru"}>Peru</option>
                        <option value={"darkblue"}>Dark Blue</option>
                        <option value={"mediumorchid"}>Medium Orchid</option>
                        <option value={"chartreuse"}>Chartreuse</option>
                    </select>

                <button style={{ backgroundColor: theme}}>Submit</button>
            </form>
            <Results pets = {pets} />
        </div>
    );
};

export default SearchParams;
