import database from '../config/db.js';

const Questions = {
  question_title: { type: 'string', notNullable: true },
  question_body: { type: 'text', notNullable: true },
  question_tags: { type: 'jsonb', notNullable: true },
  no_of_answers: { type: 'integer', defaultTo: 0 },
  up_vote: { type: 'jsonb', defaultTo: [] },
  down_vote: { type: 'jsonb', defaultTo: [] },
  user_posted: { type: 'string', notNullable: true },
  user_id: { type: 'string' },
  asked_on: { type: 'timestamp', defaultTo: database.fn.now() }
};

export default Questions;


