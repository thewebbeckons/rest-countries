<template>
  <div>
    <button @click="$router.push({path: '/'})" @keyup.enter="$router.push({path: '/'})">
      <font-awesome-icon :icon="['fas', 'arrow-left']" size="xs" />
      Back
    </button>
    <div v-if="country" class="country">
      <div class="col country-flag">
        <img  :src="country.flag" :alt="country.name">        
      </div>
      <div class="col country-info">
        <h1 class="country-info-title">{{ country.name }}</h1>
        <div class="country-info-meta">
          <ul>
            <li><b>Native Name:</b> {{ country.nativeName }}</li>
            <li><b>Population:</b> {{ country.population | currency }}</li>
            <li><b>Region:</b> {{ country.region }}</li>
            <li><b>Sub Region:</b> {{ country.subregion }}</li>
            <li><b>Capital:</b> {{ country.capital }}</li>            
          </ul>
          <ul>
            <li><b>Top Level Domain:</b> {{ country.topLevelDomain[0] }}</li>
            <li><b>Currencies:</b> <span v-for="currency in country.currencies" :key="currency.code">{{ currency.name }}</span></li>
            <li><b>Languages:</b> <span v-for="language in country.languages" :key="language.name">{{ language.name }}</span></li>
          </ul>
        </div>
        <div v-if="borders" class="country-info-borders">
          <h2>Border Countries:</h2>
          <div class="list">
            <span v-for="border in borders" :key="border.name">{{border.name}}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="loading">
      <font-awesome-icon  :icon="['fas', 'spinner']" spin size="3x" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Country',
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
  data () {
    return {
      country: null,
      borders: null      
    }
  },
  async created () {
    // get single country data
    const country = await axios.get(`https://restcountries.com/v3.1/alpha/${this.$route.params.country}`)
      .then(response => this.country = response.data)
    // store bordering countries
    const borders = country.borders
    // if we have bordering countries get them!
    if (borders.length > 0) {
      await axios.get(`https://restcountries.com/v3.1/alpha/?codes=${borders.join(";")}&fields=name`)
      .then(response => this.borders = response.data)
    }    
  }
}
</script>

<style lang="scss">
button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 3rem;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-family: $font;
  font-weight: 600;
  border-radius: $radius;      
  box-shadow: $box-shadow;
  background-color: $light-elements;
  svg {
    margin-right: 0.5rem;
  }
}
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}
.country {
  margin-top: 5rem;
  margin-bottom: 5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 8rem;
  &-flag {
    width: 100%;
    > img {
      object-fit: contain;
      width: 100%;
    }
  }
  &-info {
    &-title {
      margin: 1.5rem 0;
    }
    &-meta {
      display: grid;
      grid-template-columns: auto auto;
      ul {
        list-style-type: none;
        font-size: $detail-size;
        margin-bottom: 1.5rem;
        li {
          padding-bottom: 0.5rem;
          & span {
            background-color: transparent;
          }
          & span::after {
            content: ', ';
          }
          & span:last-of-type::after {
            content: '';
          }
        }
        
        
      }      
    }
    &-borders {
      h2 {
        margin-bottom: 1rem;
      }
      .list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-start;
        span {
          padding: 0.5rem 0.7rem;
          margin-right: 0.5rem;
          margin-bottom: 0.7rem;
          align-self: center;
          box-shadow: $box-shadow;
          background-color: $light-elements;
          border-radius: $radius;
        }
      }
    }
  }
}
// Tablet Media Query
@media screen and (max-width: 1440px) {
  
}
@media screen and (min-width: 487px) and (max-width: 1024px) {
  .country {
    column-gap: 3rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    &-info-title {
      margin: 1rem 0;
    }
    &-info-meta {
      display: block;
    }
  }
}
// Mobile Media Query
@media screen and (max-width: 486px) {
  .country {
    margin-top: 2rem;
    margin-bottom: 2rem;
    display: block;
    &-info-meta {
      display: block;
    }    
  }
}
</style>
