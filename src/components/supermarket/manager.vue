<template>
  <div class="card">
    <div class="card-body table-card">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <h6 class="mb-0">Managers</h6>
        <button
          class="btn btn-primary py-2"
          data-bs-toggle="modal"
          data-bs-target="#addManager"
        >
          Add Manager
        </button>
      </div>
      <div class="table-responsive">
        <table class="table mb-0">
          <thead>
            <tr>
              <th>NAME</th>
              <th>PHONE NUMBER</th>
              <th>CITY</th>
            </tr>
          </thead>
          <tbody v-if="managers.length > 0">
            <tr v-for="(item, index) in managers" :key="index">
              <td>
                <div class="row">
                  <div class="col">
                    <h5 class="mb-0">
                      {{ item.firstname }} {{ item.lastname }}
                    </h5>
                    <p class="text-muted f-12 mb-0">{{ item.email }}</p>
                  </div>
                </div>
              </td>
              <td>+{{ item.pre_phone_number }}{{ item.phone_number }}</td>
              <td>{{ item.home_address }} {{ item.city }}</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="3">
                <p class="alert alert-primary">No manager added</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div
    id="addManager"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="addManagerLabel"
    aria-modal="true"
    role="dialog"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addManagerLabel">Add Manager</h5>
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
                  <label for="sname">First name</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="manager.firstname"
                  />
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="sname">Last name</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="manager.lastname"
                  />
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="sname">Email</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="manager.email"
                  />
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="sname">Phone number</label>
                  <vue-tel-input
                    v-model="manager.phone_number"
                    @country-changed="countryChanged"
                    mode="international"
                  ></vue-tel-input>
                  <!-- <input
                    type="text"
                    class="form-control"
                    v-model="manager.phone_number"
                  /> -->
                </div>
              </div>
              <div class="col-12">
                <div class="form-group">
                  <label for="sname">Address</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="manager.home_address"
                  />
                </div>
              </div>
              <!-- <div class="col-sm-6">
                <div class="form-group">
                  <label for="sname">Password</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="manager.password"
                  />
                </div>
              </div> -->
            </div>
            <button class="btn btn-primary" @click.prevent="addManager()">
              Add Supermarket
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from "vue";
  import { useRoute } from "vue-router";
  import { useToast } from "vue-toast-notification";
  import { useStore } from "vuex";
  import { VueTelInput } from "vue-tel-input";
  import "vue-tel-input/vue-tel-input.css";

  const store = useStore();
  const route = useRoute();
  const manager: any = ref({
    firstname: "",
    lastname: "",
    email: "",
    phone_number: "",
    pre_phone_number: "",
    home_address: "",
    city: "",
    password: "",
    supermarket_id: "",
  });
  const managers: any = ref([]);
  const phone = ref("");
  const pre_phone_number = ref("");
  const countryChanged = (phoneObject: any) => {
    manager.value.pre_phone_number = phoneObject.dialCode;
  };

  const addManager = () => {
    if (manager.value.firstname.length < 1) {
      useToast().error("First name is required");
      return;
    }
    if (manager.value.lastname.length < 1) {
      useToast().error("Last name is required");
      return;
    }
    if (manager.value.email.length < 1) {
      useToast().error("Email is required");
      return;
    }
    if (manager.value.phone_number.length < 1) {
      useToast().error("Phone number is required");
      return;
    }
    if (manager.value.home_address.length < 1) {
      useToast().error("Address is required");
      return;
    }
    // if (manager.value.password.length < 1) {
    //   useToast().error("Password is required");
    //   return;
    // }

    var rep = manager.value.phone_number.replace(
      `+${manager.value.pre_phone_number}`,
      ""
    );

    rep = rep.replaceAll(" ", "");

    manager.value.supermarket_id = route.params.id;

    store.commit("setLoader", true);
    store
      .dispatch("post", {
        endpoint: "organization",
        details: { ...manager.value, phone_number: rep },
      })
      .then((resp) => {
        store.commit("setLoader", false);
        useToast().success("Manager added successfully");
        window.setTimeout(() => {
          window.location.reload();
        }, 1200);
      });
  };

  const getSupermarketManagers = () => {
    store.commit("setLoader", true);
    store
      .dispatch("get", `supermarket/managers/${route.params.id}`)
      .then((resp) => {
        store.commit("setLoader", false);
        managers.value = resp.data.data.data;
      });
  };

  onMounted(() => {
    getSupermarketManagers();
  });
</script>
