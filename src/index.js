import './styles/main.css';

// import { foo, createCb } from './asynchronous-programming/task1';
//
// foo(5, createCb('cb'));
// foo(20, createCb('cb'));

// import { parseJson, successCb, failureCd } from './asynchronous-programming/task2';
//
// parseJson(`{"x": 10}`, successCb, failureCd);
// parseJson(`{x}`, successCb, failureCd);

import delay from './asynchronous-programming/task3';

delay(1000).then(value => console.log(`Done with ${value}`));
