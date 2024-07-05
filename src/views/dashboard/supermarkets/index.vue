<template>
  <div class="wrapper">
    <div class="page-header py-0">
      <div class="page-block">
        <div class="row align-items-center">
          <!-- <div class="col-md-12">
              <ul class="breadcrumb">
                <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                <li class="breadcrumb-item">
                  <a href="javascript: void(0)">Dashboard</a>
                </li>
                <li class="breadcrumb-item" aria-current="page">Home</li>
              </ul>
            </div> -->
          <div class="col-md-12">
            <div class="d-flex justify-content-between">
              <div class="page-header-title">
                <h3 class="mb-0">Supermarkets</h3>
              </div>

              <div class="d-flex">
                <form class="search" @submit.prevent="getSupermarket()">
                  <div class="input-group h-100">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Search"
                      v-model="search"
                    />
                    <span
                      class="input-group-text py-0 ps-0 pe-2 cursor-pointer"
                      @click.prevent="getSupermarket()"
                    >
                      <i class="ti ti-search" style="font-size: 18px"></i>
                    </span>
                  </div>
                </form>
                <button
                  class="btn btn-success py-0 ms-1 d-flex align-items-center"
                  style="height: 41px"
                  data-bs-toggle="modal"
                  data-bs-target="#addSupermarket"
                >
                  <i class="ti ti-plus"></i>
                  Supermarket
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="table-responsive table-striped" v-if="loaded">
      <table class="table" id="pc-dt-simple">
        <thead>
          <tr>
            <th>Name</th>
            <th>Owner</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            :data-index="index"
            v-for="(market, index) in markets"
            :key="index"
          >
            <td>
              {{ market.name }}
            </td>
            <td>{{ market.email }}</td>
            <td>{{ market.home_address }}</td>
            <td>{{ market.city }}</td>
            <td>{{ market.state }}</td>
            <td>
              {{ formatDate(market.createdAt) }}
            </td>
            <!-- <td>Free</td> -->
            <td>
              <router-link
                :to="`/supermarket/${market._id}`"
                class="btn button-toggler btn-primary"
              >
                View
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      id="addSupermarket"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="addSupermarketLabel"
      aria-modal="true"
      role="dialog"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addSupermarketLabel">
              Add Supermarket
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group">
                    <label for="sname">Supermarket name</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="supermarket.name"
                    />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label for="sname">Owner first name</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="supermarket.firstname"
                    />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label for="sname">Owner last name</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="supermarket.lastname"
                    />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label for="sname">Email</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="supermarket.email"
                    />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label for="sname">Phone number</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="supermarket.phone_number"
                    />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label for="sname">Address</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="supermarket.home_address"
                    />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label for="sname">State</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="supermarket.state"
                    />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label for="sname">City</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="supermarket.city"
                    />
                  </div>
                </div>
              </div>
              <button class="btn btn-primary" @click.prevent="addSupermarket()">
                Add Supermarket
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Ref, onMounted, ref } from "vue";
  import { useStore } from "vuex";
  import { formatDate } from "@/core/utils/helpers";
  import { useToast } from "vue-toast-notification";

  const store = useStore();
  const search = ref("");

  const markets: any = ref([]);
  const supermarket: any = ref({
    firstname: "lekan",
    lastname: "ojjo",
    email: "ilelaboyealekan@gmail.com",
    phone_number: "8102721331",
    pre_phone_number: "234",
    home_address: "adenike",
    city: "ikeja",
    state: "Lagos",
    name: "ShopRite",
  });

  const loaded = ref(false);

  const getSupermarket = () => {
    store.commit("setLoader", true);
    store
      .dispatch(
        "get",
        `organization/supermarket/search?limit=10&role=OWNER&search=${search.value}`
      )
      .then((resp) => {
        store.commit("setLoader", false);
        console.log(resp);
        markets.value = resp.data.data.data;
        loaded.value = true;
      });
  };

  const addSupermarket = () => {
    if (supermarket.value.firstname.length < 1) {
      useToast().error("Owner first name is required");
      return;
    }
    if (supermarket.value.lastname.length < 1) {
      useToast().error("Owner last name is required");
      return;
    }
    if (supermarket.value.email.length < 1) {
      useToast().error("Owner email is required");
      return;
    }
    if (supermarket.value.phone_number.length < 1) {
      useToast().error("Phone number is required");
      return;
    }
    if (supermarket.value.home_address.length < 1) {
      useToast().error("Address is required");
      return;
    }
    if (supermarket.value.state.length < 1) {
      useToast().error("State is required");
      return;
    }
    if (supermarket.value.city.length < 1) {
      useToast().error("City is required");
      return;
    }

    store.commit("setLoader", true);
    store
      .dispatch("post", {
        endpoint: "organization/supermarket",
        details: supermarket.value,
      })
      .then((resp) => {
        console.log(resp);
        window.location.reload();
      });
  };

  onMounted(() => {
    getSupermarket();
  });
</script>

<style scoped>
  .input-group input {
    border-right: none;
    padding: 0 5px;
  }
  .input-group-text {
    background: #ffffff;
  }
  .form-control:focus {
    border-right: none !important;
  }

  .button-toggler {
    height: 35px;
    width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
