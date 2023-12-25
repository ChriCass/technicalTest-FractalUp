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
      allCountries: [],
      countries: [],
      search: "",
      selectedCountry: null,
      cityImage: null,
      continents: [],
      showContinentModal: false,
    };
  },

  computed: {
    filteredCountries() {
      if (this.search) {
        return this.allCountries.filter((country) =>
          country.name.toLowerCase().includes(this.search.toLowerCase())
        );
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

      this.allCountries = response.data.countries;
      this.countries = this.getRandomCountries(this.allCountries, 9);

      for (let i = 0; i < this.countries.length; i++) {
        const country = this.countries[i];
        const cityImageResponse = await fetch(
          `https://api.unsplash.com/search/photos?query=${country.capital}&client_id=PkZn_YEbU7Cp1dyO_j9onc2CxgyVPifH_FlOODwUmUs`
        );
        const cityImageData = await cityImageResponse.json();
        this.countries[i] = {
          ...country,
          cityImage: cityImageData.results[0].urls.small,
        };
      }

      // Agrega este bloque de código para obtener los continentes
      const continentResponse = await apolloClient.query({
        query: gql`
          {
            continents {
              code
              name
            }
          }
        `,
      });

      this.continents = continentResponse.data.continents;
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  },
  methods: {
    getRandomCountries(countries, count) {
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

    filterByContinent(continent) {
      this.countries = this.allCountries.filter(
        (country) => country.continent.name === continent.name
      );
      this.showContinentModal = false;
    },
  },
};
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-8">
        <form action="" class="search d-flex flex-column">
          <span class="mx-3 text-seconary">Pais</span>
          <input
            type="search"
            @click="showContinentModal = true"
            placeholder="Escribe el pais que deseas ver"
            class="search_input"
            v-model="search"
          />
          <div class="search_boton">
            <i class="ri-search-2-line search_icon"></i>
          </div>
        </form>
        <div
          v-if="showContinentModal"
          class="modal"
          style="display: block"
        >
          <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
          >
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title text-secondary">Filtrar por continente</h5>
                <h5 @click="showContinentModal = false" class="modal-title  text-info">Limpiar</h5>
             
              </div>
              <div class="modal-body">
                <div
                  class="card"
                  v-for="continent in continents"
                  :key="continent.code"
                >
                  <div class="card-body">
                    <h5 class="card-title">{{ continent.name }}</h5>
                    <button
                      class="btn btn-primary"
                      @click="filterByContinent(continent)"
                    >
                      Seleccionar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 mt-5 row justify-content-center">
        <div
          v-for="country in filteredCountries"
          :key="country.code"
          class="card p-0 mx-3 shadow my-3"
          :class="{
            'bg-info': selectedCountry && selectedCountry.code === country.code,
          }"
          style="width: 20rem"
          @click="selectCountry(country)"
        >
          <img class="card-img-top img-fluid" :src="country.cityImage" />
          <div class="card-body d-flex">
            <img
              :src="'https://flagsapi.com/' + country.code + '/flat/64.png'"
            />
            <div class="mx-3 d-flex flex-column justify-content-center">
              <h5
                class="card-title m-0 fw-bold"
                :class="{
                  'text-light':
                    selectedCountry && selectedCountry.code === country.code,
                  'text-info':
                    !selectedCountry || selectedCountry.code !== country.code,
                }"
              >
                {{ country.name }}
              </h5>
              <p
                class="text-light fw-bold"
                v-if="selectedCountry && selectedCountry.code === country.code"
              >
                {{ country.continent.name }}
              </p>
              <p v-else>{{ country.continent.name }}</p>
            </div>
          </div>
        </div>

        <div class="col-10">
          <div
            v-if="search && filteredCountries.length === 0"
            class="alert alert-warning"
            role="alert"
          >
            No se encontró ningún país con el nombre "{{ search }}".
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="selectedCountry"
      class="modal d-flex align-items-center justify-content-center"
      style="display: block"
    >
      <div class="modal-dialog country-modal-dialog">
        <div class="modal-content">
          <div class="d-flex justify-content-center">
            <div class="d-flex justify-content-center rounded">
              <img class="img-my-modal" :src="selectedCountry.cityImage" />
              <div>
                <button
                  type="button"
                  class="close btn btn-close my-4 mx-4"
                  @click="selectedCountry = null"
                >
                  
                </button>
              </div>
            </div>
          </div>

          <div class="modal-header mx-5">
            <div class="d-flex">
              <img
                :src="
                  'https://flagsapi.com/' +
                  selectedCountry.code +
                  '/flat/64.png'
                "
                class="me-3"
              />
              <div class="d-flex flex-column">
                <h5 class="modal-title text-info fw-bold">
                  {{ selectedCountry.name }}
                </h5>
                <p>{{ selectedCountry.continent.name }}</p>
              </div>
            </div>
          </div>
          <div class="modal-body mx-5">
            <p>
              <span class="text-info fw-bold">Continente:</span>
              {{ selectedCountry.continent.name }}
            </p>
            <p>
              <span class="text-info fw-bold">Capital:</span>
              {{ selectedCountry.capital }}
            </p>
            <p>
              <span class="text-info fw-bold">Lenguaje:</span>
              {{ selectedCountry.languages[0].name }}
            </p>
            <p>
              <span class="text-info fw-bold">Población:</span>
              {{ selectedCountry.population }}
            </p>
            <p>
              <span class="text-info fw-bold">Moneda:</span>
              {{ selectedCountry.currency }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@media (min-width: 992px) {
  .country-modal-dialog {
    position: fixed;
    bottom: 0;
    right: 0;
    margin-right: 1rem;
    margin-bottom: 1rem;
    width: 400px;
    max-height: calc(100% - 1rem);
  }
}

.modal-header {
  border-bottom: none;
}
.modal-content {
  border: none !important;
  border-radius: 0%;
}
.img-my-modal {
  max-width: 80%;
  width: 400px;
  max-height: 300px;
  height: auto;
  padding: 20px;
  border-radius: 30px;
  display: block;
  margin: auto;
  object-fit: cover;
}

.close {
  position: absolute;
  right: -8px;
  top: 10px;
}

.card-img-top {
  height: 200px;
  object-fit: cover;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding: 0;
}
.card {
  border-radius: 30px;
  cursor: pointer;
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

.text-info {
  color: #0d89fd !important;
}

.bg-info {
  background-color: #0d89fd !important;
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
