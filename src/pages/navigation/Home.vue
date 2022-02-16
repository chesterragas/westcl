<template>
  <q-page class="boxed-page">
    <div v-if="loading"></div>
    <div class="row">
      <div class="col-12 col-md-4 q-mx-md">
        <q-btn
          size="md"
          class="glossy"
          color="teal"
          icon="add"
          @click="AddModal"
          >Add Property</q-btn
        >
      </div>
      <div class="col-12 col-md-3 q-mx-md">
        <q-input dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>

    <div class="row justify-evenly" v-if="hcount">
      <div
        class="col-12 col-md-3 q-mx-sm"
        v-for="item in hcount"
        :key="item.key"
      >
        <q-card class="q-ma-lg">
          <q-card-actions align="right">
            <input
              type="file"
              id="selectedFile"
              style="display: none"
              @change="fileselected"
            />
            <q-btn
              class="glossy"
              color="green"
              icon="photo"
              @click="UploadFile(item.key)"
              onclick="document.getElementById('selectedFile').click();"
            ></q-btn>

            <q-btn
              class="glossy"
              color="blue"
              icon="edit"
              @click="EditProperty(item.key)"
            ></q-btn>

            <q-btn
              class="glossy"
              color="red"
              icon="delete"
              @click="confirm(item.key)"
            ></q-btn>
            
          </q-card-actions>
          <div class="col-3" bordered>
            <q-img 
            class="center" style="height:250px;"
              :src="item.propertyPicShow"
              basic
              @click="checktenant(item.propertyNo)"
            />
          </div>
          <div class="col-12" bordered>
            <div class="text-h6 text-center">{{ item.propertyNo }}</div>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>

  <q-dialog v-model="modalshow" v-if="modalshow">
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="text-h6" v-if="!isUpdate">Add New Property</div>
        <div class="text-h6" v-if="isUpdate">Update Property</div>
      </q-card-section>
      <q-card-section>
        <form @submit="AddProperty">
          <div class="row justify-around">
            <div class="col-12 col-md-5">
              <q-input
                v-model="property.propertyNo"
                filled
                required
                label="Property No."
              ></q-input>
            </div>
            <div class="col-12 col-md-5">
              <q-input
                v-model="property.company"
                filled
                required
                label="Company"
              ></q-input>
            </div>
          </div>
          <div class="row justify-around q-mt-md">
            <div class="col-12 col-md-5">
              <q-input
                v-model="rentamount.agentName"
                filled
                required
                label="Agent/Landlord Name"
              ></q-input>
            </div>
            <div class="col-12 col-md-5">
              <q-input
                v-model="property.officeAddress"
                filled
                required
                label="Office Address"
              ></q-input>
            </div>
          </div>
          <div class="row justify-around q-mt-md">
            <div class="col-12 col-md-5">
              <q-input
                v-model="property.contactNo"
                filled
                required
                label="Contact No."
              ></q-input>
            </div>
            <div class="col-12 col-md-5">
              <q-input
                v-model="property.streetAddress"
                filled
                required
                label="Street Address"
              ></q-input>
            </div>
          </div>
          <div class="row justify-around q-mt-md">
            <div class="col-12 col-md-5">
              <q-input
                v-model="property.powerProvider"
                filled
                required
                label="Power Provider"
              ></q-input>
            </div>
            <div class="col-12 col-md-5">
              <q-input
                v-model="property.internetProvider"
                filled
                required
                label="Internet Provider"
              ></q-input>
            </div>
          </div>
          <div class="row justify-around q-mt-md">
            <div class="col-12 col-md-5">
              <q-input
                v-model="property.waterBill"
                filled
                required
                label="Water Bill"
              ></q-input>
            </div>
            <div class="col-12 col-md-5">
              <q-select
                filled
                v-model="property.tfcUnit"
                label="TFC Unit"
                :options="yesno"
                required
              />
            </div>
          </div>
           <div class="row justify-around q-mt-md" v-if="!isUpdate">
            <div class="col-12 col-md-5">
              <q-input
                v-model="rentamount.rentAmount"
                filled
                required
                label="Rent Amount"
                type="number"
              ></q-input>
            </div>
            <div class="col-12 col-md-5">
              <q-input
                filled
                v-model="rentamount.bankAccount"
                label="Bank Account"
                required
              />
            </div>
          </div>
          <div class="row justify-around q-mt-md" v-if="!isUpdate">
            <div class="col-12 col-md-5">


          <q-input  q-input label="Date" required  readonly filled v-model="rentamount.rentDate" mask="##/##/####">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date minimal required v-model="rentamount.rentDate"  mask="DD/MM/YYYY" @update:model-value="$refs.qDateProxy.hide()">
                     
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

      
            </div>
            <div class="col-12 col-md-5">
              
            </div>
          </div>
          <div class="row justify-around q-mt-lg">
            <div class="q-pa-md q-gutter-sm justify-center">
              <q-btn
                v-if="isUpdate"
                color="primary"
                icon="edit"
                label="Update"
                @click="UpdateProperty()"
              />
              <q-btn
                v-if="!isUpdate"
                color="primary"
                icon="save"
                label="Save"
                type="submit"
                :disabled="!rentamount.rentDate"
              />
              <q-btn
                color="blue"
                icon="cancel"
                label="Cancel"
                @click="ResetProperty"
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
import { Property, RentAmount } from "../../model";
import { db, snapshotToArray, auth, storage } from "boot/firebase";
import { useStore } from "vuex";
import { api } from 'boot/axios'
import { openURL, useQuasar, date } from "quasar";

