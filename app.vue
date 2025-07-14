<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
/* Slide-up transition */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s ease-in-out;
  /* position: absolute; */
  /* width: 100%; */
}

.slide-up-enter-from {
  transform: translateY(10%);
  opacity: 0;
  scale: 0.95;
}
.slide-up-leave-to {
  transform: translateY(-10%);
  opacity: 0;
  scale: 0.95;
}
</style>
<script setup></script>
