import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import SavedBooks from './pages/SavedBooks';
import SearchBooks from './pages/SearchBooks';
import SignupForm from './pages/SignupForm';
import LoginForm from './pages/LoginForm';
import Footer from './components/Footer';

