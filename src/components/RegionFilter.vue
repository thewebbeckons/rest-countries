<template>
  <div class="region-filter">
    <button v-if="!currentRegion" @click.prevent="toggle()" id="filter-button" :class="{ active: showList }">
      Filter by Region <font-awesome-icon :icon="['fas', 'chevron-down']" />
    </button>
    <button v-else @click="removeFilter()">
      Showing {{ currentRegion }} <font-awesome-icon :icon="['fas', 'times']" />
    </button>
    <transition name="slide">
      <ul v-show="showList"  id="region-list">
        <li 
          v-for="region in regions" 
          :id="region" 
          :key="region"
          @click="filterRegion(region)"
        >
          {{ region }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'RegionFilter',
  props: {
    regions: Array,
  },
  data () {
    return {
      showList: false,
      currentRegion: null
    }
  },
  mounted () {
    this.setWidth()
  },
  methods: {
    setWidth () {
      const el = document.getElementById('filter-button')
      let width = el.offsetWidth
      document.getElementById('region-list').style.width = `${width}px`
    },
    toggle () {
      this.showList = !this.showList
    },    
    filterRegion (region) {
      this.$emit('filter-region', region)
      this.currentRegion = region      
      this.showList = !this.showList
    },
    removeFilter () {
      this.$emit('remove-filter')
      this.currentRegion = null
    }
  }
}
</script>

<style lang="scss">
.region-filter {
  margin:0;
  padding: 0;
  width: 180px;
  button {
    padding: 1rem 0;
    border: none;
    font-size: 1rem;
    width: 100%;
    font-family: $font;
    font-weight: 600;
    border-radius: $radius;      
    box-shadow: $box-shadow;
    background-color: $light-elements;
    cursor: pointer;
    :focus {
      border: none;
    }
    &.active > svg {
      transform: rotateX(180deg);
    }
    svg {
      margin-left: 0.5rem;
      font-size: 0.8rem;
      transition: transform 0.25s ease;
    }
  }
  ul {
    list-style-type: none;
    position: absolute;
    margin-top: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: $light-elements;
    font-family: $font;
    border-radius: $radius;
    font-weight: 600;
    transition: all 0.25s ease;          
    box-shadow: $box-shadow;
    cursor: pointer;
    z-index:1;
    li {
      padding: 0.5rem 0;
    }
  }
}
// Transition Animation
.slide-enter-active {
  transition: all .3s ease;
}
.slide-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-enter, .slide-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}
</style>