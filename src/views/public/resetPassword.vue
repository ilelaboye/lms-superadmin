<template>
  <div class="auth-main">
    <div class="auth-wrapper v1">
      <div class="auth-form">
        <div class="text-center">
          <img src="@/assets/images/logo.svg" alt="img" />
        </div>
        <div class="card my-5">
          <div class="card-body my-2">
            <div class="mb-4 text-center">
              <h4 class="mb-1"><b>Reset Password</b></h4>
              <p class="text-muted">Please choose your new password</p>
            </div>
            <div class="form-group mb-3">
              <label class="form-label">Password</label>
              <input
                v-model="password"
                type="password"
                class="form-control"
                id="floatingInput"
                placeholder="Password"
              />
              <div
                v-if="errors.password"
                class="error text-danger text-start mb-3 ms-2"
                style="font-size: 11px"
              >
                {{ eMsg.password }}
              </div>
            </div>
            <div class="form-group mb-3">
              <label class="form-label">Confirm Password</label>
              <input
                v-model="cpassword"
                type="password"
                class="form-control"
                id="floatingInput1"
                placeholder="Confirm Password"
              />
              <div
                v-if="errors.cpassword"
                class="error text-danger text-start mb-3 ms-2"
                style="font-size: 11px"
              >
                {{ eMsg.cpassword }}
              </div>
            </div>
            <div class="d-grid mt-4">
              <button
                type="button"
                @click.prevent="save()"
                class="btn btn-primary fs-5"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const password = ref("");
const cpassword = ref("");

const errors = ref({
  password: false,
  cpassword: false,
});

const eMsg = ref({
  password: "This field is required",
  cpassword: "This field is required",
});

const save = () => {
  if (password.value == "") {
    errors.value.password = true;
    return;
  } else {
    errors.value.password = false;
  }

  if (cpassword.value == "") {
    errors.value.cpassword = true;
    return;
  } else if (cpassword.value !== password.value) {
    errors.value.cpassword = true;
    eMsg.value.cpassword = "password does not match";
    return;
  } else {
    errors.value.cpassword = false;
  }

  window.location.href = "/";
};
</script>
