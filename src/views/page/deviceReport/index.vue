<template>
  <div>
    {{ pageName }}
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageName: this.$t('route.' + this.$route.meta.title)
    }
  }
}
</script>
