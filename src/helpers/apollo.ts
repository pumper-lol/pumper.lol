import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "https://api.goldsky.com/api/public/project_cm07hzv13el6m01w09itv9ahu/subgraphs/pumper-open-campus-codex/1.0.3/gn",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
