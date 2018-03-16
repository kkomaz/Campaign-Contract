/**
 * Executed twice.
 * #1. One time on the server to render our application
  * window is not defined initially.
 * #2. On the browser
 */

import Web3 from 'web3';
import { NETWORK_KEY, SECRET_KEY } from '../env.config.js';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // We are in the browser and metamask is running
  web3 = new Web3(window.web3.currentProvider);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(NETWORK_KEY);

  web3 = new Web3(provider);
}

export default web3;
