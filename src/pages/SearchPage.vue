<template>
  <div id="app">
    <div class="container">
      <div class="text-center">
        <h2 class="text-center mt-5">Trending Movies 🍿</h2>
        <p>Keep up with the hottest movies that are trending this week.</p>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import { defineComponent, ref } from 'vue'
// import MovieCard from 'components/MovieCard.vue';
export default defineComponent({
  name: "SearchPage",
  components: {
    // MovieCard,
  },
  setup() {
    return {
      movies: [],
      apiKey: process.env.TMDB_API,
    };
  },
  methods: {
    getTrendingMovies(category) {
      return fetch(
        `https://api.themoviedb.org/3/trending/movie/${category}?api_key=${this.apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          this.movies = data.results;
          console.log(this.movies);
        });
    },
    test_add() {
      
    }, 
  },
  mounted() {
    this.getTrendingMovies("day");
  },
})
</script>