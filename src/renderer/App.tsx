import React, { useEffect } from 'react';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';

import { Provider, useDispatch } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';

import Search from './pages/Search';
import Settings from './pages/Settings';
import './App.scss';
import { clearNews } from './store/newsSlice';

function AppRouter() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearNews());
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRouter />
        </PersistGate>
      </Provider>
    </div>
  );
}
