import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAds } from './redux/adsRedux';
import { Routes, Route} from 'react-router-dom';
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
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/edit/:id" element={<EditAd />} />
        <Route path="/adview/:id" element={<MaxiAd />} />
        {/* <Route path="/adview/" element={<MaxiAd title={data[0]?.title} />} /> */}
      </Routes>
    </>
    
    
    // <div>{data.map((line) => <li>({line._id}), {line.title}</li>)}</div>
  );
};

export default App;
