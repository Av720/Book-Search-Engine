//import apollo client from graphql
import { gql } from '@apollo/client';

//export it to ql and copy the query from mongo
export const GET_ME = gql`
  {
    me {
      _id
      username
      bookCount
      email
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;
