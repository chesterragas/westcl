<template>
  <div v-if="!loading"></div>
  
  <div class="row">
    <div class="col-md-11 q-pl-md q-pt-md">
      <q-btn
        size="md"
        class="glossy"
        color="teal"
        icon="arrow_back"
        to="/tenant"
        >Back</q-btn
      >
    </div>
     <div class="col-md-1 q-pl-md q-pt-md text-center">
        <q-btn
            size="md"
            class="glossy"
            color="red"
            icon="delete"
            @click="confirm"
            >Delete</q-btn
          >
    </div>
   
  </div>

  <div class="row">
    <div class="col-12 col-md-2">
      <div class="col-12 col-md-12 q-mx-md q-mt-md">
        <div class="q-gutter-sm">
          <q-btn
            size="md"
            class="glossy"
            color="blue"
            icon="edit"
            @click="isEdit = true"
            >Edit</q-btn
          >
          
          <q-btn
            size="md"
            class="glossy"
            color="teal"
            icon="save"
            v-if="isEdit"
            @click="UpdateTenant"
            >Save</q-btn
          >
        </div>
      </div>
      <form class="q-mt-md">
        <div class="row">
          <div class="col-12 col-md-10 q-mt-xs q-mx-md">
            <q-input
              filled
              label="First Name"
              v-model="tenant.firstName"
              :readonly="!isEdit"
            ></q-input>
          </div>
        </div>

        <div class="row">
          <div class="col-12 col-md-10 q-mt-xs q-mx-md">
            <q-input
              filled
              label="Last Name"
              v-model="tenant.lastName"
              :readonly="!isEdit"
            ></q-input>
          </div>
        </div>

        <div class="row">
          <div class="col-12 col-md-10 q-mt-xs q-mx-md">
            <q-input
              filled
              label="Phone"
              v-model="tenant.mobileNo"
              :readonly="!isEdit"
            ></q-input>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-10 q-mt-xs q-mx-md">
            <q-input
              filled
              label="Email"
              v-model="tenant.email"
              :readonly="!isEdit"
            ></q-input>
          </div>
        </div>

        <div class="row">
          <div class="col-12 col-md-10 q-mt-xs q-mx-md">
            <q-input
              filled
              label="Address"
              v-model="tenant.address"
              :readonly="!isEdit"
            ></q-input>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-10 q-mt-xs q-mx-md">
            <q-input
              filled
              label="Passport No"
              v-model="tenant.passportNo"
              :readonly="!isEdit"
            ></q-input>
          </div>
        </div>

        <div class="row">
          <div class="col-12 col-md-10 q-mt-xs q-mx-md">
            <q-input
              filled
              label="Alternative Contact"
              v-model="tenant.alternativeContact"
              :readonly="!isEdit"
            ></q-input>
          </div>
        </div>
         <div class="row">
          <div class="col-12 col-md-10 q-mt-xs q-mx-md">
            <q-input
              filled
              label="Starting Date"
              v-model="tenant.startDate"
              :readonly="!isEdit"
            ></q-input>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-10 q-mt-xs q-mx-md">
            <q-select
              filled
              v-model="couple"
              label="Couple Tenancy"
              :options="yesno"
              :readonly="!isEdit"
              required
            />
          </div>
        </div>

        <div v-if="couple == 'Yes'">
          <div class="row">
            <div class="col-12 col-md-10 q-mt-xs q-mx-md">
              <q-input
                filled
                label="Spouse First Name"
                v-model="tenant.spouse.firstName"
                :readonly="!isEdit"
              ></q-input>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-10 q-mt-xs q-mx-md">
              <q-input
                filled
                label="Spouse Last Name"
                v-model="tenant.spouse.lastName"
                :readonly="!isEdit"
              ></q-input>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-10 q-mt-xs q-mx-md">
              <q-input
                filled
                label="Spouse Phone"
                v-model="tenant.spouse.mobileNo"
                :readonly="!isEdit"
              ></q-input>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-10 q-mt-xs q-mx-md">
              <q-input
                filled
                label="Spouse Email"
                v-model="tenant.spouse.email"
                :readonly="!isEdit"
              ></q-input>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-10 q-mt-xs q-mx-md">
              <q-input
                filled
                label="Spouse Alternative Contact"
                v-model="tenant.spouse.alternativeContact"
                :readonly="!isEdit"
              ></q-input>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-10 q-mt-xs q-mx-md">
              <q-input
                filled
                label="Spouse Passport No"
                v-model="tenant.spouse.passportNo"
                :readonly="!isEdit"
              ></q-input>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="col-12 col-md-5">
      <div class="q-pa-md">
        <q-table
          style="height: 420px"
          title="Payment History"
          :rows="historylist"
          :columns="columns"
          :filter="filter"
          v-model:pagination="pagination"
          :rows-per-page-options="[0]"
          @row-click="showmodal2"
        >
          <template v-slot:top-right>
            <q-input
              borderless
              dense
              debounce="300"
              v-model="filter"
              placeholder="Search"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
        </q-table>

        <div class="q-mt-lg">
          <q-table
            style="height: 327px"
            title="Upload Files"
            :rows="docslist"
            :columns="columns2"
            :filter="filterUpload"
            v-model:pagination="paginationupload"
            :rows-per-page-options="[0]"
          >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="createDate" :props="props">{{
                  props.row.createDate
                }}</q-td>
                <q-td key="filename" :props="props">{{
                  props.row.filename
                }}</q-td>

                <q-td key="actions" :props="props">
                  <q-btn
                    class="glossy"
                    color="blue"
                    icon="download"
                    size="sm"
                    no-caps
                    @click="geturl(props.row.filename)"
                  ></q-btn>
                </q-td>
              </q-tr>
            </template>
            <template v-slot:top-row>
              <q-tr>
                <q-td colspan="100%">
                  <div class="row justify-around q-mt-md">
                    <div class="col-12 col-md-6">
                      <input
                        type="file"
                        id="selectedFile"
                        style="display: none"
                        @change="fileselected"
                      />
                      <q-btn
                        style="width: 100%"
                        class="glossy"
                        color="teal"
                        type="button"
                        value="Browse..."
                        onclick="document.getElementById('selectedFile').click();"
                      >
                        <q-icon name="file_upload" />Upload File</q-btn
                      >
                      <!-- <q-item-label class="q-mt-md text-center">{{
                        selectedfileName
                      }}</q-item-label> -->
                    </div>
                  </div>
                </q-td>
              </q-tr>
            </template>
            <template v-slot:top-right>
              <q-input
                borderless
                dense
                debounce="300"
                v-model="filterUpload"
                placeholder="Search"
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
          </q-table>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-5">
      <div class="q-pa-md">
        <q-card>
          <q-date
            v-model="datevar"
            :events="payday.value"
            :event-color="(date) => (pay.includes(datevar) ? 'orange' : 'yellow')"
            today-btn
            title="Weekly Rent Schedule"
            subtitle="West Central Lodge"
          />

          <div class="row q-ml-md">
            <div class="col-2 col-md-2">
              <q-select v-model="s" label="Weekdays Due" :options="weekdays" />
            </div>
            <div class="col-2 col-md-4">
              <div class="q-pa-sm q-gutter-sm">
                <q-btn
                  class="glossy"
                  color="teal"
                  icon="assignment"
                  label="Set Weekday"
                  @click="setDueDay"
                />
              </div>
            </div>
            <div class="col-6 col-md-2">
              <!-- <q-btn color="primary" icon="assignment"></q-btn> -->
            </div>
            <div class="col-2 col-md-4">
              <!-- <q-btn color="primary" icon="assignment"></q-btn> -->
              <div class="q-pa-sm q-gutter-sm">
                <q-btn
                  class="glossy"
                  color="teal"
                  icon="create"
                  label="Set Payment"
                  @click="showmodal"
                />
              </div>
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </div>

  <q-dialog
    v-model="persistent"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="text-h6">Payment Details</div>
      </q-card-section>
      <q-card-section>
        <form>
          <div class="row justify-around">
            <div class="col-12 col-md-5">
              <q-input
                filled
                label="Payment Date"
                v-model="payment.paymentdate"
                readonly
              ></q-input>
            </div>
            <div class="col-12 col-md-5">
              <q-input
                filled
                label="Paid Amount"
                v-model="payment.amount"
                type="number"
              ></q-input>
            </div>
          </div>
          <div class="row justify-around q-mt-md">
            <div class="col-12 col-md-5">
              <q-select
                v-model="payment.method"
                :options="paymentmethod"
                filled
                label="Mode of Payment"
              />
            </div>

            <div class="col-12 col-md-5">
              <q-input
                filled
                label="Bank Account No"
                v-model="tenant.bankAccount"
                v-if="payment.method == 'Bank Transfer'"
              />
            </div>
          </div>
        </form>
      </q-card-section>
      <q-card-actions align="right" class="bg-white text-teal">
        <div class="row justify-around q-mt-lg">
          <div class="q-pa-md q-gutter-sm justify-center">
            <q-btn
              v-if="!isUpdate"
              class="glossy"
              color="teal"
              icon="save"
              label="Save"
              @click="AddRentDate"
            />
            <q-btn
              v-if="isUpdate"
              class="glossy"
              color="primary"
              icon="edit"
              label="Update"
              @click="AddRentDate"
            />
            <q-btn
              class="glossy"
              color="blue"
              icon="cancel"
              label="Cancel"
              @click="persistent = false"
            />

            <q-btn
              v-if="isUpdate"
              class="glossy"
              color="red"
              icon="delete"
              label="Remove"
              @click="removedate"
            />
          </div>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { computed, Ref, ref } from "vue";
