import css from './SearchBar.module.css';
import React from 'react';
import toast from 'react-hot-toast';

export default function SearchBar({ onSubmit }) {
  const handleSubmit = e => {
    e.preventDefault();
    const query = e.target.elements.query.value.trim();

    if (!query) {
      toast.error('Please enter text to search images!');
      return;
    }

    onSubmit(query);
    e.target.reset();
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={css.button} type="submit">🔍</button>
      </form>
    </header>
  );
}
