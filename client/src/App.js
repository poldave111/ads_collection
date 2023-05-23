import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAds } from './redux/adsRedux';
import { Routes, Route } from 'react-router-dom';
import MainPage from "./components/MainPage/MainPage";
import EditAd from "./components/EditAd/EditAd";
import MaxiAd from "./components/MaxiAd/MaxiAd";
import Register from "./components/Register/Register";
import AddPost from "./components/AddPost/AddPost";
import Login from "./components/Login/Login";
import Contact from "./components/Contact/Contact";
import AboutUs from "./components/AboutUs/AboutUs";
import Search from "./components/Search/Search";
import NotFound from "./components/NotFound/NotFound";
import Header from "./components/Header/Header";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAds());
  }, []);

  const data = useSelector((state) => {
    return state.ads.allAds;
  });

  console.log('data app.js', data);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/edit/:id" element={<EditAd />} />
        <Route path="/adview/:id" element={<MaxiAd />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search/:searchPhrase" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add" element={<AddPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="*" element={<NotFound />} />
        {/* <Route path="/adview/" element={<MaxiAd title={data[0]?.title} />} /> */}
      </Routes>
    </>


    // <div>{data.map((line) => <li>({line._id}), {line.title}</li>)}</div>
  );
};

export default App;
