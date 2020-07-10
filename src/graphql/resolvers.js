import { fileLoader, mergeResolvers } from 'merge-graphql-schemas';
import path from 'path';

/*
Informações:
__dirname: é a pasta atual
modules: está acessando essa pasta
**: qualquer pasta que está dentro de modules
resolvers.js: dentro dessas pastas vai procurar por todos os arquivos resolvers.js
*/
const resolversArray = fileLoader(path.join(__dirname, 'modules', '**', '*-resolvers.js'));
const resolvers = mergeResolvers(resolversArray); // Fará o merge de todos os types encontrados na linha acima

export default resolvers;