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
  <div class="q-mx-md q-mt-md text-h6">
    Total: {{ dueTotal }}
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
                    Due: {{ powerBillTotal }}
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
                      
                    </q-td>
                  </q-tr>
                </template>

                <template v-slot:bottom>
                  <div class="absolute-bottom-center">
                    Due: {{ waterBillTotal }}
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
                <div>Add Bill</div>
                </q-btn>
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
                      
                    </q-td>
                  </q-tr>
                </template>

                <template v-slot:bottom>
                  <div class="absolute-bottom-center">
                    Due: {{ internetBillTotal }}
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
                  <div class="text-subtitle2">Current Agent </div>
                </div>
                <div class="col-6 col-md-6">
      
                  <div class="text-subtitle2">{{ RentAmountBank.rentAmount }}</div>
                  <div class="text-subtitle2">{{ RentAmountBank.bankAccount }}</div>
                  <div class="text-subtitle2">{{ RentAmountBank.agentName }}</div>
                </div>
              </div>
            </q-card-section>
            <q-separator />
            
            <q-card-actions vertical>
              <q-btn
                class="glossy"
                color="teal"
                @click="RentAmountModal()"
              >
                <q-icon name="edit" />
                <div>Update</div></q-btn
              >
            </q-card-actions>
            <div class="q-pa-md">
              <q-table
                style="height: 420px"
                :dense="$q.screen.lt.md"
                title=""
                :columns="columnsOverall"
                :rows="RentList"
                :filter="filter"
                :rows-per-page-options="[0]"
                v-model:pagination="pagination"
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
                <template v-slot:body="props">
                  <q-tr :props="props">
                    <q-td key="rentDate" :props="props">{{
                      props.row.rentDate
                    }}</q-td>
                    <q-td key="agentName" :props="props">{{
                      props.row.agentName
                    }}</q-td>
                    <q-td key="rentAmount" :props="props">{{
                      props.row.rentAmount
                    }}</q-td>
                    <q-td key="bankAccount" :props="props">{{
                      props.row.bankAccount
                    }}</q-td>
                    <q-td key="actions" :props="props">
                      <q-btn
                        class="glossy"
                        color="blue"
                        icon="edit"
                        size="sm"
                        no-caps
                        @click="editRent(props.row)"
                      ></q-btn>
                      
                    </q-td>
                  </q-tr>
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
                type="email"
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
               <q-input
                v-model="TDate"
                label="Starting Date"
                filled
                
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer" @click="openEndDate()">
                    <q-popup-proxy v-if="closethis">
                      <q-date minimal v-model="tenantDetails.startDate" type="date" @click="closeEndDate(tenantDetails.startDate)">
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>

            <div class="col-12 col-md-5">
              <q-select
                filled
                v-model="tenantDetails.weekDayDue"
                label="Weekly Due Day"
                :options="weekdays"
                required
              />
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
                v-model="DDate"
                label="Due Date"
                filled
                required
              >
               <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer" @click="openEndDate()">
                    <q-popup-proxy v-if="closethis">
                      <q-date minimal v-model="bill.dueDate" type="date" @click="closeEndDate(bill.dueDate)">
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
          <div class="row justify-around q-mt-md" v-if="isUpdate">
            <div class="col-12 col-md-6">
              <q-btn
                style="width: 100%"
                class="glossy"
                color="red"
                type="button"
                @click="confirm"
              >
                <q-icon name="delete" />Delete</q-btn
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

  <q-dialog v-model="updateRent" v-if="updateRent" persistent>
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="text-h6">Update Rent</div>
      </q-card-section>
      <q-card-section>
        <form >
          <div class="row justify-around">
            <div class="col-12 col-md-5">

            <q-input
                v-model="RDDate"
                label="Date"
                filled
                required
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer" @click="openEndDate()">
                    <q-popup-proxy v-if="closethis">
                      <q-date minimal v-model="newRentAmountBank.rentDate" type="date" @click="RcloseEndDate(newRentAmountBank.rentDate)">
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-12 col-md-5">
              <q-input
                v-model="newRentAmountBank.rentAmount"
                filled
                required
                label="Rent Amount"
                type="number"
              ></q-input>
            </div>
          </div>
          <div class="row justify-around q-mt-md">
          <div class="col-12 col-md-5">
              <q-input
                v-model="newRentAmountBank.agentName"
                filled
                required
                label="Agent Name"
                type="text"
              ></q-input>
            </div>
            <div class="col-12 col-md-5">
              <q-input
                v-model="newRentAmountBank.bankAccount"
                filled
                required
                label="Bank Account"
                type="text"
              ></q-input>
            </div>
            
          </div>
       
          <div class="row justify-around q-mt-lg">
            <div class="q-pa-md q-gutter-sm justify-center">
              <q-btn color="primary" icon="save" label="Save" type="button" @click="InsertRentAmount" />
              <q-btn
                color="amber"
                icon="cancel"
                label="Cancel"
                @click="closeRent"
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
import { Bill, Property, rowdata, TenantDetails, RentAmount } from "src/model";
import { db, snapshotToArray, storage } from "boot/firebase";
import { openURL, useQuasar, date } from "quasar";
import { get } from "http";
import { log } from "console";
const columns = [
  {
    name: "dueDate",
    label: "Date",
    field: (row: { dueDate: any }) => row.dueDate,
    align: "left",
    sortable: true,
    //format: (val: any) => `${val}`,
    format: (val: any) => date.formatDate(val, 'DD-MM-YYYY')
  },
  {
    name: "dueAmount",
    label: "Due",
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
    name: "rentDate",
    label: "Date",
    field: (row: { rentDate: any }) => row.rentDate,
    align: "left",
    sortable: true,
    format: (val: any) => date.formatDate(val, 'DD-MM-YYYY')
  },
  {
    name: "agentName",
    label: "Agent Name",
    field: "agentName",
    align: "left",
  },
  {
    name: "rentAmount",
    label: "Amount",
    field: "rentAmount",
    align: "left",
  },
  {
    name: "bankAccount",
    label: "Bank Account",
    field: "bankAccount",
    align: "left",
  },
  {
    name: "actions",
    label: "Actions",
    field: "actions",
  },
];

