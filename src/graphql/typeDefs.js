import { fileLoader, mergeTypes } from 'merge-graphql-schemas';
import path from 'path';

/*
Informações:
__dirname: é a pasta atual
modules: está acessando essa pasta
**: qualquer pasta que está dentro de modules
*.gql: dentro dessas pastas vai procurar por todos os arquivos .gql
*/
const typesArray = fileLoader(path.join(__dirname, 'modules', '**', '*.gql'));
const typeDefs = mergeTypes(typesArray); // Fará o merge de todos os types encontrados na linha acima

export default typeDefs;
