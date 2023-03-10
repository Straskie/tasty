import React from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import SearchBar from '../../Components/SearchBar/SearchBar';
import Carousel from '../../Components/Carousel/Carousel';
import { useState, useEffect } from 'react';
import { fetchAreas, fetchCategories } from '../../Services/Services';
import './MainPage.css';
import MealOfTheDay from '../../Components/MealOfTheDay/MealOfTheDay';
import WideCard from '../../Components/WideCard/WideCard';

const Main = () => {
    const [categories, setCategories] = useState();
    const [areas, setAreas] = useState();
    const [searchResults, setSearchResults] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const areas = await fetchAreas();
            setAreas(areas);
            const categories = await fetchCategories();
            setCategories(categories);
        }
        fetchData();
    }, []);

    return (
        <div className="main-page">
            <main>
                <SearchBar
                    setSearchResults={setSearchResults}
                    className="search-input"
                />
                {searchResults && (
                    <section className="search-results">
                        {/* Wenn der searchResults-Wert nicht null ist, werden die Karten 
            mit den Suchergebnissen gezeigt. */}
                        {searchResults &&
                            searchResults.map((meal) => (
                                <WideCard key={meal.idMeal} meal={meal} />
                            ))}
                    </section>
                )}
                {!searchResults && (
                    <>
                        <section className="main-meal">
                            <h3>Meal of the Day</h3>
                            <MealOfTheDay />
                        </section>
                        <section className="areas-section">
                            <div className="title">
                                <h3>Areas</h3>
                                {/* <p className="seeAll">See All</p> */}
                            </div>
                            <Carousel data={areas} button={true} type1={true} />
                        </section>
                        <section className="areas-section">
                            <div className="title">
                                <h3>Categories</h3>
                                {/* <p className="seeAll">See All</p> */}
                            </div>
                            <Carousel data={categories} card={true} />
                        </section>
                    </>
                )}
            </main>
            <NavBar />
        </div>
    );
};

export default Main;
