<script>
import SideBarComponent from "@/modules/Contries/components/sideBarComponent.vue";
import PanelCountriesComponent from "@/modules/Contries/components/panelCountriesComponent.vue";
export default {
  components: {
    SideBarComponent,
    PanelCountriesComponent,
  },
};
</script>

<template>
  <main class="container-fluid">
    <div class="row">
      <div class="col-2 p-lg-0">
        <side-bar-component></side-bar-component>
      </div>

      <div class="col mx-lg-5 mx-xl-0">
        <router-view></router-view>
      </div>
    </div>
  </main>
</template>