export default {
  name: "HomePage",

  setup() {
    const $q = useQuasar();
    const store = useStore();
    let house: Ref<any[]> = ref([]);
    let houseRent: Ref<any[]> = ref([]);
    const loading = ref(false);
    let property: Ref<Property> = ref(new Property());
    let rentamount: Ref<RentAmount> = ref(new RentAmount());
    let pix : Ref<any[]> = ref([]);


    db.ref("M_Property/").on("value", (resp) => {
        house.value = snapshotToArray(resp);
        loading.value = false;
        hcountFunction();
    });
    db.ref("M_PropertyRent/").on("value", (resp) => {
      houseRent.value = snapshotToArray(resp);
      loading.value = false;
    });

    const hcount = computed(() => {
      return house.value;
    });


    function hcountFunction(){
       db.ref("M_Property/").on("value", (resp) => {
        house.value = snapshotToArray(resp);
        loading.value = false;
      });
      db.ref("M_PropertyRent/").on("value", (resp) => {
        houseRent.value = snapshotToArray(resp);
        loading.value = false;
      });
      if (filter.value == "") {
        house.value= house.value.filter((x) => x.isDeleted != "true");
      } 
      else {
        house.value= house.value
          .filter((x) => x.propertyNo.indexOf(filter.value) > -1)
          .filter((x) => x.isDeleted != "true");
      }
      house.value.forEach((ho) => {
          if(ho.propertyPic != ""){
              geturl(ho.propertyPic).then(function(response) {
                  ho.propertyPicShow = response;
                });
          }
          else{
            ho.propertyPicShow = "statics/Capture.PNG";
          }
        });
    }

    const add = ref(false);
    const modalshow = ref(false);
    const isUpdate = ref(false);
    const keydata = ref("");
    const filter = ref("");
    function showmodal() {
      modalshow.value = true;
      loading.value = true;
    }


    function AddModal(){
      add.value = true;
      isUpdate.value = false;
      showmodal();
    }

    function AddProperty() {
      console.log(rentamount.value.rentDate);
      if(rentamount.value.rentDate != ""){
      add.value = false;
      var pushProperty = db.ref("M_Property/").push(property.value);
      if(pushProperty.key != null){
        rentamount.value.propertyNo = property.value.propertyNo;
        rentamount.value.propertyKey = pushProperty.key;
      }
      var pushPropertyRent = db.ref("M_PropertyRent/").push(rentamount.value);
     
      house = ref([]);
      ResetProperty();
      loading.value = false;
      hcountFunction();
      $q.notify({
        message: "Successfully saved property details",
        icon: "check",
        color: "green",
        position: "top",
      });
      }
    }

    function EditProperty(key: string) {
      add.value = false;
      isUpdate.value = true;
      keydata.value = key;
      property.value = house.value.filter((x) => x.key == key)[0];
      rentamount.value = houseRent.value.filter((x) => x.propertyKey == key)[0];
      showmodal();
    }

    function UpdateProperty() {
      db.ref("M_Property/").child(keydata.value).update(property.value);
      $q.notify({
        message: "Successfully update property details",
        icon: "check",
        color: "green",
        position: "top",
      });
      ResetProperty();
    }

    function confirm(key: string) {
      $q.dialog({
        title: "Confirm",
        message: "Delete selected property?",
        cancel: true,
        persistent: true,
      }).onOk(() => {
        DeleteProperty(key);
      });
    }

    function DeleteProperty(key: string) {
      property.value = house.value.filter((x) => x.key == key)[0];
      property.value.isDeleted = "true";
      db.ref("M_Property/").child(key).update(property.value);
      ResetProperty();
      $q.notify({
        message: "Successfully deleted property details",
        icon: "check",
        color: "green",
        position: "top",
      });
    }

    function checktenant(item: any) {
      window.location.href = "/#/tenant";
      let selected: Property[];
      selected = house.value.filter((x) => x.propertyNo == item);
      store.commit("setProperty", selected[0]);
    }

    function ResetProperty() {
      add.value = false;
      isUpdate.value = false;
      property.value = new Property();
      rentamount.value = new RentAmount();
      modalshow.value = false;
    }
    const selectedfile = ref();
    const selectedfileName = ref("");
    let selKey = "";
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

        
        property.value = house.value.filter((x) => x.key == selKey)[0];
        property.value.propertyPic = selectedfileName.value;
        db.ref("M_Property/").child(selKey).update(property.value);
        ResetProperty();
        hcountFunction();

        });

        $q.notify({
          message: "Uploading image...",
          icon: "check",
          color: "green",
          position: "top",
        });
      } catch (err) {}
    }

    function UploadFile(data:any){
      selKey = data;
    }

    function geturl(file: any) {
      const getfile = storage.ref().child(file);
      const fileurl = getfile.getDownloadURL();
      return fileurl;
      //openURL(await fileurl);
    }
 

    return {
      pix,
      UploadFile,
      selectedfile,
      fileselected,
      hcount,
      property,
      rentamount,
      checktenant,
      loading,
      house,
      add,
      isUpdate,
      AddProperty,
      showmodal,
      AddModal,
      modalshow,
      filter,
      EditProperty,
      UpdateProperty,
      DeleteProperty,
      ResetProperty,
      keydata,
      confirm,
      yesno: ["Yes", "No"],
    };
  },
};
</script>

<style>
.boxed-page {
  padding: 16px 46px;

  margin-left: auto;
  margin-right: auto;
}
.q-img {
  cursor: pointer;
}

/* html {
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: hidden;
} */

::-webkit-scrollbar {
  display: none;
}

.q-date__today{
  background: #50c7ff !important;
}
</style>
