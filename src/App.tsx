import React from 'react';
import './App.scss';
import { getCatFacts, getCatImages } from './api/catApi';
import { zipWith, sortBy, isNil } from 'lodash';
import CatDetails, { CatDetailProps } from './components/CatDetails/CatDetails';
import uuid from 'uuid';
import { setUser, setFavorite, getUserFavorites } from './api/userApi';
import { getLocalStorageValue, setLocalStorageValue } from './utils/localStorage';

export interface PictureData {
  id: string;
  url:string;
  sourceUrl: string;
};

export interface CatFacts {
  fact: string;
  pictureUrl: string;
  id: string;
}

export interface CatData {
  page: number;
  catFacts: CatFacts[];
  sortedCatFacts?: CatFacts[];
  favorites: CatFacts[];
}
export let userId = '';

function App() {
  const [catData, setCatData] = React.useState<CatData>({
    page: 0,
    catFacts: [],
    favorites: []
  });

  const [showSortByLastWord, setShowSortByLastWord ] = React.useState(false);
  const [showUserFavorites, setShowUserFavorites] = React.useState(false);
  const [hasFavorites, setHasFavorites] = React.useState(false);

  const getCatData = React.useCallback(async () => {
    const facts = await getCatFacts();
    const pictures = await getCatImages();
    const catFactsArray = zipWith(facts.data, pictures, (fact: {fact: string}, picture: PictureData) => ({ fact: fact.fact.trim(), pictureUrl: picture.url, id: picture.id }));
    const favorites = await getUserFavorites(userId);
    if (favorites.length) {
      setHasFavorites(true);
    }
    setCatData({
      page: 1,
      catFacts: catFactsArray,
      favorites: favorites
    });

  }, []);


  const getUser = async () => {
    const persistedUserId = getLocalStorageValue('userId');
    if (!isNil(persistedUserId)) {
     userId = persistedUserId
    } else {
      const newUserId = uuid();
      setLocalStorageValue('userId', newUserId);
      setUser(newUserId);
    }
  }
  
  React.useEffect(() => {
    getUser();
    getCatData();
  }, [getCatData]);
  
  const sortCatData = (useFavorites: boolean) => {
    const whichDataToSort = useFavorites ? catData.favorites : catData.catFacts
    const sortedCatFacts = sortBy(whichDataToSort, [(cat) => {
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

  const saveToFavorites = (hasFavorites: boolean, favorite: CatDetailProps) => {
    setFavorite(favorite)
    setHasFavorites(hasFavorites);
  }

  const { catFacts, sortedCatFacts, favorites } = catData
  const favoritesOrRegular = showUserFavorites ? favorites : catFacts;
  const maybeSortedCatFacts = (showSortByLastWord && !isNil(sortedCatFacts)) ? sortedCatFacts : favoritesOrRegular;
  
  return (
    <div className='App'>
      <div className='header-container'>
        <button
          className='sort-button'
          onClick={() => sortCatData(showUserFavorites ? true : false)}
        >
          {!showSortByLastWord ? 'sort by last word' : 'unsort'}
        </button>
        {hasFavorites ? <button
          className='sort-button'
          onClick={() => setShowUserFavorites(!showUserFavorites)}
        >
          {!showUserFavorites ? 'view favorites' : 'back'}
        </button> : null}
      </div>
      <div className='cat-fact-list' data-testid='cat-facts-list'>
      {maybeSortedCatFacts.map((data: CatFacts) => {
          return (
            <CatDetails 
              key={data.id}
              fact={data.fact}
              pictureUrl={data.pictureUrl}
              id={data.id}
              saveToFavorites={saveToFavorites}
              isFavorite={showUserFavorites ? true : false}
            />
          )
        })}
      </div>
    </div>
  );
}

export default App;
