import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "https://api.goldsky.com/api/public/project_cm2325g2umzjg01w78opmha2y/subgraphs/pumper-open-campus-codex/1.0.2/gn",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
