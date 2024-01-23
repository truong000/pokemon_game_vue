<script setup lang="ts">
/**
 * Layout: use for pages're logged
 */
</script>

<template>
  <div class="basic-layout">
    <header>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

      <div class="wrapper">
        <div>Basic layout</div>

        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
      </div>
    </header>
    <div class="layout-root">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './styles.scss';
</style>
