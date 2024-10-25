// import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (orderingOption, searchKeyword) => {
  let orderBy = "";
  let orderDirection = "";
  switch (orderingOption) {
    case "highest":
      orderBy = "RATING_AVERAGE";
      orderDirection = "DESC";
      break;
    case "lowest":
      orderBy = "RATING_AVERAGE";
      orderDirection = "ASC";
      break;
    default:
      break;
  }

  const { data, loading, fetchMore } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: {
      orderBy: orderBy ? orderBy : "CREATED_AT",
      orderDirection: orderDirection ? orderDirection : "DESC",
      searchKeyword: searchKeyword ? searchKeyword : "",
    },
    skip: orderingOption ? !orderingOption : null,
  });

  const handleFetchMore = () => {
    if (!data || loading) return;

    const canFetchMore = data.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) return;

    console.log("CAN I FETCH MORE", canFetchMore);

    fetchMore({
      variables: {
        first: 1,
        after: data.repositories.pageInfo.endCursor,
        orderBy: orderBy ? orderBy : "CREATED_AT",
        orderDirection: orderDirection ? orderDirection : "DESC",
        searchKeyword: searchKeyword ? searchKeyword : "",
      },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
  };
};

// const fetchRepositories = async () => {
//   // Replace the IP address part with your own IP address!
//   const fetchedRepositories = data.repositories;
//   setRepositories(fetchedRepositories);
// };

// useEffect(() => {
//   if (data) {
//     fetchRepositories();
//   }
// }, [data]);

// return { repositories, loading, refetch: fetchRepositories };

export default useRepositories;
