import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../../Components/NavBar/NavBar';
import SearchBar from '../../Components/SearchBar/SearchBar';
import './AreasPage.css';
import axios from 'axios';
import SmallCard from '../../Components/SmallCard/SmallCard';
import Carousel from '../../Components/Carousel/Carousel';
import { fetchMealSorts } from '../../Services/Services';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import WideCard from '../../Components/WideCard/WideCard';
import SmallButton from '../../Components/SmallButton/SmallButton';

const AreasPage = () => {
    const [selectedArea, setSelectedArea] = useState();
    const [mealSort, setMealSort] = useState();
    const [searchResults, setSearchResults] = useState(null);

    const params = useParams();

    const fetchSelectedArea = async () => {
        const { data } = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/filter.php?a=${params.id}`
        );
        return data.meals;
    };

    useEffect(() => {
        async function fetchData() {
            const sorts = await fetchMealSorts();
            setMealSort(sorts);

            const area = await fetchSelectedArea();
            setSelectedArea(area);
        }
        fetchData();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="category-page">
            <header>
                <div className="header-container">
                    <Link className="back-arrow-link" to={'/main'}>
                        <HiArrowNarrowLeft className="back_arrow" />
                    </Link>
                    <h2>Areas</h2>
                </div>
            </header>
            <SearchBar setSearchResults={setSearchResults} />
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
            {selectedArea && !searchResults && (
                <section className="areas-section">
                    <div className="title sm-btn">
                        <h3>Categories</h3>
                        {/* <p className="seeAll">See All</p> */}
                        <SmallButton />
                    </div>
                    <Carousel data={mealSort} button={true} type2={true} />
                </section>
            )}
            {selectedArea && !searchResults && (
                <section className="results-section">
                    {selectedArea?.map((meal, index) => (
                        <SmallCard meal={meal} key={index} />
                    ))}
                </section>
            )}
            <NavBar />
        </div>
    );
};

export default AreasPage;
