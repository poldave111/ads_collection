import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAds } from './redux/adsRedux';
import { Routes, Route } from 'react-router-dom';
import MainPage from "./components/MainPage/MainPage";
import EditAd from "./components/EditAd/EditAd";
import MaxiAd from "./components/MaxiAd/MaxiAd";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAds());
  },[]);

  const data = useSelector((state) => {
    return state.ads.allAds;
});

  console.log('data app.js', data);

  return (
    <>
      <MainPage />
      <Routes>
        <Route path="/adview" element={<MaxiAd title={data[0]?.title} />} />
        <Route path="/edit" element={<EditAd adId={data[0]?._id} />} />
      </Routes>
    </>
    
    
    // <div>{data.map((line) => <li>({line._id}), {line.title}</li>)}</div>
  );
};

export default App;
