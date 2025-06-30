import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import DateCounter from './pages/dateCounter';

import FlashCard from './pages/flashCard/flashCard';
import TravelList from './pages/travel/travel_list';
import FlashCardQuizz from './pages/flashCardQuizz/FlashCardQuizz';
import EatAndSplit from './pages/EatAndSplit/EatAndSplit';
import UsePopCorn from './pages/DemoUsePopCorn/usePopCorn';
import TabBox from './pages/TabBox/TabBox';
import ChangeMoney from './pages/Money/ChangeMoney';
import GeolocatePage from './pages/Geolocate/GeolocatePage';
import QuizzPage from './pages/Quizz/QuizzPage';
import AutomicBlog from './pages/AutomicBlog/AutomicBlog';


const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DateCounter />} />
        <Route path="/travel" element={<TravelList />} />
        <Route path="/card" element={<FlashCard />} />
        <Route path="/flashCardQuizz" element={<FlashCardQuizz />} />
        <Route path="/eatandsplit" element={<EatAndSplit />} />
        <Route path="/usePopcorn" element={<UsePopCorn />} />
        <Route path="/tabBox" element={<TabBox />} />
        <Route path="/changemoney" element={<ChangeMoney />} />
        <Route path="/geolocate" element={<GeolocatePage />} />
        <Route path="/quizz" element={<QuizzPage />} />
        <Route path="/automic-blog" element={<AutomicBlog />} />
        <AuthProvider>
          <CitiesProvider>
            <BrowserRouter>
              <Suspense fallback={<SpinnerFullPage />}>
                <Routes>
                  <Route index element={<Homepage />} />
                  <Route path="product" element={<Product />} />
                  <Route path="pricing" element={<Pricing />} />
                  <Route path="login" element={<Login />} />
                  <Route
                    path="app"
                    element={
                      <ProtectedRoute>
                        <AppLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Navigate replace to="cities" />} />
                    <Route path="cities" element={<CityList />} />
                    <Route path="cities/:id" element={<City />} />
                    <Route path="countries" element={<CountryList />} />
                    <Route path="form" element={<Form />} />
                  </Route>
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </CitiesProvider>
        </AuthProvider>
      </Routes>
    </>
  );
}

export default App;
