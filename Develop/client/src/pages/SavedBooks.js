import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../graphql/queries';
import { REMOVE_BOOK } from '../graphql/mutations';

import BookList from '../components/BookList';

function SavedBooks() {
  const { loading, error, data } = useQuery(QUERY_USER);
  const [removeBook] = useMutation(REMOVE_BOOK);

  const handleRemoveBook = async (bookId) => {
    try {
      await removeBook({ variables: { bookId } });
      alert('Book removed from your list!');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <h1>Your saved books</h1>
      {data && (
        <BookList
          books={data.user.savedBooks}
          onRemoveBook={handleRemoveBook}
        />
      )}
    </>
  );
}

export default SavedBooks;