export default {
  name: "Tenant",

  setup() {
    const $q = useQuasar();
    const store = useStore();
    const tenantDetails: Ref<TenantDetails> = ref(new TenantDetails());
    const spouseDetails: Ref<TenantDetails> = ref(new TenantDetails());
    const bill: Ref<Bill> = ref(new Bill());
    const property: Ref<Property> = ref(new Property());
    const rentamount: Ref<RentAmount> = ref(new RentAmount());
    const loading = ref(false);
    const addTenant = ref(false);
    const addBill = ref(false);
    const updateRent = ref(false);
    const isUpdate = ref(false);
    const isUpdateRent = ref(false);
    const isCouple = ref(false);
    const isCoupleComputed = computed(() => {
      loading.value = true;
      checkcouple();
      return isCouple.value;
    });
    property.value = store.getters.getProperty;
    const tenants: Ref<any[]> = ref([]);
    const Bills: Ref<any[]> = ref([]);
    const RentAmounts: Ref<any[]> = ref([]);
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
    const RentAmountBank : Ref<RentAmount> = ref(new RentAmount());
    const newRentAmountBank : Ref<RentAmount> = ref(new RentAmount());
    const propertyRentAmount = ref(0);
    const dueTotal = ref(0);
    const DDate = ref("");
    const RDDate = ref("");
    const closethis = ref(true);

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
                  if(paidDay.amount != element.weeklyAmountDue){
                    thededuct+=(element.weeklyAmountDue - paidDay.amount);
                  }
                });

                let num = getnum(element.weekDayDue);
                let paymentdays = getalldays(num);
                paymentdays = paymentdays.filter(
                  (x) => new Date(x) >= new Date(element.startDate)
                );
                let compare = arr_diff(paymentdays, paydate);

                let currentdue = 0;

                compare.forEach((datadue) => {
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
    db.ref("M_PropertyRent/")
       .orderByChild("propertyKey")
      .equalTo(property.value.key)
      .on("value", (resp) => { 
        RentAmounts.value = snapshotToArray(resp);
       RentAmountBank.value = RentAmounts.value[RentAmounts.value.length - 1];
    });

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
        powerBillTotal.value += parseInt(element.dueAmount)  - parseInt(element.paidAmount);
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
        waterBillTotal.value += parseInt(element.dueAmount)  - parseInt(element.paidAmount);
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
      if (internetbill.length > 0) {
        internetdue.value = internetbill[internetbill.length - 1];
      }

      internetBillTotal.value = 0;
      internetbill.forEach((element) => {
        internetBillTotal.value += parseInt(element.dueAmount)  - parseInt(element.paidAmount);
      });

      return internetbill;
    });

    const RentList = computed(() => {
      return RentAmounts.value.reverse();
    });

    const TDate = computed(() => {
      return date.formatDate(tenantDetails.value.startDate, 'DD/MM/YYYY')
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

    function tenantModal() {
      addTenant.value = true;
      loading.value = true;
    }
    function ShowBillModal() {
      addBill.value = true;
      loading.value = false;
      closethis.value = true;
   
    }
    function billModal(type: string, providerName: string) {
      bill.value = new Bill();
      bill.value.propertyNo = property.value.propertyNo;
      bill.value.providerType = type;
      bill.value.providerName = providerName;
      addBill.value = true;
      loading.value = false;
      isUpdate.value = false;
    }
    function RentAmountModal(){
      newRentAmountBank.value = new RentAmount();
      updateRent.value = true;
      loading.value = false;
    }
    function AddTenant() {
      tenantDetails.value.propertyNo = property.value.propertyNo;
      tenantDetails.value.spouse = spouseDetails.value;
      tenantDetails.value.currentDue = tenantDetails.value.weeklyAmountDue;
     
      var d = new Date();
      var n = d.getDay();
      //tenantDetails.value.weekDayDue = getweekname(n);
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
        bill.value.dueDate = date.formatDate(bill.value.dueDate, 'DD/MM/YYYY');
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
      } 
      else {
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
    function UpdateRentAmount(){

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
      DDate.value = bill.value.dueDate;
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
    function confirm() {
      $q.dialog({
        title: "Confirm",
        message: "Delete selected bill?",
        cancel: true,
        persistent: true,
      }).onOk(() => {
        deletebill(bill.value);
      });
    }
    function gotoTenantDetails(tenant: any) {
      store.commit("setTenant", tenant);
      window.location.href = "/#/tenantdetails";
    }
    function closeBill() {
      addBill.value = false;
      bill.value = new Bill();
      DDate.value = "";
    }
    function closeRent(){
      updateRent.value = false;
    }

    function getalldays(num: number) {
      let days = [];
      var d = new Date(new Date().getFullYear(), 0, 1),
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

    function closeEndDate(item : any){
      console.log(item);
      if(item != ""){
       DDate.value = date.formatDate(item, 'DD/MM/YYYY');
       closethis.value = false;
      }
    }

    function RcloseEndDate(item : any){
      
      if(item != ""){
       RDDate.value = date.formatDate(item, 'DD/MM/YYYY');
       closethis.value = false;
      }
    }
    function openEndDate(){
       closethis.value = true;
    }

    function InsertRentAmount(){
      newRentAmountBank.value.propertyNo = property.value.propertyNo;
      newRentAmountBank.value.propertyKey = property.value.key;
      newRentAmountBank.value.rentDate = date.formatDate(newRentAmountBank.value.rentDate, 'DD/MM/YYYY');
      db.ref("M_PropertyRent").push(newRentAmountBank.value);
      loading.value = false;
      newRentAmountBank.value = new RentAmount();
      closeRent();
      $q.notify({
          message: "Successfully Update",
          icon: "check",
          color: "green",
          position: "top",
        });
    }

    function ShowRentModal() {
      updateRent.value = true;
      loading.value = false;
      closethis.value = true;
    }

    function editRent(row:any){
      isUpdateRent.value = true;
      newRentAmountBank.value = row;
      RDDate.value = newRentAmountBank.value.rentDate;
      ShowRentModal();
    }
    return {
      isUpdateRent,
      editRent,
      InsertRentAmount,
      closethis,
      openEndDate,
      closeEndDate,
      RcloseEndDate,
      DDate,
      RDDate,
      TDate,
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

      RentList,
      RentAmountBank,
      RentAmountModal,
      updateRent,
      UpdateRentAmount,
      newRentAmountBank,
      closeRent,

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
      isUpdate,

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
      weekdays: ref([
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ]),
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

