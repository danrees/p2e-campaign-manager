import Surreal from 'surrealdb.js';

let s: Surreal;

async function getInstance() {
	if (s) return s;
	console.log('new surreal');
	s = new Surreal('http://127.0.0.1:8000/rpc');
	//const { namespace, db } = config();
	//await s.connect('http://127.0.0.1:8000/rpc');
	// await s.use(namespace, db);
	//await s.signin({ user: 'root', pass: 'password' });
	return s;
}

export { getInstance };
