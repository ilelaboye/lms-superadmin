<template>
  <div v-if="loaded" class="container-xxl flex-grow-1 container-p-y">
    <div>
      <h4 class="py-3 mb-2">
        <span class="text-muted fw-light">Transactions /</span> Order Details
      </h4>
    </div>

    <div
      class="bg-white mb-3 d-flex justify-content-start align-items-center"
      style="height: 60px"
    >
      <a
        href="#"
        @click.prevent="router.go(-1)"
        class="d-flex align-items-center ps-4 text-dark"
      >
        <i class="ti ti-arrow-narrow-left text-dark pc-icon fs-4"></i>
      </a>
      <p>#{{ receivedData._id }}</p>
    </div>

    <!-- Order Details Table -->

    <div class="row">
      <div class="col-12 col-lg-8">
        <div class="card mb-4">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr class="text-primary">
                  <th>PRODUCTS</th>
                  <th>QUANTITY</th>
                  <th class="text-center">
                    UNIT PRICE <P class="text-center">(₦)</P>
                  </th>
                  <th class="text-center">
                    TOTAL PRICE
                    <p class="text-center">(₦)</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in receivedData.order" :key="index">
                  <td>{{ item.name }}</td>
                  <td>{{ item.qty }}</td>
                  <td class="text-end">{{formatPrice( item.amount) }}</td>
                  <td class="text-end">{{ formatPrice(item.qty * item.amount )}}</td>
                </tr>
              </tbody>
              <!-- <tbody v-else>
                <tr>
                  <td colspan="7">
                    <p class="alert alert-info">No item in cart</p>
                  </td>
                </tr>
              </tbody> -->
            </table>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6 col-sm-12">
        <div class="card mb-4">
          <div class="card-header bg-light pt-3" style="height: 50px">
            <h6>PAYMENT COMFIRMATION</h6>
          </div>
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <p>Customer:</p>
              <p>{{ receivedData.user_id.fullname }}</p>
            </div>
            <div class="d-flex justify-content-between">
              <p>Cashier:</p>
              <p>
                {{ receivedData.cashier.firstname }}
                {{ receivedData.cashier.lastname }}
              </p>
            </div>
            <div class="d-flex justify-content-between border-bottom">
              <p>Status:</p>

              <div class="d-flex justify-content-between align-items-center">
                <div
                  v-if="receivedData.status == 1"
                  class="status d-flex align-items-center"
                >
                  <p
                    class="empty-div bg-warning me-1"
                    style="height: 13px; width: 13px; border-radius: 50%"
                  ></p>
                  <p>Pending</p>
                </div>
                <div v-else class="status d-flex align-items-center">
                  <p
                    class="empty-div bg-success me-1"
                    style="height: 13px; width: 13px; border-radius: 50%"
                  ></p>
                  <p>Successful</p>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <p class="mb-3">Subtotal ({{ receivedData.order.length }})</p>
              <p class="mb-3">{{ formatPrice(total) }}</p>
            </div>
            <div class="d-flex justify-content-between">
              <p>Discount:</p>
              <p>₦0.00</p>
            </div>
            <div class="d-flex justify-content-between">
              <p>VAT:</p>
              <p>₦0.00</p>
            </div>
            <div class="d-flex justify-content-between border-bottom py-2">
              <p>Estimated Total:</p>
              <p class="border-top border-bottom py-2">{{ formatPrice(total) }}</p>
            </div>
            <div class="payment-details p-3">
              <div v-if="receivedData.status == 2">
                <p>Payment Method</p>
                <p v-if="receivedData.payment == 1">Cash</p>
                <p v-if="receivedData.payment == 2">POS</p>
                <p v-if="receivedData.payment == 3">Transfer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, customRef } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { useToast } from "vue-toast-notification";
import { formatPrice } from "@/core/utils/helpers";

const route = useRoute();
const router = useRouter();
const store = useStore();
const loaded = ref(false);

const receivedData: any = ref({});

const total = computed(() => {
  let tp = 0;
  receivedData.value.order.forEach((item: any) => {
    tp += item.amount * item.qty;
  })
  return tp;
})

const getOrder = () => {
  store.commit("setLoader", true);
  store.dispatch("get", `order/byId/${route.params.id}`).then((resp) => {
    console.log(resp);
    receivedData.value = resp.data.data.data;

    store.commit("setLoader", false);
    loaded.value = true;
  });
};

onMounted(() => {
  getOrder();
});
</script>

<style lang="scss" scoped>
p {
  margin-bottom: 0;
}
</style>
