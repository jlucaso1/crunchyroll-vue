<template>
  <div class="container">
    <slot />
  </div>
</template>

<style lang="scss">
.container,
.container-sm,
.container-md,
.container-lg,
.container-xl {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
}

@media (min-width: $breakpoint-xs-min) {
  .container,
  .container-sm {
    max-width: 640px;
  }
}

@media (min-width: $breakpoint-sm-min) {
  .container,
  .container-sm,
  .container-md {
    padding: 0 2rem;
    max-width: 920px;
  }
}

@media (min-width: $breakpoint-md-min) {
  .container,
  .container-sm,
  .container-md,
  .container-lg {
    max-width: 1140px;
  }
}

@media (min-width: $breakpoint-lg-min) {
  .container,
  .container-sm,
  .container-md,
  .container-lg,
  .container-xl {
    max-width: 1440px;
  }
}
</style>
