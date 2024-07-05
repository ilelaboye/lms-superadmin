<template>
  <div>
    <loader v-if="loading"></loader>
    <Sidebar> </Sidebar>
    <Header></Header>
    <div class="pc-container">
      <div class="pc-content">
        <router-view></router-view>
      </div>
    </div>

    <!-- [ Main Content ] end -->
  </div>
</template>

<script lang="ts" setup>
  import Sidebar from "@/components/sidebar.vue";
  import Header from "@/components/header.vue";
  import loader from "@/components/loader.vue";
  import { useStore } from "vuex";
  import { computed } from "vue";

  const store = useStore();

  store.commit("getUser");

  const loading = computed(() => {
    return store.state.loader;
  });
</script>
