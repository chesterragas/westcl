<template>
  <div v-if="!loading"></div>
  <div v-if="!isCoupleComputed"></div>
  <div class="row q-mt-md">
    <div class="col-12 col-md-12 q-mx-md">
      <q-btn size="md" class="glossy" color="teal" icon="arrow_back" to="/"
        >Back</q-btn
      >
    </div>
  </div>
  <div class="row">
    <div class="col-12 col-md-12 q-mx-md q-mt-md">
      <q-btn
        size="md"
        class="glossy"
        color="teal"
        icon="add"
        @click="tenantModal"
        >Add New Tenant</q-btn
      >
    </div>
  </div>

  <div class="row justify-around q-mt-sm">
    <div class="col-12 col-md-2">
      <q-scroll-area style="height: 650px; max-width: 350px">
        <div class="q-pa-md" style="max-width: 350px">
          <q-list bordered separator>
            <q-item
              clickable
              v-ripple
              v-for="item in Tenantlist"
              :key="item"
              @click="gotoTenantDetails(item)"
            >
              <q-item-section>
                <q-item-label class="q-pl-md"
                  >Tenant Name: {{ item.firstName }}</q-item-label
                >

                <q-item-label class="q-pl-md" lines="2">
                  Phone: {{ item.mobileNo }}</q-item-label
                >
                <q-item-label class="q-pl-md"
                  >Email: {{ item.email }}</q-item-label
                >
                <q-item-label class="q-pl-md"
                  >Amount: {{ item.weeklyAmountDue }}</q-item-label
                >
                <q-item-label class="q-pl-md" v-if="item.modeOfPayment != ''"
                  >Mode: {{ item.modeOfPayment }}</q-item-label
                >
                <q-item-label class="q-pl-md" v-if="item.weekDayDue != ''"
                  >Week Day Due: {{ item.weekDayDue }}</q-item-label
                >
              </q-item-section>
              <q-item-section
                side
                top
                v-if="
                  item.currentDue == item.weeklyAmountDue ||
                  item.currentDue == 0
                "
              >
                Due: {{ item.currentDue }}
              </q-item-section>
              <q-item-section
                side
                top
                v-if="
                  item.currentDue != item.weeklyAmountDue && item.currentDue > 0
                "
              >
                <p style="color: red">Overdue: {{ item.currentDue }}</p>
              </q-item-section>
            </q-item>
          </q-list>
          <div class="absolute-bottom-center q-mt-xl text-h6">
            Total: {{ dueTotal }}
          </div>
        </div>
      </q-scroll-area>
    </div>
    <div class="col-12 col-md-10">
      <div class="row">
        <div class="col-12 col-md-3">
          <div class="my-card">
            <q-card-section>
              <div class="row">
                <div class="col-6 col-md-6">
                  <div class="text-subtitle2">Power Provider:</div>
                  <div class="text-subtitle2">Due Date:</div>
                  <div class="text-subtitle2">Amount:</div>
                </div>
                <div class="col-6 col-md-6">
                  <div class="text-subtitle2">
                    {{ property.powerProvider }}
                  </div>
                  <div class="text-subtitle2">{{ powerdue.dueDate }}</div>
                  <div class="text-subtitle2">{{ powerdue.dueAmount }}</div>
                </div>
              </div>
            </q-card-section>
            <q-separator />
            <q-card-actions vertical>
              <q-btn
                class="glossy"
                color="teal"
                @click="billModal('Power', property.powerProvider)"
              >
                <q-icon name="attach_money" />
                <div>Add Bill</div></q-btn
              >
            </q-card-actions>
            <div class="q-pa-md">
              <q-table
                style="height: 420px"
                :dense="$q.screen.lt.md"
                title=""
                :rows="powerBillList"
                :columns="columns"
                :filter="powerFilter"
                :rows-per-page-options="[0]"
                hide-powerpagination
              >
                <template v-slot:body="props">
                  <q-tr :props="props">
                    <q-td key="dueDate" :props="props">{{
                      props.row.dueDate
                    }}</q-td>
                    <q-td key="dueAmount" :props="props">{{
                      props.row.dueAmount
                    }}</q-td>
                    <q-td key="paidAmount" :props="props">{{
                      props.row.paidAmount
                    }}</q-td>
                    <q-td key="actions" :props="props">
                      <q-btn
                        class="glossy"
                        color="blue"
                        icon="edit"
                        size="sm"
                        no-caps
                        @click="editbill(props.row)"
                      ></q-btn>
                      <q-btn
                        class="glossy"
                        color="red"
                        icon="delete"
                        size="sm"
                        no-caps
                        @click="confirm(props.row)"
                      ></q-btn>
                    </q-td>
                  </q-tr>
                </template>
                <template v-slot:top-right>
                  <q-input
                    borderless
                    dense
                    debounce="300"
                    v-model="powerFilter"
                    placeholder="Search"
                  >
                    <template v-slot:append>
                      <q-icon name="search" />
                    </template>
                  </q-input>
                </template>
                <template v-slot:bottom>
                  <div class="absolute-bottom-center">
                    Total: {{ powerBillTotal }}
                  </div>
                </template>
              </q-table>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-3">
          <div class="my-card">
            <q-card-section>
              <div class="row">
                <div class="col-6 col-md-6">
                  <div class="text-subtitle2">Water Provider:</div>
                  <div class="text-subtitle2">Due Date:</div>
                  <div class="text-subtitle2">Amount:</div>
                </div>
                <div class="col-6 col-md-6">
                  <div class="text-subtitle2">
                    {{ property.waterBill }}
                  </div>
                  <div class="text-subtitle2">{{ waterdue.dueDate }}</div>
                  <div class="text-subtitle2">{{ waterdue.dueAmount }}</div>
                </div>
              </div>
            </q-card-section>
            <q-separator />
            <q-card-actions vertical>
              <q-btn
                class="glossy"
                color="teal"
                @click="billModal('Water', property.waterBill)"
              >
                <q-icon name="attach_money" />
                <div>Add Bill</div></q-btn
              >
            </q-card-actions>
            <div class="q-pa-md">
              <q-table
                style="height: 420px"
                :dense="$q.screen.lt.md"
                title=""
                :rows="waterBillList"
                :columns="columns"
                :filter="waterFilter"
                :rows-per-page-options="[0]"
                hide-powerpagination
              >
                <template v-slot:top-right>
                  <q-input
                    borderless
                    dense
                    debounce="300"
                    v-model="waterFilter"
                    placeholder="Search"
                  >
                    <template v-slot:append>
                      <q-icon name="search" />
                    </template>
                  </q-input>
                </template>
                <template v-slot:body="props">
                  <q-tr :props="props">
                    <q-td key="dueDate" :props="props">{{
                      props.row.dueDate
                    }}</q-td>
                    <q-td key="dueAmount" :props="props">{{
                      props.row.dueAmount
                    }}</q-td>
                    <q-td key="paidAmount" :props="props">{{
                      props.row.paidAmount
                    }}</q-td>
                    <q-td key="actions" :props="props">
                      <q-btn
                        class="glossy"
                        color="blue"
                        icon="edit"
                        size="sm"
                        no-caps
                        @click="editbill(props.row)"
                      ></q-btn>
                      <q-btn
                        class="glossy"
                        color="red"
                        icon="delete"
                        size="sm"
                        no-caps
                        @click="confirm(props.row)"
                      ></q-btn>
                    </q-td>
                  </q-tr>
                </template>

                <template v-slot:bottom>
                  <div class="absolute-bottom-center">
                    Total: {{ waterBillTotal }}
                  </div>
                </template>
              </q-table>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-3">
          <div class="my-card">
            <q-card-section>
              <div class="row">
                <div class="col-6 col-md-6">
                  <div class="text-subtitle2">Internet Provider:</div>
                  <div class="text-subtitle2">Due Date:</div>
                  <div class="text-subtitle2">Amount:</div>
                </div>
                <div class="col-6 col-md-6">
                  <div class="text-subtitle2">
                    {{ property.internetProvider }}
                  </div>
                  <div class="text-subtitle2">{{ internetdue.dueDate }}</div>
                  <div class="text-subtitle2">{{ internetdue.dueAmount }}</div>
                </div>
              </div>
            </q-card-section>
            <q-separator />
            <q-card-actions vertical>
              <q-btn
                class="glossy"
                color="teal"
                @click="billModal('Internet', property.internetProvider)"
              >
                <q-icon name="attach_money" />
                <div>Add Bill</div></q-btn
              >
            </q-card-actions>
            <div class="q-pa-md">
              <q-table
                style="height: 420px"
                :dense="$q.screen.lt.md"
                title=""
                :rows="internetBillList"
                :columns="columns"
                :filter="internetFilter"
                :rows-per-page-options="[0]"
                hide-powerpagination
              >
                <template v-slot:top-right>
                  <q-input
                    borderless
                    dense
                    debounce="300"
                    v-model="internetFilter"
                    placeholder="Search"
                  >
                    <template v-slot:append>
                      <q-icon name="search" />
                    </template>
                  </q-input>
                </template>
                <template v-slot:body="props">
                  <q-tr :props="props">
                    <q-td key="dueDate" :props="props">{{
                      props.row.dueDate
                    }}</q-td>
                    <q-td key="dueAmount" :props="props">{{
                      props.row.dueAmount
                    }}</q-td>
                    <q-td key="paidAmount" :props="props">{{
                      props.row.paidAmount
                    }}</q-td>
                    <q-td key="actions" :props="props">
                      <q-btn
                        class="glossy"
                        color="blue"
                        icon="edit"
                        size="sm"
                        no-caps
                        @click="editbill(props.row)"
                      ></q-btn>
                      <q-btn
                        class="glossy"
                        color="red"
                        icon="delete"
                        size="sm"
                        no-caps
                        @click="confirm(props.row)"
                      ></q-btn>
                    </q-td>
                  </q-tr>
                </template>

                <template v-slot:bottom>
                  <div class="absolute-bottom-center">
                    Total: {{ internetBillTotal }}
                  </div>
                </template>
              </q-table>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-3">
          <div class="my-card">
            <q-card-section>
              <div class="row">
                <div class="col-6 col-md-6">
                  <div class="text-subtitle2">Rent Amount:</div>
                  <div class="text-subtitle2">Bank Account:</div>
                  <div class="text-subtitle2"> </div>
                </div>
                <div class="col-6 col-md-6">
                  <div class="text-subtitle2">{{ propertyRentAmount }}</div>
                  <div class="text-subtitle2">???????</div>
                  <div class="text-subtitle2"></div>
                </div>
              </div>
            </q-card-section>
            <q-separator />
            <q-card-actions vertical>
              <div class="q-mt-lg"></div>
            </q-card-actions>
            <div class="q-pa-md q-mt-sm" style="padding-top: 20px">
              <q-table
                style="height: 420px"
                :dense="$q.screen.lt.md"
                title=""
                :rows="historylist"
                :columns="columnsOverall"
                :filter="filter"
                :rows-per-page-options="[0]"
                v-model:pagination="pagination"
              >
                <template v-slot:bottom>
                  <div class="absolute-bottom-center">
                    Total: {{ renttotal }}
                  </div>
                </template>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <q-dialog v-model="addTenant" v-if="addTenant" persistent>
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="text-h6">Add New Tenant</div>
      </q-card-section>
      <q-card-section>
        <form @submit="AddTenant">
          <div class="row justify-around">
            <div class="col-12 col-md-5">
              <q-input
                v-model="tenantDetails.firstName"
                filled
                label="First Name"
                required
              ></q-input>
            </div>
            <div class="col-12 col-md-5">
              <q-input
                v-model="tenantDetails.lastName"
                filled
                label="Last Name"
                required
              ></q-input>
            </div>
          </div>
          <div class="row justify-around q-mt-md">
            <div class="col-12 col-md-5">
              <q-input
                v-model="tenantDetails.mobileNo"
                filled
                label="Phone No"
                required
              ></q-input>
            </div>
            <div class="col-12 col-md-5">
              <q-input
                v-model="tenantDetails.email"
                filled
                label="Email"
                required
              ></q-input>
            </div>
          </div>

          <div class="row justify-around q-mt-md">
            <div class="col-12 col-md-5">
              <q-input
                v-model="tenantDetails.address"
                filled
                label="Address"
                required
              ></q-input>
            </div>
            <div class="col-12 col-md-5">
              <q-input
                v-model="tenantDetails.passportNo"
                filled
                label="Passport No"
                required
              ></q-input>
            </div>
          </div>

          <div class="row justify-around q-mt-md">
            <div class="col-12 col-md-5">
              <q-input
                v-model="tenantDetails.alternativeContact"
                filled
                label="Alternative Contact"
                @click="checkcouple"
                required
              ></q-input>
            </div>
            <div class="col-12 col-md-5">
              <q-input
                v-model="tenantDetails.weeklyAmountDue"
                filled
                label="Weekly Amount Due"
                type="number"
                required
              ></q-input>
            </div>
          </div>

          <div class="row justify-around q-mt-md">
            <div class="col-12 col-md-5">
              <q-select
                filled
                v-model="tenantDetails.coupleTenancy"
                label="Couple Tenancy"
                :options="yesno"
                required
              />
            </div>

            <div class="col-12 col-md-5">
              <!-- <q-select filled label="Couple Tenancy" :options="yesno" /> -->
            </div>
          </div>

          <div v-if="isCouple">
            <q-card-section>
              <div class="text-h7 q-mt-md">Spouse details</div>
            </q-card-section>
            <div class="row justify-around">
              <div class="col-12 col-md-5">
                <q-input
                  v-model="spouseDetails.firstName"
                  filled
                  label="First Name"
                ></q-input>
              </div>
              <div class="col-12 col-md-5">
                <q-input
                  v-model="spouseDetails.lastName"
                  filled
                  label="Last Name"
                ></q-input>
              </div>
            </div>
            <div class="row justify-around q-mt-md">
              <div class="col-12 col-md-5">
                <q-input
                  v-model="spouseDetails.mobileNo"
                  filled
                  label="Phone No"
                ></q-input>
              </div>
              <div class="col-12 col-md-5">
                <q-input
                  v-model="spouseDetails.email"
                  filled
                  label="Email"
                ></q-input>
              </div>
            </div>

            <div class="row justify-around q-mt-md">
              <div class="col-12 col-md-5">
                <q-input
                  v-model="spouseDetails.alternativeContact"
                  filled
                  label="Alternative Contact"
                ></q-input>
              </div>
              <div class="col-12 col-md-5">
                <q-input
                  v-model="spouseDetails.passportNo"
                  filled
                  label="Passport No"
                ></q-input>
              </div>
            </div>
          </div>

          <div class="row justify-around q-mt-lg">
            <div class="q-pa-md q-gutter-sm justify-center">
              <q-btn color="primary" icon="save" label="Save" type="submit" />
              <q-btn
                color="amber"
                icon="cancel"
                label="Cancel"
                @click="addTenant = false"
              />
            </div>
          </div>
        </form>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog v-model="addBill" v-if="addBill" persistent>
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="text-h6">Add Bill</div>
      </q-card-section>
      <q-card-section>
        <form @submit="AddBill">
          <div class="row justify-around">
            <div class="col-12 col-md-5">
              <q-input
                v-model="bill.dueDate"
                label="Due Date"
                mask="####-##-##"
                filled
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy>
                      <q-date minimal v-model="bill.dueDate" type="date">
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-12 col-md-5">
              <q-input
                v-model="bill.dueAmount"
                filled
                required
                label="Due Amount"
                type="number"
              ></q-input>
            </div>
          </div>
          <div class="row justify-around q-mt-md">
            <div class="col-12 col-md-5">
              <q-input
                v-model="bill.paidAmount"
                filled
                required
                label="Paid Amount"
                type="number"
              ></q-input>
            </div>
            <div class="col-12 col-md-5"></div>
          </div>
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
            </div>
          </div>

          <div class="row justify-around q-mt-md" v-if="bill.fileUpload != ''">
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
                @click="geturl"
              >
                <q-icon name="download" />Download File</q-btn
              >
              <q-item-label class="q-mt-md text-center">{{
                bill.fileUpload
              }}</q-item-label>
            </div>
          </div>

          <div class="row justify-around q-mt-lg">
            <div class="q-pa-md q-gutter-sm justify-center">
              <q-btn color="primary" icon="save" label="Save" type="submit" />
              <q-btn
                color="amber"
                icon="cancel"
                label="Cancel"
                @click="closeBill"
              />
            </div>
          </div>
        </form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>


   
