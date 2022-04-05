import React from 'react';
import './App.css';
import Layout from './component/layout/Layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainNavigation from './component/layout/MainNavigation';
import Graph from './component/Graph/Graph';
import StateWiseData from './component/StateWiseData/StateWiseData';
import Dashboard from './component/Home/Dashboard';
import PageNotFound from './component/PageNotFound/PageNotFound';

function App() {
  return (
      <>
      <Layout>
      <Routes>
      <Route path="/" element={<Navigate to='/home' />} />
      <Route path='home' element={<Dashboard />} />
      <Route path="state-data" element={<StateWiseData />} />
      <Route path="graph" element={<Graph />} />
      <Route path="*" element={<PageNotFound />} />
      </Routes>
      </Layout>
      </>
  );
}

export default App;
