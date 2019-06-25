import './styles/main.css';

import { foo, createCb } from './asynchronous-programming/task1';

foo(5, createCb('cb'));
foo(20, createCb('cb'));
