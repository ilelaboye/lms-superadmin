<template>
  <div class="row">
    <!-- [ sample-page ] start -->
    <div class="col-sm-12">
      <div class="chat-wrapper">
        <div
          class="offcanvas-xxl offcanvas-start chat-offcanvas"
          tabindex="-1"
          id="offcanvas_User_list"
        >
          <div class="offcanvas-header">
            <button
              class="btn-close"
              data-bs-dismiss="offcanvas"
              data-bs-target="#offcanvas_User_list"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body p-0">
            <div id="chat-user_list" class="show collapse collapse-horizontal">
              <div class="chat-user_list">
                <div class="card overflow-hidden">
                  <div class="card-body">
                    <h5 class="mb-4">Messages</h5>
                    <div class="form-search">
                      <i class="ti ti-search"></i>
                      <input
                        type="search"
                        class="form-control"
                        placeholder="Search Followers"
                      />
                    </div>
                  </div>
                  <div
                    class="scroll-block simplebar-scrollable-y"
                    data-simplebar="init"
                  >
                    <div class="simplebar-wrapper" style="margin: 0px">
                      <div class="simplebar-height-auto-observer-wrapper">
                        <div class="simplebar-height-auto-observer"></div>
                      </div>
                      <div class="simplebar-mask">
                        <div
                          class="simplebar-offset"
                          style="right: 0px; bottom: 0px"
                        >
                          <div
                            class="simplebar-content-wrapper"
                            tabindex="0"
                            role="region"
                            aria-label="scrollable content"
                            style="height: 100%; overflow: hidden scroll"
                          >
                            <div class="simplebar-content" style="padding: 0px">
                              <div class="card-body p-0">
                                <div class="list-group list-group-flush">
                                  <a
                                    v-for="(item, index) in users"
                                    href="#"
                                    class="list-group-item list-group-item-action p-3"
                                    @click.prevent="setUser(item)"
                                  >
                                    <div class="media align-items-center">
                                      <!-- <div class="chat-avtar">
                                        <img
                                          class="rounded-circle img-fluid wid-40"
                                          src="@/assets/images/user/avatar-1.jpg"
                                          alt="User image"
                                        />
                                        <div
                                          class="bg-success chat-badge"
                                        ></div>
                                      </div> -->
                                      <div class="media-body mx-2">
                                        <h6 class="mb-0">
                                          {{ item.firstname }}
                                          {{ item.lastname }}
                                          <span
                                            class="float-end text-sm text-muted f-w-400"
                                            >2h ago</span
                                          >
                                        </h6>
                                        <span
                                          class="text-sm text-muted"
                                          v-if="item.role_id == 1"
                                        >
                                          Student
                                          <!-- <span class="float-end">
                                            <span
                                              class="chat-badge-status bg-danger text-white"
                                              >9</span
                                            >
                                          </span> -->
                                        </span>
                                        <span class="text-sm text-muted" v-else
                                          >Teacher</span
                                        >
                                      </div>
                                    </div>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="simplebar-placeholder"
                        style="width: 298px; height: 583px"
                      ></div>
                    </div>
                    <div
                      class="simplebar-track simplebar-horizontal"
                      style="visibility: hidden"
                    >
                      <div
                        class="simplebar-scrollbar"
                        style="width: 0px; display: none"
                      ></div>
                    </div>
                    <div
                      class="simplebar-track simplebar-vertical"
                      style="visibility: visible"
                    >
                      <div
                        class="simplebar-scrollbar"
                        style="
                          height: 25px;
                          transform: translate3d(0px, 0px, 0px);
                          display: block;
                        "
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="chat-content">
          <button
            class="btn btn-primary py-2"
            data-bs-toggle="modal"
            data-bs-target="#messageStudents"
          >
            Message Students
          </button>
          <button
            class="btn btn-primary py-2"
            data-bs-toggle="modal"
            data-bs-target="#messageStudents"
          >
            Message Teachers
          </button>
          <div class="card mb-0">
            <div class="card-header p-3">
              <div class="d-flex align-items-center">
                <ul class="list-inline me-auto mb-0">
                  <li class="list-inline-item align-bottom">
                    <a
                      href="#"
                      class="d-xxl-none avtar avtar-s btn-link-secondary"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvas_User_list"
                    >
                      <i class="ti ti-menu-2 f-18"></i>
                    </a>
                    <a
                      href="#"
                      class="d-none d-xxl-inline-flex avtar avtar-s btn-link-secondary"
                      data-bs-toggle="collapse"
                      data-bs-target="#chat-user_list"
                    >
                      <i class="ti ti-menu-2 f-18"></i>
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <div class="media align-items-center">
                      <div class="media-body mx-3 d-none d-sm-inline-block">
                        <h6 class="mb-0">
                          {{ user.firstname }} {{ user.lastname }}
                        </h6>
                        <span class="text-sm text-muted">{{
                          user.username
                        }}</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div
              class="scroll-block chat-message simplebar-scrollable-y"
              data-simplebar="init"
            >
              <div class="simplebar-wrapper" style="margin: 0px">
                <div class="simplebar-height-auto-observer-wrapper">
                  <div class="simplebar-height-auto-observer"></div>
                </div>
                <div class="simplebar-mask">
                  <div class="simplebar-offset" style="right: 0px; bottom: 0px">
                    <div
                      class="simplebar-content-wrapper"
                      tabindex="0"
                      role="region"
                      aria-label="scrollable content"
                      style="height: 100%; overflow: hidden scroll"
                    >
                      <div class="simplebar-content" style="padding: 0px">
                        <div class="card-body">
                          <div
                            v-for="(item, index) in user.chats"
                            :key="index"
                            :class="
                              item.sender_id == 0 ? 'message-in' : 'message-out'
                            "
                          >
                            <div class="d-flex align-items-end flex-column">
                              <p class="mb-1 text-muted">
                                <small>{{
                                  item.diff.replace("before", "ago")
                                }}</small>
                              </p>
                              <div
                                class="message d-flex align-items-end flex-column"
                              >
                                <div
                                  class="d-flex align-items-center mb-1 chat-msg"
                                >
                                  <div class="flex-grow-1 ms-3">
                                    <div class="msg-content bg-primary">
                                      <p class="mb-0">{{ item.message }}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <p class="mb-1 text-muted">
                                <small>{{
                                  formatDateTime(item.created_at)
                                }}</small>
                              </p>
                            </div>
                          </div>
                          <!-- <div class="message-in">
                            <div class="d-flex">
                              <div class="flex-shrink-0">
                                <div class="chat-avtar">
                                  <img
                                    class="rounded-circle img-fluid wid-40"
                                    src="@/assets/images/user/avatar-2.jpg"
                                    alt="User image"
                                  />
                                  <i class="chat-badge bg-success"></i>
                                </div>
                              </div>
                              <div class="flex-grow-1 mx-3">
                                <div
                                  class="d-flex align-items-start flex-column"
                                >
                                  <p class="mb-1 text-muted">
                                    Agilulf Fuxg <small>11:23 AM</small>
                                  </p>
                                  <div
                                    class="message d-flex align-items-start flex-column"
                                  >
                                    <div
                                      class="d-flex align-items-center mb-1 chat-msg"
                                    >
                                      <div class="flex-grow-1 me-3">
                                        <div class="msg-content card mb-0">
                                          <p class="mb-0">Hey.. Bill</p>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      class="d-flex align-items-center mb-1 chat-msg"
                                    >
                                      <div class="flex-grow-1 me-3">
                                        <div class="msg-content card mb-0">
                                          <p class="mb-0">nice to meet you!</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div> -->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="simplebar-placeholder"
                  style="width: 754px; height: 826px"
                ></div>
              </div>
              <div
                class="simplebar-track simplebar-horizontal"
                style="visibility: hidden"
              >
                <div
                  class="simplebar-scrollbar"
                  style="width: 0px; display: none"
                ></div>
              </div>
              <div
                class="simplebar-track simplebar-vertical"
                style="visibility: visible"
              >
                <div
                  class="simplebar-scrollbar"
                  style="
                    height: 30px;
                    transform: translate3d(0px, 0px, 0px);
                    display: block;
                  "
                ></div>
              </div>
            </div>
            <div class="card-footer py-2 px-3">
              <textarea
                class="form-control border-0 shadow-none px-0"
                placeholder="Type a Message"
                rows="2"
                v-model="message"
              ></textarea>
              <hr class="my-2" />
              <div class="d-sm-flex align-items-center">
                <!-- Upload attachment with message -->

                <!-- <ul class="list-inline me-auto mb-0">
                  <li class="list-inline-item">
                    <a href="#" class="avtar avtar-xs btn-link-secondary">
                      <i class="ti ti-paperclip f-18"></i>
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a href="#" class="avtar avtar-xs btn-link-secondary">
                      <i class="ti ti-photo f-18"></i>
                    </a>
                  </li>
                </ul> -->
                <ul class="list-inline ms-auto mb-0">
                  <li class="list-inline-item">
                    <a
                      href="#"
                      class="avtar avtar-s btn-link-primary"
                      @click.prevent="sendMessage()"
                    >
                      <i class="ti ti-send f-18"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- [ sample-page ] end -->
  </div>
