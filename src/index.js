import 'babel-polyfill';
import './styles/main.css';

// import { foo, createCb } from './asynchronous-programming/task1';
//
// foo(5, createCb('cb'));
// foo(20, createCb('cb'));

// import { parseJson, successCb, failureCd } from './asynchronous-programming/task2';
//
// parseJson(`{"x": 10}`, successCb, failureCd);
// parseJson(`{x}`, successCb, failureCd);

// import delay from './asynchronous-programming/task3';
//
// delay(1000).then(value => console.log(`Done with ${value}`));

// import doubleRequest from './asynchronous-programming/task4';
//
// doubleRequest();

// import printDataFromUrls from './asynchronous-programming/task5';
//
// printDataFromUrls();

// import './asynchronous-programming/task6';

// import foo from './asynchronous-programming/task7';
//
// foo();

import foo from './asynchronous-programming/task8';

foo('https://jsonplaceholder.typicode.com/users');
foo('ht://jsonplaceholder.typicode.com/users');
