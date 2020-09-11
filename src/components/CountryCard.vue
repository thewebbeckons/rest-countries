<template>
  <div class="card">
    <img :src="country.flag" class="card-img">
    <div class="card-content">
      <h1 class="card-title">{{ country.name }}</h1>
      <ul class="card-meta">
        <li><b>Population:</b> {{ country.population | currency }}</li>
        <li><b>Region:</b> {{ country.region ? country.region : 'N/A' }}</li>
        <li><b>Capital:</b> {{ country.capital ? country.capital : 'N/A' }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CountryCard', 
  props: {
    country: Object,
  },
  filters: {
    currency (value) {
      if (typeof value !== 'number') {
        return 'N/A'
      }
      const formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0
      })
      return formatter.format(value)
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card {
  border-radius: $radius;
  background-color: $light-elements;
  font-family: $font;
  box-shadow: $box-shadow;
  cursor: pointer;
  transition: transform 0.25s ease-in-out;  
  &-img {
    border-top-left-radius: $radius;
    border-top-right-radius: $radius;
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  &-content {
    padding: 1.6rem;
  }
  &-title {
    font-weight: 800;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  &-meta {
    font-size: 1rem;
    font-weight: 300;
    list-style-type: none;
    li {
      padding: 0.2rem 0;
    }   
  }
}
.card:hover {
  transform: translateY(-10px);
}
</style>
