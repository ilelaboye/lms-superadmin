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
                <h3 class="mb-0">Users</h3>
              </div>
              <form class="search" @submit.prevent="getUsers()">
                <div class="input-group h-100">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search"
                    v-model="search"
                  />
                  <span
                    class="input-group-text py-0 ps-0 pe-2 cursor-pointer"
                    @click.prevent="getUsers()"
                  >
                    <i class="ti ti-search" style="font-size: 18px"></i>
                  </span>
                </div>
              </form>
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
            <th>Phone</th>
            <th>Address</th>
            <th>Date</th>
            <!-- <th></th> -->
          </tr>
        </thead>
        <tbody>
          <tr :data-index="index" v-for="(user, index) in users" :key="index">
            <td>
              <div class="row align-items-center">
                <div class="col">
                  <h6 class="mb-2">
                    <span class="text-truncate w-100"
                      >{{ user.fullname }}
                    </span>
                  </h6>
                  <p class="text-muted f-12 mb-0">
                    <span class="text-truncate w-100">{{ user.email }} </span>
                  </p>
                </div>
              </div>
            </td>
            <td>{{ user.phone }}</td>
            <td>{{ user.home_address }} {{ user.city }}</td>

            <td>
              {{ formatDate(user.createdAt) }}
            </td>
            <!-- <td>
              <button
                v-if="!showMenu"
                type="button"
                class="btn button-toggler btn-primary"
                @click.prevent="setUser(user)"
              >
                View
              </button>
            </td> -->
          </tr>
          <!-- <tr v-for="(user, index) in users" :key="index">
            <td>{{ user.first_name }} {{ user.last_name }}</td>
            <td>Kola agbado, Lagos</td>
            <td>08123456789</td>
            <td>Toyota corolla</td>
          </tr> -->
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Ref, onMounted, ref } from "vue";
  import { useStore } from "vuex";
  import { IUser } from "@/core/model";
  import { formatDate } from "@/core/utils/helpers";

  const store = useStore();
  const showMenu = ref(false);

  const toggleClose = () => {
    showMenu.value = !showMenu.value;
  };

  const toggleOpen = () => {
    showMenu.value = !showMenu.value;
  };

  const setUser = (item: IUser) => {
    user.value = item;
    toggleOpen();
    console.log(user.value);
  };

  const users: any = ref([]);
  const user: any = ref(null);
  const search: any = ref("");

  const loaded = ref(false);
  const getUsers = async () => {
    store.commit("setLoader", true);
    await store
      .dispatch("get", `supermarket/allUser?search=${search.value}`)
      .then((resp) => {
        store.commit("setLoader", false);
        users.value = resp.data.data.data;
        loaded.value = true;
        console.log(users.value);
      })
      .catch(() => {
        store.commit("setLoader", false);
      });
  };

  onMounted(() => {
    getUsers();
  });
</script>

<style scoped>
  .backdrop {
    backdrop-filter: blur(8px);
    background-color: rgba(138, 138, 180, 0.336);
    min-height: 100vh;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
  }
  .view-details {
    min-height: 100vh;
    width: 620px;
    overflow-y: scroll;
    position: fixed;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: white;
    z-index: 9999;
    padding: 30px;
  }
  .input-group input {
    border-right: none;
    padding: 8px 5px;
  }
  .input-group-text {
    background: #ffffff;
  }
  .form-control:focus {
    border-right: none !important;
  }
</style>
