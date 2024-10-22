import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  //const [loading, setLoading] = useState(false);
  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    // Other options
  });

  const fetchRepositories = async () => {
    // Replace the IP address part with your own IP address!
    const fetchedRepositories = data.repositories;
    setRepositories(fetchedRepositories);
  };

  useEffect(() => {
    if (data) {
      fetchRepositories();
    }
  }, [data]);

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;
