import { gql } from '@apollo/client';

//LOGIN  USER mutation 
export const LOGIN_USER = gql`
  mutation login(
    $email: String!
    $password: String!
  ) {
    login(email: $email
      password: $password
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// ADD USER  mutation 
export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;

//SAVE BOOK  mutation
export const SAVE_BOOK = gql`
  mutation saveBook(
    $newBook: BookInput!
  ) {
    saveBook(
      newBook: $newBook
    ) {
      _id
      username
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

//REMOVE BOOK mutation 
export const REMOVE_BOOK = gql`
  mutation removeBook(
    $bookId: ID!
  ) {
    removeBook(
      bookId: $bookId
    ) {
      _id
      username
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