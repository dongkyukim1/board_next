// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
/* eslint-disable react-hooks/rules-of-hooks */
// The current database to use.
// MongoDB Playground
use('board_next');

db.getCollection('next').insertMany([
  {
    title: '첫 번째 글',
    content: '첫 번째 글의 내용입니다.',
    createdAt: new Date()
  },
  {
    title: '두 번째 글',
    content: '두 번째 글의 내용입니다.',
    createdAt: new Date()
  },
  {
    title: '세 번째 글',
    content: '세 번째 글의 내용입니다.',
    createdAt: new Date()
  }
]);
