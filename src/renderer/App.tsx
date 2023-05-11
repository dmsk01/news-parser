// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Search />} />
//         <Route path="/settings" element={<Settings />} />
//       </Routes>
//     </Router>
//   );
// }
import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';

import Search from './pages/Search';
import Settings from './pages/Settings';
import './App.scss';

const AnimatedSwitch = () => {
  const location = useLocation();
  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="slide" timeout={800}>
        <Routes location={location}>
          <Route path="/" element={<Search />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Search />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <AnimatedSwitch />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
}
