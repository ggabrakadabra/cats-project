import React from 'react';
import './App.scss';
import { getCatFacts, getCatImages } from './api/catApi';
import { zipWith, sortBy, isNil } from 'lodash';
import CatDetails, { CatDetailProps } from './components/CatDetails/CatDetails';
import uuid from 'uuid';
import { setUser, setFavorite, getUserFavorites } from './api/userApi';

export const userId = uuid();

export interface PictureData {
  id: string;
  url:string;
  sourceUrl: string;
};

export interface CatFacts {
  fact: string;
  picture: PictureData
}

export interface CatData {
  page: number;
  catFacts: CatFacts[];
  sortedCatFacts?: CatFacts[];
}

function App() {
  const [catData, setCatData] = React.useState<CatData>({
    page: 0,
    catFacts: []
  });

  const [showSortByLastWord, setShowSortByLastWord ] = React.useState(false);
  const [showUserFavorites, setShowUserFavorites] = React.useState(false);
  const [hasFavorites, setHasFavorites] = React.useState(false);
  const [userFavoriteCatFacts, setUserFavoriteCatFacts] = React.useState([]);

  const getCatData = React.useCallback(async () => {
    const facts = await getCatFacts();
    const pictures = await getCatImages();
    const catFactsArray = zipWith(facts.data, pictures, (fact: {fact: string}, picture: PictureData) => ({ fact: fact.fact, picture }));

    setCatData({
      page: 1,
      catFacts: catFactsArray
    })

    setUser(userId);
  }, []);
  
  React.useEffect(() => {
    getCatData();
  }, [getCatData]);
  
  const sortCatData = () => {
    const sortedCatFacts = sortBy(catData.catFacts, [(cat) => {
      const catFactArrayOfWords = cat.fact.toLocaleLowerCase().split(' ');
      const catFactLastWord = catFactArrayOfWords[catFactArrayOfWords.length - 1];
      return catFactLastWord.replace(/[^\w\s]/gi, '');
    }]);

    setCatData({
      ...catData,
      sortedCatFacts
    });

    setShowSortByLastWord(!showSortByLastWord);
  }

  const showFavorites = async () => {
    const favorites = await getUserFavorites(userId);
    setUserFavoriteCatFacts(favorites);
    setShowUserFavorites(true);
  }

  const saveToFavorites = (hasFavorites: boolean, favorite: CatDetailProps) => {
    setFavorite(favorite)
    setHasFavorites(hasFavorites);
  }

  const { catFacts, sortedCatFacts } = catData
  const maybeSortedCatFacts = (showSortByLastWord && !isNil(sortedCatFacts)) ? sortedCatFacts : catFacts;

  const displayedCatFacts = () => {
    return (
      <>
        {maybeSortedCatFacts.map((data: CatFacts) => {
          return (
            <CatDetails 
              key={data.picture.id}
              fact={data.fact}
              pictureUrl={data.picture.url}
              id={data.picture.id}
              saveToFavorites={saveToFavorites}
            />
          )
        })}
      </>
    )
  }

  const displayUserFavorites = () => {
    return (
      <>
        {userFavoriteCatFacts.map((favorite: CatDetailProps) => {
          return (
            <CatDetails 
              key={favorite.id}
              fact={favorite.fact}
              pictureUrl={favorite.pictureUrl}
              id={favorite.id}
              saveToFavorites={saveToFavorites}
            />
          )
        })}
      </>
    )
  }
  
  return (
    <div className='App'>
      <div className='header-container'>
        {!showUserFavorites ? <button
          className='sort-button'
          onClick={() => sortCatData()}
        >
          {!showSortByLastWord ? 'sort by last word' : 'unsort'}
        </button> : <button
          className='sort-button'
          onClick={() => setShowUserFavorites(false)}
        >
          back
        </button> }
        {hasFavorites ? <button
          className='sort-button'
          onClick={() => showFavorites()}
        >
          view favorites
        </button> : null}
      </div>
      <div className='cat-fact-list' data-testid='cat-facts-list'>
        {showUserFavorites ? displayUserFavorites() : displayedCatFacts()}
      </div>
    </div>
  );
}

export default App;
