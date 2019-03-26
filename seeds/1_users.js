
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          user_id:1,
          display_name:'Nick',
          email:'test@test.com',
          hash:'$2a$10$CzeiBkounASJlwmdyDkpHOHG102UFPWockXa5oWppScUQnCdk/Aje',
          image_url: 'https://media.gettyimages.com/photos/nicolas-cage-attends-the-german-sustainability-award-2016-at-maritim-picture-id625763258'
        }
      ]);
    });
};
