require('dotenv').config()
const OBA = require('oba-api');

// Setup authentication to api server
const client = new OBA({
  // ProQuest API Keys
  public: process.env.PUBLIC,
  secret: process.env.SECRET
});

// General usage:
// client.get({ENDPOINT}, {PARAMS});
// ENDPOINT = search | details | refine | schema | availability | holdings
// PARAMS = API url parameter options (see api docs for more info)

// Client returns a promise which resolves the APIs output in JSON

// Example search to the word 'rijk' sorted by title:
client.get('search', {
  q: 'format:book',
  refine: true,
  librarian: true
})
  .then(results => JSON.parse(results))
  .then(results => {
    client
      .get("refine", {
        rctx:
          "AWNkYOZmYGcwzDfMKiouLTY1TKooNUrLLkzNLEysKMnIZGZk4MxNzMxjYGYQT8svyk0ssUrKz8@mBBGMzNKZ8UWpycUFqUUFiemprEYGTAwPzjHeKr9VznSvj4lR40gGIwMDe35SIgMDg6J$UX5$iX5OZmFpZoo$UIy9tCiHgTUvhxEA",
        count: 100
      })
      .then(response => JSON.parse(response))
      .then(response => {
        let metadata = response.aquabrowser.facets.facet;
        let genre_object = [];
        let genreCounts = metadata.find(item => item.id == "Genre").value;
        genreCounts = genreCounts.map(genre => {
          return {
            count: genre.count,
            genre: genre.id
          };
        });
        console.log(genreCounts);
      });
    });