</template>
<script lang="ts" setup>
  import { Ref, onMounted, reactive, ref } from "vue";
  import { useToast } from "vue-toast-notification";
  import { useStore } from "vuex";
  import { formatDateTime } from "@/core/utils/helpers";

  const store = useStore();
  const users: any = ref([]);
  const user: any = ref({});
  const message = ref("");
  const loaded = ref(true);

  const getChats = async () => {
    store.commit("setLoader", true);
    await store.dispatch("get", "chats").then((resp) => {
      store.commit("setLoader", false);
      users.value = resp.data.data;
      user.value = users.value[0];
      console.log(resp);
      loaded.value = true;
    });
  };

  const setUser = (data: any) => {
    user.value = data;
  };
  const sendMessage = async () => {
    if (message.value.length < 1) {
      useToast().error("Message is required");
      return;
    }
    store.commit("setLoader", true);
    console.log(user.value);
    await store
      .dispatch("post", {
        endpoint: "save-chat",
        details: { user: user.value.uuid, message: message.value },
      })
      .then((resp) => {
        store.commit("setLoader", false);
        user.value.chats.push({ ...resp.data.data });
        message.value = "";
      })
      .catch(() => {
        store.commit("setLoader", false);
      });
  };

  onMounted(() => {
    getChats();
  });
</script>
