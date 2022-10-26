/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getWorkout = /* GraphQL */ `
  query GetWorkout($id: ID!) {
    getWorkout(id: $id) {
      datetime
      time
      date
      routine
      exercise
      set
      weight
      rep
      id
      createdAt
      updatedAt
    }
  }
`;
export const listWorkouts = /* GraphQL */ `
  query ListWorkouts(
    $filter: ModelWorkoutFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWorkouts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        datetime
        time
        date
        routine
        exercise
        set
        weight
        rep
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
