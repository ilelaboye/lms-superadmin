<template>
  <div class="row" v-if="loaded">
    <div class="col-lg-3 col-md-6">
      <div class="card">
        <div class="card-body">
          <div class="row align-items-center">
            <div class="col-8">
              <h3 class="mb-1">{{ kpi.students }}</h3>
              <p class="text-muted mb-0">Students</p>
            </div>
            <div class="col-4 text-end">
              <i class="ti ti-chart-bar text-secondary f-36"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-3 col-md-6">
      <div class="card">
        <div class="card-body">
          <div class="row align-items-center">
            <div class="col-8">
              <h3 class="mb-1">{{ kpi.teachers }}</h3>
              <p class="text-muted mb-0">Teacher</p>
            </div>
            <div class="col-4 text-end">
              <i class="ti ti-calendar-event text-danger f-36"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="col-lg-3 col-md-6">
      <div class="card">
        <div class="card-body">
          <div class="row align-items-center">
            <div class="col-8">
              <h3 class="mb-1">0</h3>
              <p class="text-muted mb-0">Cars</p>
            </div>
            <div class="col-4 text-end">
              <i class="ti ti-file-text text-success f-36"></i>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <div class="col-lg-3 col-md-6">
      <div class="card">
        <div class="card-body">
          <div class="row align-items-center">
            <div class="col-8">
              <h3 class="mb-1">{{ kpi.courses }}</h3>
              <p class="text-muted mb-0">Courses</p>
            </div>
            <div class="col-4 text-end">
              <i class="ti ti-download text-primary f-36"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { Ref, onMounted, reactive, ref } from "vue";
  import { useStore } from "vuex";
  // import { IKpi } from "@/core/model";

  const store = useStore();
  const kpi: any = ref({});
  const loaded = ref(true);

  const getKpi = async () => {
    await store.dispatch("get", "kpi").then((resp) => {
      kpi.value = resp.data;
      console.log(resp);
      loaded.value = true;
    });
  };

  onMounted(() => {
    getKpi();
  });
</script>
