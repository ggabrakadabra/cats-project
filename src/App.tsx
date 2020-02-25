import React from 'react';
import './App.scss';
import { getCatFacts, getCatImages } from './api/catApi';
import { zipWith, sortBy, isNil } from 'lodash';
import CatDetails from './components/CatDetails/CatDetails';
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
  favorites: CatFacts[];
}
export let userId = '';

function App() {
  const [catData, setCatData] = React.useState<CatData>({
    page: 0,
    catFacts: [],
    favorites: []
  });

  const [display, setDisplay] = React.useState('all');
  const [hasFavorites, setHasFavorites] = React.useState(false);
  const [sortedCatFacts, setSortedCatFacts] = React.useState(false);
  const [sortedData, setSortedData] = React.useState<undefined | CatFacts[]>(undefined)

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
    const sorted = sortBy(whichDataToSort, [(cat) => {
      const catFactArrayOfWords = cat.fact.toLocaleLowerCase().split(' ');
      const catFactLastWord = catFactArrayOfWords[catFactArrayOfWords.length - 1];
      return catFactLastWord.replace(/[^\w\s]/gi, '');
    }]);

    setSortedData(sorted)
    setSortedCatFacts(!sortedCatFacts)
  }

  const saveToFavorites = (hasFavorites: boolean, favorite: CatFacts, catFactId: string) => {
    const favoriteExists = catData.favorites.some(favorite => favorite.id === catFactId)
    if (favoriteExists) {
      return;
    } else {
      const newFavorites = catData.favorites.concat(favorite);
      setFavorite(favorite)
      setCatData({...catData, favorites: newFavorites })
      setHasFavorites(hasFavorites);
    }
  }

  const showUserFavorites = display === 'favorites'
  const { catFacts, favorites } = catData
  const favoritesOrRegular = showUserFavorites ? favorites : catFacts;
  const maybeSorted = sortedCatFacts && !isNil(sortedData) ? sortedData : favoritesOrRegular
  
  return (
    <div className='App'>
      <div className='header-container'>
        <button
          className='sort-button'
          onClick={() => sortCatData(showUserFavorites)}
        >
          {!sortedCatFacts ? 'sort by last word' : 'unsort'}
        </button>
        {hasFavorites && !sortedCatFacts ? <button
          className='sort-button'
          onClick={() => setDisplay(showUserFavorites ? 'all' : 'favorites')}
        >
          {!showUserFavorites ? 'view favorites' : 'back'}
        </button> : null}
      </div>
      <div className='cat-fact-list' data-testid='cat-facts-list'>
      {maybeSorted.map((data: CatFacts) => {
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
