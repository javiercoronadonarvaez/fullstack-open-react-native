import { useMutation, useApolloClient } from "@apollo/client";
import { SIGN_IN } from "../graphql/mutations";

import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  console.log("Storage Context", authStorage);

  const [authenticate, token] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    const data = await authenticate({
      variables: { username, password },
    });
    console.log("TOKEN DATA", data);
    const fetchedToken = data.data.authenticate.accessToken;
    console.log("TOKEN", fetchedToken);
    await authStorage.setAccessToken(fetchedToken);
    apolloClient.resetStore();
    //return fetchedToken.data.authenticate;
    const currentToken = await authStorage.getAccessToken();
    console.log("Current Token:", currentToken);
  };

  return [signIn, token];
};

export default useSignIn;
