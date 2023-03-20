import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_BOOKS } from '../graphql/queries';
import { SAVE_BOOK } from '../graphql/mutations';

import BookList from '../components/BookList';

function SearchBooks() {
  const [searchTerm, setSearchTerm] = useState('');
  const { loading, error, data, refetch } = useQuery(QUERY_BOOKS, {
    variables: { searchTerm },
    skip: !searchTerm,
  });

  const [saveBook] = useMutation(SAVE_BOOK);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchTerm) {
      return false;
    }

    try {
      await refetch();
      setSearchTerm('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveBook = async (bookId) => {
    const bookToSave = data.books.find((book) => book.id === bookId);
    const { title, authors, description, image, link } = bookToSave;
    try {
      await saveBook({
        variables: { title, authors, description, image, link },
      });
      alert('Book saved!');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {data && <BookList books={data.books} onSaveBook={handleSaveBook} />}
    </>
  );
}

export default SearchBooks;
