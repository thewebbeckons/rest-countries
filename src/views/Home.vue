<template>
  <div>
    <div class="filter-section">
      <div class="filter-item">
        <div class="search">
          <font-awesome-icon :icon="['fas', 'search']" class="search-icon"/>
          <input 
            v-model="search" 
            type="text" 
            placeholder="Search for a country..." 
            class="search"
            title="search-field" 
            @input="update()"
          >
        </div>        
      </div>
      <div class="filter-item">
        <RegionFilter @filter-region="filterRegion" @remove-filter="removeFilter" />
      </div>
    </div>    
    <div v-if="countryList" class="country-list">
      <CountryCard 
        v-for="country in filteredList" 
        :key="country.alpha3Code"
        :id="country.name"
        :country="country" 
        @click.native="$router.push({name: 'Country', params: { country: country.alpha3Code } })"
      />
    </div>    
    <div v-else class="loading">
      <font-awesome-icon  :icon="['fas', 'spinner']" spin size="3x" />
    </div>
    <transition tag="div" name="slide">
      <div v-show="keyboard" class="keyboard-drawer">
        <button @click="toggleKeyboard()"><font-awesome-icon :icon="['fas', 'times']" />Close</button>
        <SimpleKeyboard @onChange="onChange" @onKeyPress="onKeyPress" :input="search" />
      </div>      
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import CountryCard from '@/components/CountryCard.vue'
import RegionFilter from '@/components/RegionFilter.vue'
import SimpleKeyboard from '@/components/SimpleKeyboard.vue'
import axios from 'axios'
import _ from 'lodash'

export default {
  name: 'Home',
  components: {
    CountryCard,
    RegionFilter,
    SimpleKeyboard
  },
  data() {
    return {
      countryList: null,
      search: null,
      regions: [],
      filter: null,
    };
  },
  computed: {
    keyboard () {
      return this.$store.state.keyboard
    },
    filteredList () {
      // handle if search is used, than filter, than both and finally none
      if (this.search && !this.filter) {
        return this.countryList.filter(country => country.name.toLowerCase().includes(this.search.toLowerCase()))      
      } else if (this.filter && !this.search) {
        return this.countryList.filter(country => country.region.toLowerCase() === this.filter.toLowerCase())
      } else if (this.search && this.filter) {
        return this.countryList
          .filter(country => country.region.toLowerCase() === this.filter.toLowerCase())
          .filter(country => country.name.toLowerCase().includes(this.search.toLowerCase()))
      } else {
        return this.countryList
      }
    }
  },
  async created () {
    // handle focused enter press
    document.addEventListener('keyup', event => {
      if (event.keyCode === 13) {
        this.handleEnter()
      }
    })
    // get country information and region list
    await axios
      .get('https://restcountries.com/v3.1/all?fields=name;capital;population;region;flag;alpha3Code')
      .then(response => (this.countryList = response.data))   
  },
  methods: {
    filterRegion (region) {
      // add to the filter thing.
      this.filter = region
    },
    removeFilter () {
      // remove filter
      this.filter = null
    },
    update () {
      _.debounce(function(e) {
        this.search = e.target.value;
      }, 1000)
    },
    handleEnter () {
      // get element that has focus
      const el = document.getElementsByClassName('card focus-visible')
      // use router push to navigate
      if (el[0].id !== 'undefined') {
        this.$router.push({name: 'Country', params: { country: el[0].id.toLowerCase() } })
      }      
    },
    toggleKeyboard () {      
      this.$store.state.keyboard = !this.$store.state.keyboard
    },
    onChange(input) {
      this.search = input;
    },
    onKeyPress(button) {
      console.log("button", button);
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
      border: 2px solid $text-light;
    }
  }
  .search-icon {
    position: absolute;
    top: calc(1rem + 3px);
    left: 1rem;
    color: $text-light;
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-template-rows: auto;
  gap: 3rem;
  margin-bottom: 3rem;
}
// List Transistions
// .list-item {
//   &-enter-active,
//   &-leave-active {
//     transition: opacity 0.3s, transform 0.3s;
//     transform-origin: left center;
//   }
//   &-enter,
//   &-leave-to {
//     opacity: 0;
//   }
//   &-leave-active {
//     position: absolute;
//   }
//   &-move {
//     transition: transform .4s linear .1s;
//   }
// }

.keyboard-drawer {
  position: fixed;
  bottom:0;
  left:0;
  width: 100%;
  height: 50vh;
  padding:2rem;
  align-items: center;
  background-color: rgb(255,255,255);
  & button {
    display: block;
    float: right;
    text-align: center;
    background-color: transparent;
    border: none;
    padding: 0.5rem;
    font-size: 1rem;
    & svg {
      margin-right: 0.5rem;
    }
  }
}

.slide-enter-active, .slide-leave-active {
  transition: margin-bottom .8s ease-out;
}

.slide-enter, .slide-leave-to {
  margin-bottom: -200px;
}

.slide-enter-to, .slide-leave {
  margin-bottom: 0px;
}

@media screen and (min-width: 487px) and (max-width: 1024px) {  
  .filter-section {
    .filter-item > .search > input {
      width: 45vw;
    }
  }
}
// Mobile Media Query
@media screen and (max-width: 486px) {  
  .filter-section {
    .filter-item {
      flex-grow: 1;
      width: 100%;
    }
    .filter-item > .search > input {
      width: calc(100% - 2rem);
    }
    .filter-item:first-of-type {
      margin-bottom: 1rem;
    }
  }
}

</style>
