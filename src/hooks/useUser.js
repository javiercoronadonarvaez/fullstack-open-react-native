import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/queries";

const useUser = () => {
  const { data, loading, refetch } = useQuery(GET_USER);
  const [user, setUser] = useState();

  const fetchUser = async () => {
    // Replace the IP address part with your own IP address!
    const user = data.me;
    setUser(user);
  };

  useEffect(() => {
    if (data) {
      fetchUser();
    }
  }, [data]);

  return { user, loading, refetch };
};

export default useUser;
