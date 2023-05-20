import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Provider, useDispatch } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';

import Search from './pages/Search';
import Settings from './pages/Settings';
import './App.scss';
import { clearNews } from './store/newsSlice';
import AppLayout from './components/AppLayout/AppLayout';

function AppRouter() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearNews());
  }, []);
  return (
    <Routes>
      <Route path="/search" element={<Search />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<Search />} />
    </Routes>
  );
}

export default function App() {
  return (
    <div className="App">
      <AppLayout>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppRouter />
          </PersistGate>
        </Provider>
      </AppLayout>
    </div>
  );
}
