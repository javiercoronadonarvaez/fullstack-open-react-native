import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query Repositories {
    repositories {
      edges {
        node {
          id
          ownerAvatarUrl
          fullName
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
        }
      }
    }
  }
`;

export const GET_USER = gql`
  query getUser {
    me {
      id
      username
    }
  }
`;

export const GET_SINGLE_REPOSITORY = gql`
  query GetSingleRepository($id: ID!) {
    repository(id: $id) {
      id
      fullName
      url
    }
  }
`;
