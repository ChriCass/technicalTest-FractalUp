<script>
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client/core";
import { gql } from "graphql-tag";

const httpLink = createHttpLink({
  uri: "https://countries.trevorblades.com/",
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default {
  data() {
    return {
      countries: [],
      search: '',
      selectedCountry: null,
    };
  },
  computed: {
    filteredCountries() {
      if (this.search) {
        return this.countries.filter(country => country.name.toLowerCase().includes(this.search.toLowerCase()));
      } else {
        return this.countries;
      }
    },
  },
  async mounted() {
    try {
      const response = await apolloClient.query({
        query: gql`
          {
            countries {
              code
              name
              continent {
                name
              }
              capital
              languages {
                name
              }
              currency
            }
          }
        `,
      });

      const allCountries = response.data.countries;
      this.countries = this.getRandomCountries(allCountries, 14);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  },
  methods: {
    getRandomCountries(countries, count) {
      // Crear una copia de la lista de países para no modificar la original
      const tempCountries = [...countries];
      const selectedCountries = [];

      for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * tempCountries.length);
        selectedCountries.push(tempCountries[randomIndex]);
        tempCountries.splice(randomIndex, 1);
      }

      return selectedCountries;
    },
    selectCountry(country) {
      this.selectedCountry = country;
    },
  },
};
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-10">
        <form action="" class="search d-flex flex-column">
          <span class="mx-3 text-seconary">Pais</span>
          <input
            type="search"
            placeholder="Escribe el pais que deseas ver"
            class="search_input"
            v-model="search"
          />
          <div class="search_boton">
            <i class="ri-search-2-line search_icon"></i>
          </div>
        </form>
      </div>
      <div class="col-12 mt-5 row  justify-content-center">
        <div
          v-for="country in filteredCountries"
          :key="country.code"
          class="card mx-3 shadow my-3"
          style="width: 18rem"
          @click="selectCountry(country)"
        >
          <div class="card-body d-flex">
            <img :src="'https://flagsapi.com/' + country.code + '/flat/64.png'">
            <div class="mx-3 d-flex flex-column justify-content-center">
              <h5 class="card-title text-info ">{{ country.name }}</h5>
              <p>{{ country.continent.name }}</p>
            </div>
          </div>
        </div>
        <div v-if="search && filteredCountries.length === 0" class="alert alert-warning" role="alert">
          No se encontró ningún país con el nombre "{{ search }}".
        </div>
      </div>
    </div>
    <div v-if="selectedCountry" class="modal" style="display: block;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ selectedCountry.name }}</h5>
            <button type="button" class="close" @click="selectedCountry = null">
              <span>×</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Continente: {{ selectedCountry.continent.name }}</p>
            <p>Capital: {{ selectedCountry.capital }}</p>
            <p>Lenguaje: {{ selectedCountry.languages[0].name }}</p>
            <p>Población: {{ selectedCountry.population }}</p>
            <p>Moneda: {{ selectedCountry.currency }}</p>
            <p>Región: {{ selectedCountry.region }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>

.card{
  border-radius: 30px;
}
.search {
  position: relative;
  width: 100%;
  height: 66px;
  background-color: #fff;
  box-shadow: 0 4px 24px hsla(222, 68%, 12%, 0.1);
  border-radius: 4rem;
  padding: 10px;
  overflow: hidden;
  transition: width 0.5s cubic-bezier(0.9, 0, 0.3, 0.9);
}

.text-info{
  color: #0d89fd !important;
}

.search_input {
  border: none;
  outline: none;
  width: calc(100% - 64px);
  height: 100%;
  border-radius: 4rem;
  padding-left: 14px;
  font-family: "Poppins", sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  transition: opacity 1.5s;
}

.search_input :-webkit-autofill {
  box-shadow: 0 0 0 100px #fff inset;
}

.search_boton {
  width: 35px;
  height: 35px;
  background-color: #0d89fd;
  border-radius: 50%;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 10px;
  margin: auto;
  display: grid;
  place-items: center;
  cursor: pointer;
}

.search_icon,
.search_close {
  color: #fff;
  font-size: 1.3rem;
  position: absolute;
}
</style>
