<template>
  <div class="container">
    <section class="filter-section">
      <div class="filter-item">
        <div class="search">
          <font-awesome-icon :icon="['fas', 'search']" class="search-icon"/>
          <input v-model="search" type="text" placeholder="Search for a country..." class="search">
        </div>        
      </div>
      <div class="filter-item">
        <RegionFilter :regions="regions" />
      </div>
    </section>
    <div class="loading"></div>
    <transition-group tag="div" class="country-list" name="list-item" :delay="1000">
      <CountryCard 
        v-for="country in filteredList" 
        :key="country.name" 
        :country="country" 
        @click.native="$router.push({name: 'Country', params: { country: country.name.toLowerCase() } })"
      />
    </transition-group>
  </div>
</template>

<script>
// @ is an alias to /src
import CountryCard from '@/components/CountryCard.vue'
import RegionFilter from '@/components/RegionFilter.vue'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    CountryCard,
    RegionFilter
  },
  data() {
    return {
      countryList: null,
      search: null,
      regions: []
    };
  },
  computed: {
    filteredList () {
      if (this.search) {
        return this.countryList.filter(country => country.name.toLowerCase().includes(this.search.toLowerCase()))
      } else {
        return this.countryList
      }
    }
  },
  async created () {
    await axios
      .get('https://restcountries.eu/rest/v2/all?fields=name;capital;population;region;flag')
      .then(response => (this.countryList = response.data))
      .then(response => {
        let regions = []
        const countries = response
        countries.map((country) => {
          regions.push(country.region)
        })
        regions = [...new Set(regions)]
        this.regions = regions 
      })
  }  
};
</script>

<style lang="scss">
.filter-section {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 3rem;
  .filter-item {
    align-self: center;
    position: relative;
  }
  .search {
    input {
      padding: 1rem 3rem;
      border: none;
      font-size: 1rem;
      font-family: $font;
      border-radius: $radius;      
      box-shadow: $box-shadow;
      width: 25vw;
      border: 2px solid transparent;
    }    
    input:focus {
      border: 2px solid $light-text;
    }
  }
  .search-icon {
    position: absolute;
    top: calc(1rem + 3px);
    left: 1rem;
    color: $light-text;
  }
  .regions {
    padding: 1rem 1.6rem 1rem 1rem;
    border: none;
    font-size: 1rem;
    font-family: $font;
    border-radius: $radius;
    box-shadow: $box-shadow;
    width: 100%;
  }
}
.country-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  column-gap: 4rem;
  row-gap: 4rem;
}
// List Transistions
.list-item {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.3s, transform 0.3s;
    transform-origin: left center;
  }
  &-enter,
  &-leave-to {
    opacity: 0;
  }
  &-leave-active {
    position: absolute;
  }
  &-move {
    transition: transform .4s linear .1s;
  }
}

// Tablet Media Query
@media screen and (max-width: 1440px) {
  .country-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    column-gap: 4rem;
    row-gap: 4rem;
  }
}
@media screen and (min-width: 487px) and (max-width: 768px) {
  .filter-section {
    .filter-item > .search > input {
      width: 33vw;
    }
  }
}
// Mobile Media Query
@media screen and (max-width: 486px) {
  .country-list {
    grid-template-columns: 1fr;
    column-gap: 3rem;
    row-gap: 3rem;
  }
  .filter-section {
    .filter-item {
      flex-grow: 1;
    }
    .filter-item > .search > input {
      width: calc(100% - 6rem);
    }
    .filter-item:first-of-type {
      margin-bottom: 1rem;
    }
  }
}

</style>
