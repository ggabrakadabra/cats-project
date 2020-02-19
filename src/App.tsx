import React from 'react';
import './App.scss';
import { getCatFacts, getCatImages } from './api/catApi';
import { zipWith } from 'lodash';
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
}

function App() {
  const [catData, setCatData] = React.useState<CatData>({
    page: 0,
    catFacts: []
  });

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

  return (
    <div className='App'>
      <div className='cat-fact-list' data-testid='cat-facts-list'>
        {catData.catFacts.map((data: CatFacts) => {
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
