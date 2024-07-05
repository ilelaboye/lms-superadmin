<template>
  <div v-if="loaded" class="container-xxl flex-grow-1 container-p-y">
    <div>
      <h4 class="py-3 mb-2">
        <span class="text-muted fw-light">Teachers </span>
      </h4>
    </div>

    <div class="row">
      <div class="col-12 col-lg-8">
        <div class="card mb-4">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr class="text-primary">
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in teachers" :key="index">
                  <td>{{ item.firstname }} {{ item.lastname }}</td>
                  <td>{{ item.username }}</td>
                  <td>{{ item.email }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref, computed, onMounted, customRef } from "vue";
  import { useRouter, useRoute } from "vue-router";
  import { useStore } from "vuex";
  import { useToast } from "vue-toast-notification";
  import { formatPrice } from "@/core/utils/helpers";

  const route = useRoute();
  const router = useRouter();
  const store = useStore();
  const loaded = ref(false);

  const teachers: any = ref({});

  const getTeachers = () => {
    store.commit("setLoader", true);
    store.dispatch("get", `teachers`).then((resp) => {
      console.log(resp);
      teachers.value = resp.data;

      store.commit("setLoader", false);
      loaded.value = true;
    });
  };

  onMounted(() => {
    getTeachers();
  });
</script>

<style lang="scss" scoped>
  p {
    margin-bottom: 0;
  }
</style>
