<template>
  <div class="auth-main">
    <div class="auth-wrapper v1">
      <div class="auth-form">
        <div class="text-center">
          <img src="@/assets/images/logo.svg" alt="img" />
        </div>
        <div class="card my-5">
          <div class="card-body">
            <div class="mb-5 text-center">
              <h4 class="mb-1"><b>Enter Verification Code</b></h4>
              <p class="">We sent you code on michelle****@company.com</p>
            </div>
            <div class="text-center">
              <input
                v-model="codes"
                type="tel"
                class="form-control text-center"
                placeholder="Enter Code"
              />
              <div
                v-if="errors.codes"
                class="error text-danger my-3 text-sm f-w-bold"
              >
                {{ eMsg.codes }}
              </div>
            </div>

            <div class="d-grid my-4">
              <button
                @click.prevent="checkCode()"
                type="button"
                class="btn btn-primary"
              >
                Continue
              </button>
            </div>
            <div class="d-flex justify-content-start align-items-end mt-3">
              <p class="mb-0">Did not receive the email?</p>
              <a href="#" class="link-info ms-2">Resend code</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const codes = ref("");

const errors = ref({
  codes: false,
});
const eMsg = ref({
  codes: "This code does not match",
});

const checkCode = () => {
  if (codes.value == "") {
    errors.value.codes = true;
    return;
  } else {
    errors.value.codes = false;
  }

  window.location.href = "/Rpass";
};
</script>
