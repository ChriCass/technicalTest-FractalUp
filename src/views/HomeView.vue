<script>
export default{
  methods:{
    goToContryApp(){
      this.$router.push('/CountryApp')
    }
  }
}
</script>




<template>
  <div class=" d-flex flex-column align-items-center justify-content-center bg vh-100">
    <div class="text-center">
      <img alt="Vue logo" src="@/assets/img/logo.png" />
    </div>

    <div class="">
      <h1 class="text-light mx-4 text-center">Welcome to my technical challenge for FractalUp!</h1>
    </div>
    <div class="d-flex">
      <div class="mt-3">
      <button @click="goToContryApp" class="btn btn-dark " href="#" role="button">Let's get started!</button>
    </div>

    </div>

  </div>
</template>


<style lang="scss" scoped>
.bg {
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.486)),
    url(../assets/img/wallpaper.jpg);
  background-size: cover;
  background-repeat: no-repeat;
}

.btn-dark {
  background-color: #010103;
  border: 2px solid #1d6042;
  border-radius: 0.3rem;
  padding: 1rem 3rem;
  transition: all 0.3s;
  text-transform: capitalize;
}

.btn-dark:hover {
  background-color: #fff;
  color: #010103;
}

</style>