<script lang="ts">
import { computed, Ref, ref } from "vue";
import { useStore } from "vuex";
import { Bill, Property, rowdata, TenantDetails } from "src/model";
import { db, snapshotToArray, storage } from "boot/firebase";

const columns = [
  {
    name: "dueDate",
    label: "Date",
    field: (row: { dueDate: any }) => row.dueDate,
    align: "left",
    sortable: true,
    format: (val: any) => `${val}`,
  },
  {
    name: "dueAmount",
    label: "Amount",
    field: "dueAmount",
    align: "left",
  },
  {
    name: "paidAmount",
    label: "Paid",
    field: "paidAmount",
    align: "left",
  },
  {
    name: "actions",
    label: "Actions",
    field: "actions",
  },
];

const columnsOverall = [
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
  {
    name: "tenant",
    label: "Tenant",
    field: "tenant",
    align: "left",
  },
];
import { openURL, useQuasar } from "quasar";
import { get } from "http";
import { log } from "console";
export default {
  name: "Tenant",

  setup() {
    const $q = useQuasar();
    const store = useStore();
    const tenantDetails: Ref<TenantDetails> = ref(new TenantDetails());
    const spouseDetails: Ref<TenantDetails> = ref(new TenantDetails());
    const bill: Ref<Bill> = ref(new Bill());
    const property: Ref<Property> = ref(new Property());
    const loading = ref(false);
    const addTenant = ref(false);
    const addBill = ref(false);
    const isUpdate = ref(false);
    const isCouple = ref(false);
    const isCoupleComputed = computed(() => {
      loading.value = true;
      checkcouple();
      return isCouple.value;
    });
    property.value = store.getters.getProperty;
    const tenants: Ref<any[]> = ref([]);
    const Bills: Ref<any[]> = ref([]);
    const selectedfile = ref();
    const powerBillTotal = ref(0);
    const waterBillTotal = ref(0);
    const internetBillTotal = ref(0);
    const renttotal = ref(0);
    const selectedrow = ref();
    const paymenthistory: Ref<any[]> = ref([]);
    const rentlist: Ref<rowdata[]> = ref([]);
    const powerdue: Ref<Bill> = ref(new Bill());
    const waterdue: Ref<Bill> = ref(new Bill());
    const internetdue: Ref<Bill> = ref(new Bill());
    const propertyRentAmount = ref(0);
    const dueTotal = ref(0);
    db.ref("M_TenantDetails/")
      .orderByChild("propertyNo")
      .equalTo(property.value.propertyNo)
      .on("value", (resp) => {
        tenants.value = snapshotToArray(resp);
        tenants.value = tenants.value.filter(x=>x.isActive == 'true');
        propertyRentAmount.value = 0;
        dueTotal.value = 0;
        tenants.value.forEach((element) => {
          let thededuct = 0;
          propertyRentAmount.value += parseInt(element.weeklyAmountDue);
          db.ref("M_Payments/")
            .orderByChild("tenantid")
            .equalTo(element.key)
            .on("value", (returndata) => {
              if (element.weekDayDue != "") {
                let data = snapshotToArray(returndata);
                let paydate: any[] = [];
                
                data.forEach((paidDay) => {
                  paydate.push(paidDay.paymentdate);
                  // console.log("paid: " + paidDay.paymentdate + " amount: " + paidDay.amount);
                  // console.log("weekly amount"+element.weeklyAmountDue);
                  if(paidDay.amount != element.weeklyAmountDue){
                    thededuct+=(element.weeklyAmountDue - paidDay.amount);
                  }
                });
                  //console.log(thededuct);

                let num = getnum(element.weekDayDue);
                let paymentdays = getalldays(num);
                // console.log("all: " + paymentdays);
                paymentdays = paymentdays.filter(
                  (x) => new Date(x) >= new Date(element.createDate)
                );
                let compare = arr_diff(paymentdays, paydate);

                let currentdue = 0;
                // console.log("paymentDays: " + paymentdays);
                // console.log("paydate: " + paydate);
                // console.log(compare);

                compare.forEach((datadue) => {
                  // console.log(datadue);
                  currentdue += parseInt(element.weeklyAmountDue);
                });
                element.currentDue = currentdue - thededuct;
                dueTotal.value += currentdue- thededuct;
                db.ref("M_TenantDetails/").child(element.key).update(element);
              }
            });
        });
      });
    db.ref("M_Payments/")
      .orderByChild("tenantid")
      .on("value", (resp) => {
        paymenthistory.value = snapshotToArray(resp);
        let data = paymenthistory.value.filter((x) => x.isDeleted != "true");
        for (var x = 0; x < data.length; x++) {
          let a = new rowdata();
          let name = null;
          let d = data[x].tenantid;
          name = tenants.value.filter((x) => x.key == d);
          if (name.length > 0) {
            a.paymentdate = data[x].paymentdate;
            a.amount = data[x].amount;
            a.tenant = name[0].firstName;
            rentlist.value.push(a);

            renttotal.value += parseInt(data[x].amount);
          }
        }
      });
    db.ref("M_Bill/")
      .orderByChild("propertyNo")
      .equalTo(property.value.propertyNo)
      .on("value", (resp) => {
        Bills.value = snapshotToArray(resp);
      });

    function arr_diff(a1: any[], a2: any[]) {
      var a = [],
        diff = [];

      for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
      }

      for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
          delete a[a2[i]];
        } else {
          a[a2[i]] = true;
        }
      }

      for (var k in a) {
        diff.push(k);
      }

      return diff;
    }

    const historylist = computed(() => {
      return rentlist.value;
    });

    const Tenantlist = computed(() => {
      if (property.value.propertyNo == "") {
        window.location.href = "/";
      }
      return tenants.value;
    });

    const powerBillList = computed(() => {
      let powerbill = Bills.value.filter(
        (x) => x.providerType == "Power" && x.isDeleted == "false"
      );
      if (powerbill.length > 0) {
        powerdue.value = powerbill[powerbill.length - 1];
      }
      powerBillTotal.value = 0;
      powerbill.forEach((element) => {
        powerBillTotal.value += parseInt(element.dueAmount);
      });
      return powerbill;
    });

    const waterBillList = computed(() => {
      let waterbill = Bills.value.filter(
        (x) => x.providerType == "Water" && x.isDeleted == "false"
      );
      if (waterbill.length > 0) {
        waterdue.value = waterbill[waterbill.length - 1];
      }
      waterBillTotal.value = 0;
      waterbill.forEach((element) => {
        waterBillTotal.value += parseInt(element.dueAmount);
      });
      return waterbill;
    });

    const internetBillList = computed(() => {
      let internetbill = Bills.value.filter(
        (x) =>
          x.providerType == "Internet" &&
          x.isDeleted == "false" &&
          x.propertyNo == property.value.propertyNo
      );
      // console.log(internetbill);
      if (internetbill.length > 0) {
        internetdue.value = internetbill[internetbill.length - 1];
      }

      internetBillTotal.value = 0;
      internetbill.forEach((element) => {
        internetBillTotal.value += parseInt(element.dueAmount);
      });

      return internetbill;
    });

    function tenantModal() {
      addTenant.value = true;
      loading.value = true;
    }
    function ShowBillModal() {
      addBill.value = true;
      loading.value = false;
    }
    function billModal(type: string, providerName: string) {
      bill.value = new Bill();
      bill.value.propertyNo = property.value.propertyNo;
      bill.value.providerType = type;
      bill.value.providerName = providerName;
      addBill.value = true;
      loading.value = false;
    }
    function AddTenant() {
      tenantDetails.value.propertyNo = property.value.propertyNo;
      tenantDetails.value.spouse = spouseDetails.value;
      tenantDetails.value.currentDue = tenantDetails.value.weeklyAmountDue;
      var d = new Date();
      var n = d.getDay();
      tenantDetails.value.weekDayDue = getweekname(n);
      db.ref("M_TenantDetails").push(tenantDetails.value); //For Firebase add row ...working
      loading.value = false;
      addTenant.value = false;
      Reset();
      $q.notify({
        message: "Successfully saved tenant details",
        icon: "check",
        color: "green",
        position: "top",
      });
    }
    function AddBill() {
      if (isUpdate.value == false) {
        db.ref("M_Bill").push(bill.value);
        try {
          const storerage = storage
            .ref(selectedfile.value.target.files[0].name)
            .put(selectedfile.value.target.files[0]);
          let uploadvalue = 0;
          storerage.on("state_changed", (snapshot) => {
            uploadvalue =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // alert(uploadvalue);
          });
        } catch (err) {}
        $q.notify({
          message: "Successfully added bill",
          icon: "check",
          color: "green",
          position: "top",
        });
      } else {
        db.ref("M_Bill/").child(selectedrow.value.key).update(bill.value);
        try {
          const storerage = storage
            .ref(selectedfile.value.target.files[0].name)
            .put(selectedfile.value.target.files[0]);
          let uploadvalue = 0;
          storerage.on("state_changed", (snapshot) => {
            uploadvalue =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // alert(uploadvalue);
          });
        } catch (err) {}
        $q.notify({
          message: "Successfully updated bill",
          icon: "check",
          color: "green",
          position: "top",
        });
      }
      loading.value = false;
      addBill.value = false;
      Reset();
    }
    function checkcouple() {
      if (tenantDetails.value.coupleTenancy == "Yes") {
        isCouple.value = true;
      } else {
        isCouple.value = false;
      }
    }
    function Reset() {
      addBill.value = false;
      addTenant.value = false;
      isUpdate.value = false;
      bill.value = new Bill();
      tenantDetails.value = new TenantDetails();
    }
    function fileselected(event: any) {
      selectedfile.value = event;
      bill.value.fileUpload = event.target.files[0].name;
    }
    async function geturl() {
      const getfile = storage.ref().child(selectedrow.value.fileUpload);
      const fileurl = getfile.getDownloadURL();
      openURL(await fileurl);
    }

    function editbill(row: any) {
      isUpdate.value = true;
      selectedrow.value = row;
      bill.value = row;
      ShowBillModal();
    }
    function deletebill(row: any) {
      bill.value = Bills.value.filter((x) => x.key == row.key)[0]; //house.value.filter((x) => x.key == key)[0];
      bill.value.isDeleted = "true";
      db.ref("M_Bill/").child(row.key).update(bill.value);
      Reset();
      $q.notify({
        message: "Successfully deleted bill",
        icon: "check",
        color: "green",
        position: "top",
      });
    }
    function confirm(row: any) {
      $q.dialog({
        title: "Confirm",
        message: "Delete selected bill?",
        cancel: true,
        persistent: true,
      }).onOk(() => {
        deletebill(row);
      });
    }
    function gotoTenantDetails(tenant: any) {
      store.commit("setTenant", tenant);
      window.location.href = "/#/tenantdetails";
    }
    function closeBill() {
      addBill.value = false;
    }

    function getalldays(num: number) {
      let days = [];
      var d = new Date('2021/01/01'),
      year = d.getFullYear();
      d.setDate(1);
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
        // console.log(pushDate.getFullYear() + "/" + month + "/" + day);
        if (
          new Date(pushDate.getFullYear() + "/" + month + "/" + day) <
          new Date()
        ) {
           days.push(pushDate.getFullYear() + "/" + month + "/" + day);
        }
        d.setDate(d.getDate() + 7);
      }
      return days;
    }

    function getnum(dueday: string) {
      var num = 0;
      switch (dueday) {
        case "Monday":
          num = 1;
          break;
        case "Tuesday":
          num = 2;
          break;
        case "Wednesday":
          num = 3;
          break;
        case "Thursday":
          num = 4;
          break;
        case "Friday":
          num = 5;
          break;
        case "Saturday":
          num = 6;
          break;
        case "Sunday":
          num = 0;
          break;
      }
      return num;
    }

    function getweekname(dueday: number) {
      var weekday = "";
      switch (dueday) {
        case 1:
          weekday = "Monday";
          break;
        case 2:
          weekday = "Tuesday";
          break;
        case 3:
          weekday = "Wednesday";
          break;
        case 4:
          weekday = "Thursday";
          break;
        case 5:
          weekday = "Friday";
          break;
        case 6:
          weekday = "Saturday";
          break;
        case 0:
          weekday = "Sunday";
          break;
      }
      return weekday;
    }

    return {
      closeBill,
      historylist,
      gotoTenantDetails,
      geturl,
      confirm,
      editbill,
      fileselected,
      loading,
      addTenant,
      Tenantlist,
      tenantModal,
      AddTenant,
      addBill,
      columnsOverall,
      columns,
      powerBillList,
      powerFilter: ref(""),
      powerBillTotal,

      waterBillList,
      waterFilter: ref(""),
      waterBillTotal,

      internetBillList,
      internetFilter: ref(""),
      internetBillTotal,
      filter: ref(""),

      renttotal,
      yesno: ["Yes", "No"],
      tenantDetails,
      spouseDetails,
      checkcouple,
      isCouple,
      isCoupleComputed,
      property,
      bill,
      billModal,
      AddBill,

      pagination: ref({
        sortBy: "paymentdate",
        descending: true,
        rowsPerPage: 5,
      }),

      powerdue,
      waterdue,
      internetdue,
      propertyRentAmount,
      dueTotal,
    };
  },
};
</script>
<style>
::-webkit-scrollbar {
  display: none;
}
.notranslate material-icons q-icon {
  display: none;
}
</style>

