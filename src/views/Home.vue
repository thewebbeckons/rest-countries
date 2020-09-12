<template>
  <div>
    <div class="filter-section">
      <div class="filter-item">
        <div class="search">
          <font-awesome-icon :icon="['fas', 'search']" class="search-icon"/>
          <input v-model="search" type="text" placeholder="Search for a country..." class="search" title="search-field">
        </div>        
      </div>
      <div class="filter-item">
        <RegionFilter :regions="regions" @filter-region="filterRegion" @remove-filter="removeFilter" />
      </div>
    </div>
    <transition-group v-if="countryList" tag="div" class="country-list" name="list-item">
      <CountryCard 
        v-for="country in filteredList" 
        :key="country.name" 
        :country="country" 
        @click.native="$router.push({name: 'Country', params: { country: country.name.toLowerCase() } })"
      />
    </transition-group>
    <div v-else class="loading">
      <font-awesome-icon  :icon="['fas', 'spinner']" spin size="3x" />
    </div>
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
      regions: [],
      filter: null
    };
  },
  computed: {
    filteredList () {
      const countries = this.countryList
      if (this.search && !this.filter) {
        return countries.filter(country => country.name.toLowerCase().includes(this.search.toLowerCase()))      
      } else if (this.filter && !this.search) {
        return countries.filter(country => country.region.toLowerCase() === this.filter.toLowerCase())
      } else if (this.search && this.filter) {
        return countries
          .filter(country => country.region.toLowerCase() === this.filter.toLowerCase())
          .filter(country => country.name.toLowerCase().includes(this.search.toLowerCase()))
      } else {
        return countries
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
        regions = [...new Set(regions)].filter((el) => {
          return el != ''
        })
        this.regions = regions 
      })
  },
  methods: {
    filterRegion (e) {
      // add to the filter thing.
      this.filter = e
    },
    removeFilter () {
      // remove filter
      this.filter = null
    }
  }  
};
</script>

<style lang="scss">
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  opacity: 0.6;
}
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
  gap: 4rem;
  margin-bottom: 4rem;
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
    grid-template-columns: 1fr 1fr 1fr;
  }
}
@media screen and (min-width: 487px) and (max-width: 786px) {
  .country-list {
    grid-template-columns: 1fr 1fr;
  }
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
    gap: 2rem;
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
