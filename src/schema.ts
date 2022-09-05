import {buildSchemaSync} from 'type-graphql';
import {resolvers} from './graphql/index';

export const schema = buildSchemaSync({resolvers});
