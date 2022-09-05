import 'reflect-metadata';
import 'module-alias/register';
import {startApolloServer} from './server';

const setUpServer = async (): Promise<void> => {
	try {
		await Promise.all([startApolloServer()]);
	} catch (error) {
		console.error(`Couldn't start the app: ${error}`);
	}
};

setUpServer();
