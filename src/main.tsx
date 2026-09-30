import { MotionConfig } from 'framer-motion';
import React from 'react';import{createRoot}from'react-dom/client';import{HelmetProvider}from'react-helmet-async';import Home from './pages/Home';import './styles.css';
createRoot(document.getElementById('root')!).render(<React.StrictMode><HelmetProvider><MotionConfig reducedMotion="user"><Home/></MotionConfig></HelmetProvider></React.StrictMode>);