import { openURL, useQuasar, date } from "quasar";
import { useStore } from "vuex";
import {
  Payment,
  TenantDetails,
  TenantDocs,
  TenantDueDateDay,
} from "src/model";
import { db, snapshotToArray, auth, storage } from "boot/firebase";
import { count } from "console";

const columns = [
  {
    name: "paymentdate",
    label: "Date",
    field: (row: { paymentdate: any }) => row.paymentdate,
    align: "left",
    sortable: true,
    format: (val: any) => `${val}`,
  },
  {
    name: "amount",
    label: "Amount",
    field: "amount",
    align: "left",
  },
];
const columns2 = [
  {
    name: "createDate",
    label: "Date",
    field: (row: { createDate: any }) => row.createDate,
    align: "left",
    sortable: true,
    format: (val: any) => `${val}`,
  },
  {
    name: "filename",
    label: "File Name",
    field: "filename",
    align: "left",
  },
  {
    name: "actions",
    label: "Actions",
    field: "actions",
  },
];

export default {
  setup() {
    const $q = useQuasar();
    const loading = ref(true);
    const persistent = ref(false);
    const store = useStore();
    const datevar = ref("");
    const todayDate = ref(date.formatDate(new Date(), 'DD/MM/YYYY'));
    const weekdaysdue = ref("");
    const events = ref([""]);
    const pay = ref([""]);
    const tenant: Ref<any> = ref();
    const weekdaydue: Ref<TenantDueDateDay> = ref(new TenantDueDateDay());
    const payment: Ref<Payment> = ref(new Payment());
    payment.value.paymentdate = "2022-01-01";
    const isUpdate = ref(true);
    const selectedfile = ref();
    const selectedfileName = ref("");
    const isEdit = ref(false);
    const couple = ref("");
    console.log(todayDate.value);
    tenant.value = store.getters.getTenant;
    tenant.value.startDate = date.formatDate(tenant.value.startDate, 'DD/MM/YYYY');
    if (tenant.value != null) {
      couple.value = tenant.value.coupleTenancy;
    }

    var today = new Date();
    var dd = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();

    var mm =
      today.getMonth() + 1 < 10
        ? "0" + (today.getMonth() + 1)
        : today.getMonth() + 1;
    var yyyy = today.getFullYear();
    datevar.value = yyyy + "-" + mm + "-" + dd;
    const payday = computed(() => {
      if (loading) {
        showdue();
      }
      loading.value = false;
      return events;
    });

    const s = ref();
    const paymenthistory: Ref<any[]> = ref([]);
    const uploaddocs: Ref<any[]> = ref([]);

    let checker: any;
    const historylist = computed(() => {
      db.ref("M_Payments/")
        .orderByChild("tenantid")
        .equalTo(tenant.value.key)
        .on("value", (resp) => {
          paymenthistory.value = snapshotToArray(resp);
        });
      loading.value = true;
      pay.value = [];
      paymenthistory.value
        .filter((x) => x.isDeleted != "true")
        .forEach((element) => {
          pay.value.push(element.paymentdate);
        });

      return paymenthistory.value.filter((x) => x.isDeleted != "true");
    });

    const docslist = computed(() => {
      db.ref("M_TenantDocs/")
        .orderByChild("tenantid")
        .equalTo(tenant.value.key)
        .on("value", (resp) => {
          uploaddocs.value = snapshotToArray(resp);
        });
      loading.value = true;
      return uploaddocs.value.filter((x) => x.isDeleted != "true");
    });

    try {
      s.value = tenant.value.weekDayDue;
    } catch (err) {
      window.location.href = "/";
    }
    if (tenant.value == null) {
      window.location.href = "/";
    }

    function AddRentDate() {
      events.value.push(datevar.value);
      pay.value.push(datevar.value);
      persistent.value = false;
      payment.value.bankaccount = tenant.value.bankAccount;
      payment.value.paymentdate = datevar.value;
      payment.value.tenantid = tenant.value.key;
      if (!isUpdate.value) {
        db.ref("M_Payments/").push(payment.value);
      } else {
        db.ref("M_Payments/").child(checker[0].key).update(payment.value);
      }
      if (tenant.value.bankAccount != "") {
        db.ref("M_TenantDetails/").child(tenant.value.key).update(tenant.value);
      }
      reset();
      $q.notify({
        message: "Successfully added payment",
        icon: "check",
        color: "green",
        position: "top",
      });
    }
    function removedate() {
      paymenthistory.value = paymenthistory.value.filter(
        (x) => x.paymentdate != datevar.value
      );
      persistent.value = false;
      loading.value = true;
      payment.value.isDeleted = "true";
      db.ref("M_Payments/").child(checker[0].key).update(payment.value);
      reset();
      $q.notify({
        message: "Successfully deleted payment",
        icon: "check",
        color: "green",
        position: "top",
      });
    }
    function setDueDay() {
      store.commit("setTenantWeekdaydue", s.value);
      tenant.value = store.getters.getTenant;
      db.ref("M_TenantDetails/").child(tenant.value.key).update(tenant.value);
      weekdaydue.value.tenantid = tenant.value.key;

      weekdaydue.value.weekDayDue = s.value;
      db.ref("M_WeekdaysDue/").push(weekdaydue.value);
      showdue();

      $q.notify({
        message: "Successfully set weekday dues",
        icon: "check",
        color: "green",
        position: "top",
      });
    }

    function reset() {
      datevar.value = "";
      isUpdate.value = false;
      loading.value = false;
    }

    function showdue() {
      switch (s.value) {
        case "Monday":
          getalldays(1);
          break;
        case "Tuesday":
          getalldays(2);
          break;
        case "Wednesday":
          getalldays(3);
          break;
        case "Thursday":
          getalldays(4);
          break;
        case "Friday":
          getalldays(5);
          break;
        case "Saturday":
          getalldays(6);
          break;
        case "Sunday":
          getalldays(0);
          break;
      }
    }

    function getalldays(num: number) {
      events.value = [];
      pay.value.forEach((element) => {
        events.value.push(element);
      });
      var d = new Date(),
        year = d.getFullYear();

      d.setDate(1);

      // Get the first Monday in the month
      while (d.getDay() !== num) {
        d.setDate(d.getDate() + 1);
      }

      while (d.getFullYear() === year) {
        var pushDate = new Date(d.getTime());

        var month =
          pushDate.getMonth() + 1 < 10
            ? "0" + (pushDate.getMonth() + 1)
            : pushDate.getMonth() + 1;
        var day =
          pushDate.getDate() + 1 <= 10
            ? "0" + pushDate.getDate()
            : pushDate.getDate();

        events.value.push(pushDate.getFullYear() + "/" + month + "/" + day);
        d.setDate(d.getDate() + 7);
      }
    }

    function fileselected(event: any) {
      selectedfile.value = event;
      selectedfileName.value = event.target.files[0].name;

      try {
        const storerage = storage
          .ref(selectedfile.value.target.files[0].name)
          .put(selectedfile.value.target.files[0]);
        let uploadvalue = 0;
        storerage.on("state_changed", (snapshot) => {
          uploadvalue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // alert(uploadvalue);
        });
        let upload = new TenantDocs();
        upload.tenantid = tenant.value.key;
        upload.filename = selectedfileName.value;
        db.ref("M_TenantDocs/").push(upload);
      } catch (err) {}
    }

    async function geturl(file: any) {
      const getfile = storage.ref().child(file);
      const fileurl = getfile.getDownloadURL();
      openURL(await fileurl);
    }

    function UpdateTenant() {
      store.commit("setTenant", tenant.value);
      store.commit("setTenantCouple", couple.value);
      let update = store.getters.getTenant;
      console.log(update);
      db.ref("M_TenantDetails/").child(update.key).update(update);
      isEdit.value = false;
      $q.notify({
        message: "Successfully updated tenant details",
        icon: "check",
        color: "green",
        position: "top",
      });
    }

    function confirm() {
      $q.dialog({
        title: "Confirm",
        message: "Delete selected tenant?",
        cancel: true,
        persistent: true,
      }).onOk(() => {
        DeleteTenant();
      });
    }

    function DeleteTenant(){
      const modifythis = tenant.value;
      modifythis.isActive = false;
      db.ref("M_TenantDetails/").child(modifythis.key).update(modifythis);
      $q.notify({
        message: "Successfully deleted tenant details",
        icon: "check",
        color: "green",
        position: "top",
      });
      window.location.href = "/#/tenant";
    }

    function showmodal() {
      if (datevar.value != "") {
        loading.value = false;
        persistent.value = true;

        checker = paymenthistory.value.filter(
          (x) => x.paymentdate == datevar.value && x.isDeleted != "true"
        );
        if (checker.length > 0) {
          payment.value = checker[0];
          datevar.value = payment.value.paymentdate;
          isUpdate.value = true;
        } else {
          isUpdate.value = false;
          payment.value = new Payment();
          payment.value.paymentdate = datevar.value;
        }
      } else {
        datevar.value = "";
      }
    }

    function showmodal2(evt: any, row: any) {
      // console.log(row);
      loading.value = false;
      persistent.value = true;
      checker = paymenthistory.value.filter(
        (x) => x.paymentdate == row.paymentdate
      );
      if (checker.length > 0) {
        payment.value = checker[0];
        isUpdate.value = true;
        console.log(payment.value);
      } else {
        isUpdate.value = false;
        payment.value = new Payment();
      }
    }

    return {
      showmodal2,
      couple,
      UpdateTenant,
      DeleteTenant,
      confirm,
      isEdit,
      geturl,
      docslist,
      fileselected,
      selectedfileName,
      isUpdate,
      historylist,
      payment,
      pay,
      payday,
      s,
      setDueDay,
      weekdaysdue,
      weekdays: ref([
        "",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ]),
      tenant,
      loading,
      showmodal,
      splitterModel: 50,
      datevar,
      todayDate,
      events,
      persistent,
      AddRentDate,
      removedate,
      columns,
      columns2,
      filter: ref(""),
      filterUpload: ref(""),
      pagination: ref({
        sortBy: "paymentdate",
        descending: true,
        rowsPerPage: 5,
      }),
      paginationupload: ref({
        sortBy: "paymentdate",
        descending: true,
        rowsPerPage: 5,
      }),
      yesno: ["Yes", "No"],
      paymentmethod: ["Cash", "Bank Transfer"],
    };
  },
};
</script>

<style>
.q-date {
  width: 1000px !important;
  height: 700px !important;
}
.block {
  font-size: 20px;
  font-weight: bold;
}
.q-date__calendar-weekdays > div {
  opacity: 0.38;
  font-size: 20px;
  font-weight: bold;
}
.bg-yellow {
  background: #4882ff !important;
  height: 30px;
  width: 30px;
  opacity: 0.4;
  border-radius: 50%;
}
.bg-orange {
  background: #ffc64d !important;
  height: 30px;
  width: 30px;
  opacity: 0.4;
  border-radius: 50%;
}
.q-uploader {
  width: 100%;
}
.notranslate .material-icons .q-icon {
  display: none;
}

html {
  overflow: scroll;
  overflow-x: hidden;
  /* overflow-y: hidden; */
}
</style>