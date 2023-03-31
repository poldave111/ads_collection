import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAds } from "./redux/adsRedux";
import MainPage from "./components/MainPage/MainPage";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAds());
  },[]);

  const data = useSelector((state) => {
    return state.ads;
  });


  return (
    <MainPage />
    // <div>{data.map((line) => <li>({line._id}), {line.title}</li>)}</div>
  );
};

export default App;
