<template>
  <div>
    <div class="auth-main">
      <div class="auth-wrapper v1">
        <div class="auth-form text-center">
          <!-- <img src="@/assets/images/logo.svg" alt="img" /> -->
          <div class="card my-5">
            <div class="card-body my-2">
              <h2 class="text-center f-w-700 mb-4">Welcome</h2>
              <div class="form-group">
                <div>
                  <input
                    v-model="username"
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    placeholder="Username"
                  />
                </div>
                <div
                  v-if="errors.username"
                  class="error text-danger text-start mb-3 ms-2"
                  style="font-size: 11px"
                >
                  {{ eMsg.username }}
                </div>
              </div>
              <div class="form-group">
                <div>
                  <input
                    v-model="password"
                    type="password"
                    class="form-control"
                    id="floatingInput1"
                    placeholder="Password"
                  />
                </div>
                <div
                  v-if="errors.password"
                  class="error text-danger text-start mb-3 ms-2"
                  style="font-size: 11px"
                >
                  {{ eMsg.password }}
                </div>
              </div>
              <div
                class="d-flex mt-1 justify-content-between align-items-center"
              >
                <div class="form-check">
                  <input
                    class="form-check-input input-primary"
                    type="checkbox"
                    id="customCheckc1"
                    checked
                  />
                  <label class="form-check-label text-muted" for="customCheckc1"
                    >Remember me?</label
                  >
                </div>
                <RouterLink :to="{ name: 'Fpassword' }">
                  <h6 class="text-primary f-w-400 mb-0">Forgot Password?</h6>
                </RouterLink>
              </div>
              <div class="d-grid mt-4">
                <button
                  @click.prevent="login()"
                  type="button"
                  class="btn btn-primary fs-5"
                  :disabled="loading"
                >
                  <span v-if="loading">Loading...</span>
                  <span v-else>Login</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import { useToast } from "vue-toast-notification";
  import { useStore } from "vuex";

  const $toast = useToast();
  const store = useStore();

  const username = ref("admin");
  const password = ref("123456");
  const loading = ref(false);
  const errors = ref({
    username: false,
    password: false,
  });
  const eMsg = ref({
    username: "This field is required",
    password: "This field is required",
  });

  const login = async () => {
    console.log("Login");
    if (username.value.length < 2) {
      errors.value.username = true;
    } else {
      errors.value.username = false;
    }

    if (password.value == "") {
      errors.value.password = true;
      return;
    } else {
      errors.value.password = false;
    }

    loading.value = true;
    console.log("this is loading");

    store
      .dispatch("post", {
        endpoint: "login",
        details: {
          username: username.value,
          password: password.value,
        },
      })
      .then((resp) => {
        console.log(resp);
        loading.value = false;

        store.commit("setUser", resp.data);
        // console.log(store.state.user);
        // console.log(store.state.token);
        window.location.href = "/dashboard";
      })
      .catch((err) => {
        loading.value = false;
      });
  };
</script>
