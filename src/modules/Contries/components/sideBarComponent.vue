<template>
  <div
    class="d-none d-lg-flex flex-column flex-shrink-0 p-3 bg-secondary vh-100"
    style="width: 280px"
  >
    <router-link
      to="/CountryApp"
      class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
      previewlistener="true"
    >
      <span
        class="fs-4 mx-3 btn btn-secondary px-5 w-100 fw-bold mb-4 text-secondary py-3"
        >Logo</span
      >
    </router-link>

    <ul class="nav nav-pills fs-5 text-light flex-column mb-auto mx-3">
      <li class="nav-item">
        <router-link
          to="/CountryApp"
          class="nav-link link-light"
          :class="{ active: $route.path === '/CountryApp' }"
          exact
          aria-current="page"
          >Home</router-link
        >
      </li>
      <li>
        <router-link
          to="/CountryApp/firstview"
          class="nav-link link-light"
          :class="{ active: $route.path === '/CountryApp/firstview' }"
          >Vista 1</router-link
        >
      </li>
      <li>
        <router-link
          to="/CountryApp/secondview"
          class="nav-link link-light"
          :class="{ active: $route.path === '/CountryApp/secondview' }"
          >Vista 2</router-link
        >
      </li>
    </ul>
  </div>
  <div>
    <div class="mt-5">
      <button
        class="d-lg-none btn mt-1 p-3 btn-secondary"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebarOffcanvas"
        aria-controls="sidebarOffcanvas"
      >
        Menú
      </button>
    </div>

    <div
      id="sidebarOffcanvas"
      class="offcanvas bg-secondary offcanvas-start d-lg-none"
      tabindex="-1"
      aria-labelledby="sidebarOffcanvasLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="sidebarOffcanvasLabel">Menú</h5>

        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Cerrar"
        ></button>
      </div>

      <div class="offcanvas-body">
        <router-link
          to="/CountryApp"
          class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
          previewlistener="true"
        >
          <span
            class="fs-4 mx-3 btn btn-secondary px-5 w-100 fw-bold mb-4 text-secondary py-3"
            >Logo</span
          >
        </router-link>

        <ul class="nav nav-pills fs-5 text-light flex-column mb-auto mx-3">
          <li class="nav-item">
            <router-link
              to="/CountryApp"
              class="nav-link link-light"
              :class="{ active: $route.path === '/CountryApp' }"
              exact
              aria-current="page"
              >Home</router-link
            >
          </li>
          <li>
            <router-link
              to="/CountryApp/firstview"
              class="nav-link link-light"
              :class="{ active: $route.path === '/CountryApp/firstview' }"
              >Vista 1</router-link
            >
          </li>
          <li>
            <router-link
              to="/CountryApp/secondview"
              class="nav-link link-light"
              :class="{ active: $route.path === '/CountryApp/secondview' }"
              >Vista 2</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.btn-secondary {
  background-color: rgb(190, 190, 190);
  border: none;
}

.btn-secondary:hover {
  background-color: rgb(190, 190, 190);
  border: none;
}

.active {
  background-color: #fff !important;
  color: #646464 !important;
  font-weight: bold;
}

.active:hover {
  color: #646464 !important;
}

.active:focus {
  color: #646464 !important;
}
</style>
