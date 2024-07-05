<template>
  <div v-if="loaded">
    <div class="page-block">
      <div class="row align-items-center">
        <div class="col-md-12">
          <div class="page-header-title">
            <h2 class="mb-2">Account Profile</h2>
          </div>
        </div>
      </div>
    </div>
    <!-- [ breadcrumb ] end -->
    <!-- [ Main Content ] start -->
    <div class="row">
      <!-- [ sample-page ] start -->
      <div class="col-sm-12">
        <div class="card">
          <div class="card-body py-0">
            <ul class="nav nav-tabs profile-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <a
                  class="nav-link active"
                  id="profile-tab"
                  data-bs-toggle="tab"
                  href="#profile"
                  role="tab"
                  aria-selected="false"
                  tabindex="-1"
                >
                  <i class="ti ti-file-text me-2"></i>Supermarket Profile
                </a>
              </li>
              <li class="nav-item" role="presentation">
                <a
                  class="nav-link"
                  id="managers-tab"
                  data-bs-toggle="tab"
                  href="#managers"
                  role="tab"
                  aria-selected="false"
                  tabindex="-1"
                >
                  <i class="ti ti-users me-2"></i>Managers
                </a>
              </li>
              <li class="nav-item" role="presentation">
                <a
                  class="nav-link"
                  id="cashiers-tab"
                  data-bs-toggle="tab"
                  href="#cashiers"
                  role="tab"
                  aria-selected="false"
                  tabindex="-1"
                >
                  <i class="ti ti-settings me-2"></i>Cashier
                </a>
              </li>
              <li class="nav-item" role="presentation">
                <a
                  class="nav-link"
                  id="transactions-tab"
                  data-bs-toggle="tab"
                  href="#transactions"
                  role="tab"
                  aria-selected="false"
                  tabindex="-1"
                >
                  <i class="ti ti-settings me-2"></i>Transactions
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="tab-content">
          <div
            class="tab-pane show active"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-body position-relative">
                    <div class="text-center mt-3">
                      <hr class="my-3 border border-secondary-subtle" />
                      <div class="row g-3">
                        <div class="col-4">
                          <h5 class="mb-0">{{ kpi.orders }}</h5>
                          <small class="text-muted">Transactions</small>
                        </div>
                        <div class="col-4 border border-top-0 border-bottom-0">
                          <h5 class="mb-0">{{ kpi.manager }}</h5>
                          <small class="text-muted">Manager</small>
                        </div>
                        <div class="col-4">
                          <h5 class="mb-0">{{ kpi.staff }}</h5>
                          <small class="text-muted">Staff</small>
                        </div>
                      </div>
                      <hr class="my-3 border border-secondary-subtle" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h5>Profile</h5>
                  </div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label class="form-label"
                            >Supermarket name
                            <span class="text-danger">*</span></label
                          >
                          <input
                            type="text"
                            class="form-control"
                            v-model="kpi.supermarket.name"
                            disabled
                          />
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label class="form-label">
                            Email <span class="text-danger">*</span></label
                          >
                          <input
                            type="text"
                            class="form-control"
                            disabled
                            v-model="kpi.supermarket.email"
                          />
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label class="form-label">Owner first name</label>
                          <input
                            type="text"
                            class="form-control"
                            disabled
                            v-model="kpi.owner.firstname"
                          />
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label class="form-label">Owner last name</label>
                          <input
                            type="text"
                            class="form-control"
                            disabled
                            v-model="kpi.owner.lastname"
                          />
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label class="form-label">Phone number</label>
                          <vue-tel-input
                            v-model="phone"
                            @country-changed="countryChanged"
                            disabled
                            mode="international"
                          ></vue-tel-input>
                          <!-- <input
                            type="text"
                            class="form-control"
                            disabled
                            v-model="kpi.owner.phone_number"
                          /> -->
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label class="form-label">Address</label>
                          <input
                            type="text"
                            class="form-control"
                            disabled
                            v-model="kpi.owner.home_address"
                          />
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label class="form-label">City</label>
                          <input
                            type="text"
                            class="form-control"
                            disabled
                            v-model="kpi.owner.city"
                          />
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label class="form-label">State</label>
                          <input
                            type="text"
                            class="form-control"
                            disabled
                            v-model="kpi.owner.state"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="tab-pane"
            id="managers"
            role="tabpanel"
            aria-labelledby="managers-tab"
          >
            <manager></manager>
          </div>
          <div
            class="tab-pane"
            id="cashiers"
            role="tabpanel"
            aria-labelledby="cashiers-tab"
          >
            <cashier></cashier>
          </div>
          <div
            class="tab-pane"
            id="transactions"
            role="tabpanel"
            aria-labelledby="transactions-tab"
          >
            <transactions></transactions>
          </div>
        </div>
      </div>
      <!-- [ sample-page ] end -->
    </div>
    <!-- [ Main Content ] end -->
  </div>
</template>
<script lang="ts" setup>
  import { useStore } from "vuex";
  import { useToast } from "vue-toast-notification";
  import { useRoute } from "vue-router";
  import { onMounted, ref } from "vue";
  import manager from "@/components/supermarket/manager.vue";
  import cashier from "@/components/supermarket/cashier.vue";
  import transactions from "@/components/supermarket/transactions.vue";
  import { VueTelInput } from "vue-tel-input";
  import "vue-tel-input/vue-tel-input.css";

  const store = useStore();
  const route = useRoute();
  const kpi: any = ref({});
  const loaded = ref(false);
  const phone = ref("");
  const pre_phone_number = ref("");
  const countryChanged = (phoneObject: any) => {
    pre_phone_number.value = phoneObject.dialCode;
  };

  const getSupermarket = () => {
    store.commit("setLoader", true);
    store.dispatch("get", `supermarket/kpi/${route.params.id}`).then((resp) => {
      store.commit("setLoader", false);
      kpi.value = resp.data.data.data;

      phone.value =
        "+" +
        kpi.value.owner.pre_phone_number +
        "" +
        kpi.value.owner.phone_number;
      console.log(kpi.value);
      loaded.value = true;
    });
  };

  onMounted(() => {
    getSupermarket();
  });
</script>

<style>
  .vue-tel-input {
    height: 40px;
    border-radius: 5px;
  }
</style>
