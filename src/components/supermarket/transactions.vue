<template>
  <div class="card">
    <div class="card-body table-card">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <h6 class="mb-0">Transactions</h6>
      </div>
      <div class="table-responsive">
        <table class="table mb-0">
          <thead>
            <tr>
              <th class="">DATE AND TIME</th>
              <th class="">CUSTOMER</th>
              <th class="">NUMBERS OF ITEMS</th>
              <th class="">CASHIER</th>
              <th class="">AMOUNT</th>
              <th class="">PAYMENT OPTION</th>
              <th class="">ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in transactions" :key="index">
              <td>{{ formatDateTime(order.createdAt) }}</td>
              <td>{{ order.user_id.fullname }}</td>
              <td>{{ order.order.length }}</td>
              <td>
                {{ order.cashier.firstname }} {{ order.cashier.lastname }}
              </td>
              <td>₦{{ formatPrice(calculateTotal(order.order)) }}</td>
              <td>
                <span v-if="order.payment == 1">Cash</span>
                <span v-if="order.payment == 2">POS</span>
                <span v-if="order.payment == 3">Transfer</span>
              </td>

              <td class="action-icon">
                <router-link :to="`/order/${order._id}`">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M15.1614 12.0531C15.1614 13.7991 13.7454 15.2141 11.9994 15.2141C10.2534 15.2141 8.83838 13.7991 8.83838 12.0531C8.83838 10.3061 10.2534 8.89111 11.9994 8.89111C13.7454 8.89111 15.1614 10.3061 15.1614 12.0531Z"
                      stroke="#343434"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.998 19.3549C15.806 19.3549 19.289 16.6169 21.25 12.0529C19.289 7.48885 15.806 4.75085 11.998 4.75085H12.002C8.194 4.75085 4.711 7.48885 2.75 12.0529C4.711 16.6169 8.194 19.3549 12.002 19.3549H11.998Z"
                      stroke="#343434"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from "vue";
  import { useRoute } from "vue-router";
  import { useToast } from "vue-toast-notification";
  import { useStore } from "vuex";
  import { formatDateTime, formatPrice } from "@/core/utils/helpers";

  const store = useStore();
  const route = useRoute();
  const transactions: any = ref([]);
  const pageCount: any = ref();
  const currentPage: any = ref(0);

  const getSupermarketTransactions = (page = 1) => {
    currentPage.value = page;
    store.commit("setLoader", true);
    store
      .dispatch(
        "get",
        `order/transactions/manager/${route.params.id}?page=${currentPage.value}`
      )
      .then((resp) => {
        store.commit("setLoader", false);
        console.log(resp);
        transactions.value = resp.data.data.data;
        pageCount.value = resp.data.data.count;
      });
  };

  const calculateTotal = (order: any) => {
    var total = 0;
    order.forEach((item: any) => {
      total += item.qty * item.amount;
    });
    return total;
  };

  onMounted(() => {
    getSupermarketTransactions();
  });
</script>
