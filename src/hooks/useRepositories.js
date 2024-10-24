import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (orderingOption, searchKeyword) => {
  let orderBy = "";
  let orderDirection = "";
  switch (orderingOption) {
    case "highest":
      console.log("HIGHEST");
      orderBy = "RATING_AVERAGE";
      orderDirection = "DESC";
      break;
    case "lowest":
      console.log("LOWEST");
      orderBy = "RATING_AVERAGE";
      orderDirection = "ASC";
      break;
    default:
      break;
  }

  console.log("ORDER BY: ", orderBy);
  console.log("ORDER DIRECTION: ", orderDirection);

  const [repositories, setRepositories] = useState();
  //const [loading, setLoading] = useState(false);
  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: {
      orderBy: orderBy ? orderBy : "CREATED_AT",
      orderDirection: orderDirection ? orderDirection : "DESC",
      searchKeyword: searchKeyword ? searchKeyword : "",
      skip: orderingOption ? !orderingOption : null,
    },
  });

  const fetchRepositories = async () => {
    // Replace the IP address part with your own IP address!
    const fetchedRepositories = data.repositories;
    setRepositories(fetchedRepositories);
  };

  useEffect(() => {
    console.log("REPOSITORIES DATA", data);
    if (data) {
      fetchRepositories();
    }
  }, [data]);

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;
