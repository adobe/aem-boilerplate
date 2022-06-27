// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './scripts.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

console.log('sampleRUM delayed ID', sampleRUM.id);

// add more delayed functionality here
