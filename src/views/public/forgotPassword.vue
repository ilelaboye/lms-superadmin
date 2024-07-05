<template>
  <div class="auth-main">
    <div class="auth-wrapper v1">
      <div class="auth-form">
        <div class="text-center">
          <img src="@/assets/images/logo.svg"  alt="img" />
        </div>

        <div class="card my-5">
          <div class="card-body my-3">
            <div class="mb-4 text-center">
              <h4><b>Forgot Password</b></h4>
            </div>
            <div class="form-group mb-3">
              <label class="form-label">Email Address</label>
              <input
                v-model="email"
                type="email"
                class="form-control"
                id="floatingInput"
                placeholder="Email Address"
              />
              <span
                v-if="errors.email"
                class="error text-danger text-start mb-3 ms-2"
                style="font-size: 11px"
              >
                {{ eMsg.email }}
              </span>
            </div>
            <div class="d-grid my-4">
              <button
                @click.prevent="resetPassword()"
                type="button"
                class="btn btn-primary"
              >
                Send Password Reset Email
              </button>
            </div>
            <div class="text-center">
              <a href="/" class="link-primary">Back to Login</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const email = ref("");
const errors = ref({
  email: false,
});
const eMsg = ref({
  email: "This field is required",
});

const resetPassword = () => {
  if (email.value == "") {
    errors.value.email = true;
    return;
   
  } else if (
    !email.value.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    )
  ) {
    errors.value.email = true;
    eMsg.value.email = "Invalid Email";
    return;
  } else {
    errors.value.email = false;
  }

  window.location.href = "/vcode";
};
</script>
