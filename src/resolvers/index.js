import path from 'path';
import { mergeResolvers } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';

const resolversArray = loadFilesSync( path.join(__dirname, './'), { ignoreIndex: true });

export default mergeResolvers( resolversArray, { all: true });
