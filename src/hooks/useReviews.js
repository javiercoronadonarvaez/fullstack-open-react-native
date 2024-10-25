import { useQuery } from "@apollo/client";
import { GET_SINGLE_REPOSITORY } from "../graphql/queries";

const useReviews = (userId) => {
  const { data, loading, fetchMore } = useQuery(GET_SINGLE_REPOSITORY, {
    variables: {
      first: 2,
      id: userId,
    },
    fetchPolicy: "cache-and-network",
    skip: !userId,
  });

  const handleFetchMoreReviews = () => {
    if (!data || loading) return;

    const canFetchMore = data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) return;

    console.log("CAN I FETCH MORE", canFetchMore);

    fetchMore({
      variables: {
        first: 2,
        after: data.repository.reviews.pageInfo.endCursor,
        id: userId,
      },
    });
  };

  return {
    reviews: data?.repository.reviews,
    url: data?.repository.url,
    fetchMore: handleFetchMoreReviews,
    loading,
  };
};

export default useReviews;
