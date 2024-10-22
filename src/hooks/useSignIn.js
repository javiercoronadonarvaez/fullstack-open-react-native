import { useMutation } from "@apollo/client";
import { SIGN_IN } from "../graphql/mutations";

import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  console.log("Storage Context", authStorage);
  const [authenticate, token] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    console.log("HERE");
    // call the mutate function here with the right arguments
    const fetchedToken = await authenticate({
      variables: { username, password },
    });
    console.log("TOKEN", fetchedToken);
    return fetchedToken.data.authenticate;
  };

  return [signIn, token];
};

export default useSignIn;
