import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/queries";

const useUser = (includeReviews) => {
  const { data, loading, refetch } = useQuery(GET_USER, {
    fetchPolicy: "cache-and-network",
    variables: { includeReviews: includeReviews },
  });
  const [user, setUser] = useState();

  const fetchUser = async () => {
    const fetchedUser = data.me;
    setUser(fetchedUser);
  };

  useEffect(() => {
    console.log("DATA", data);
    if (data) {
      fetchUser();
    }
  }, [data]);

  console.log("FINAL USER", data);

  return { user, loading, refetch };
};

export default useUser;
