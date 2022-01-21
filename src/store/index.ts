import { store } from 'quasar/wrappers';
import { Property, TenantDetails } from 'src/model';
import { createStore } from 'vuex';

// import example from './module-example'
// import { ExampleStateInterface } from './module-example/state';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export interface StateInterface {

  property: Property | null;
  tenant: any | null;
}

export default store(function (/* { ssrContext } */) {
  const Store = createStore<StateInterface>({
    state: {
      property: new Property(),
      tenant : null
    },
    mutations: {
      // put sychronous functions for changing state e.g. add, edit, delete
      setProperty(state: StateInterface, property: Property) {
        state.property = property;
      },
      setTenant(state: StateInterface, tenant: any) {
        state.tenant = tenant;
      },
      setTenantCouple(state: StateInterface, couple: any) {
        state.tenant.coupleTenancy = couple;
      },
      setTenantWeekdaydue(state: StateInterface, week: any) {
        state.tenant.weekDayDue = week;
      },
      setTenantBank(state: StateInterface, bankAccount: any) {
        state.tenant.bankAccount = bankAccount;
      }
    },
    getters: {
      getProperty: state => {
      	return state.property;
      },
     
      getTenant: state => {
      	return state.tenant;
    	},
  },


   
  });

  return Store;
});
