import React from 'react';
import './App.scss';
import { getCatFacts, getCatImages } from './api/catApi';
import { zipWith, sortBy, isNil } from 'lodash';
import CatDetails from './components/CatDetails/CatDetails';

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

  const getCatData = React.useCallback(async () => {
    const facts = await getCatFacts();
    const pictures = await getCatImages();
    const catFactsArray = zipWith(facts.data, pictures, (fact: {fact: string}, picture: PictureData) => ({ fact: fact.fact, picture }));

    setCatData({
      page: 1,
      catFacts: catFactsArray
    })
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


  const { catFacts, sortedCatFacts } = catData
  const maybeSortedCatFacts = (showSortByLastWord && !isNil(sortedCatFacts)) ? sortedCatFacts : catFacts;
  
  return (
    <div className='App'>
      <button
        onClick={() => sortCatData()}
      >
        sort by last word
      </button>
      <div className='cat-fact-list' data-testid='cat-facts-list'>
        {maybeSortedCatFacts.map((data: CatFacts) => {
          return (
            <CatDetails 
              key={data.picture.id}
              fact={data.fact}
              pictureUrl={data.picture.url}
          />
          )
        })}
      </div>
    </div>
  );
}

export default App;
