<template>
  <div class="card">
    <div class="card-body table-card">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <h6 class="mb-0">Cashiers</h6>
        <button
          class="btn btn-primary py-2"
          data-bs-toggle="modal"
          data-bs-target="#addCashier"
        >
          Add Cashier
        </button>
      </div>
      <div class="table-responsive">
        <table class="table mb-0">
          <thead>
            <tr>
              <th>MEMBER</th>
              <th>PHONE NUMBER</th>
              <th>LOCATION</th>
            </tr>
          </thead>
          <tbody v-if="cashiers.length > 0">
            <tr v-for="(item, index) in cashiers" :key="index">
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
              <td>{{ item.phone_number }}</td>
              <td>{{ item.home_address }} {{ item.city }}</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="3">
                <p class="alert alert-primary">No cashier available</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <!--add cashier modal-->
  <div
    id="addCashier"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="addCashierLabel"
    aria-modal="true"
    role="dialog"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addCashierLabel">Add Cashier</h5>
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
                  <label for="name">First name</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="cashier.firstname"
                  />
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="name">Last name</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="cashier.lastname"
                  />
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="email">Email</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="cashier.email"
                  />
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="phone_number">Phone number</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="cashier.phone_number"
                  />
                </div>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <label for="Address">City</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="cashier.city"
                  />
                </div>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <label for="Address">Address</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="cashier.home_address"
                  />
                </div>
              </div>

              <!-- <div class="col-sm-6">
                <div class="form-group">
                  <label for="password">Password</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="cashier.password"
                  />
                </div>
              </div> -->
            </div>
            <button class="btn btn-primary" @click.prevent="addCashier()">
              Add Cashier
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import { useRoute } from "vue-router";
  import { useToast } from "vue-toast-notification";
  import { useStore } from "vuex";

  const store = useStore();
  const route = useRoute();

  const cashier: any = ref({
    firstname: "",
    lastname: "",
    email: "",
    phone_number: "",
    home_address: "",
    city: "",
    pre_phone_number: 234,
  });
  const cashiers: any = ref([]);
  const pre_phone_number = ref("");
  const countryChanged = (phoneObject: any) => {
    cashier.value.pre_phone_number = phoneObject.dialCode;
  };

  const addCashier = () => {
    if (cashier.value.firstname.length < 1) {
      useToast().error("First name is required");
      return;
    }
    if (cashier.value.lastname.length < 1) {
      useToast().error("Last name is required");
      return;
    }
    if (cashier.value.email.length < 1) {
      useToast().error("Email is required");
      return;
    }
    if (cashier.value.phone_number.length < 1) {
      useToast().error("Phone number is required");
      return;
    }
    if (cashier.value.home_address.length < 1) {
      useToast().error("Address is required");
      return;
    }
    if (cashier.value.city.length < 1) {
      useToast().error("City is required ");
      return;
    }

    cashier.value.supermarket_id = route.params.id;

    var rep = cashier.value.phone_number.replace(
      `+${cashier.value.pre_phone_number}`,
      ""
    );

    rep = rep.replaceAll(" ", "");

    store.commit("setLoader", true);
    store
      .dispatch("post", {
        endpoint: "organization/staff",
        details: cashier.value,
      })
      .then((resp) => {
        store.commit("setLoader", false);
        useToast().success("Cashier added successfully");
        window.setTimeout(() => {
          window.location.reload();
        }, 1200);
      });
  };

  const getSupermarketCashiers = () => {
    store.commit("setLoader", true);
    store
      .dispatch("get", `supermarket/staffs/${route.params.id}`)
      .then((resp) => {
        store.commit("setLoader", false);
        console.log(resp);
        cashiers.value = resp.data.data.data;
      });
  };

  onMounted(() => {
    getSupermarketCashiers();
  });
</script>
