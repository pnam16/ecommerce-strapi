<template>
  <p class="clearfix mb-0">
    <span class="float-md-left d-block d-md-inline-block mt-25">
      <!-- COPYRIGHT  © {{ new Date().getFullYear() }} -->
      <b-link
        class="ml-25"
        href="https://1.envato.market/pixinvent_portfolio"
        target="_blank"
      />
      <span class="d-none d-sm-inline-block">Bài tập mã nguồn mở</span>
    </span>

    <span class="float-md-right d-none d-md-block"> Fashion Shop
      <feather-icon
        icon="HeartIcon"
        size="21"
        class="text-danger stroke-current"
      />
    </span>
  </p>
</template>

<script>
import { BLink } from 'bootstrap-vue'

export default {
  components: {
    BLink,
  },
}
</script>
