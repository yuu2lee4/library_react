import { useState } from 'react';

export default function BookModel() {
  const [title, setTitle] = useState('');

  return { title, setTitle };
}
