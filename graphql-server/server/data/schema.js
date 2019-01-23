// import { resolvers } from './resolvers';
import { importSchema } from 'graphql-import';
// LA NO SE UTILIZA POR QUE SE UTILIZARA APOLLO
// import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = importSchema('data/shema.graphql');
// LA NO SE UTILIZA POR QUE SE UTILIZARA APOLLO
// const schema = makeExecutableSchema({typeDefs, resolvers});

// export { schema };

export { typeDefs }