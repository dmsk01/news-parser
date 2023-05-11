import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';

import Search from './pages/Search';
import Settings from './pages/Settings';
import './App.scss';

export default function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Search />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Search />} />
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
}
