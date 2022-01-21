
import { auth } from "boot/firebase";

export class RentAmount{
  propertyNo = "";
  rentAmount =0;
  bankAccount = "";
}

export class Property {
  agentName = "";
  company = "";
  contactNo = "";
  officeAddress = "";
  propertyNo = "";
  streetAddress = "";
  powerProvider = "";
  internetProvider = "";
  waterBill = "";
  tfcUnit = "";
  isDeleted = "false";
  createDate = new Date().toLocaleDateString();
  createUser = auth.currentUser?.email;
  updateDate = new Date().toLocaleDateString();
  updateUser = auth.currentUser?.email;
}



export class rowdata {
      paymentdate = "";
      amount = "";
      tenant = "";
    }

export class TenantDetails{
  propertyNo = "";
  firstName = "";
  lastName = "";
  mobileNo = "";
  email = "";
  address = "";
  passportNo = "";
  alternativeContact = "";
  coupleTenancy = "";
  weeklyAmountDue = "";
  currentDue = "";
  modeOfPayment = "";
  spouse: TenantDetails | undefined;
  isActive = "true";
  weekDayDue = "";
  bankAccount = "";
  createDate = new Date().toLocaleDateString();
  createUser = auth.currentUser?.email;
  updateDate = new Date().toLocaleDateString();
  updateUser = auth.currentUser?.email;
}

export class TenantDueDateDay{
  tenantid = "";
  weekDayDue = "";
  createDate = new Date().toLocaleDateString();
  createUser = auth.currentUser?.email;
  updateDate = new Date().toLocaleDateString();
  updateUser = auth.currentUser?.email;
}

export class Payment{
  tenantid = "";
  paymentdate = new Date().toISOString().split("T")[0];
  amount = "0";
  method = "";
  bankaccount = "";
  isDeleted = "false";
  createDate = new Date().toLocaleDateString();
  createUser = auth.currentUser?.email;
  updateDate = new Date().toLocaleDateString();
  updateUser = auth.currentUser?.email;
}

export class TenantDocs{
  tenantid = "";
  filename = "";
  isDeleted = "false";
  createDate = new Date().toLocaleDateString();
  createUser = auth.currentUser?.email;
  updateDate = new Date().toLocaleDateString();
  updateUser = auth.currentUser?.email;
}

export class Bill{
  propertyNo = "";
  providerType = "";
  providerName = "";
  dueDate = new Date().toLocaleDateString();
  dueAmount = "0";
  paidAmount = "0";
  fileUpload = "";
  createDate = new Date().toLocaleDateString();
  createUser = auth.currentUser?.email;
  updateDate = new Date().toLocaleDateString();
  updateUser = auth.currentUser?.email;
  isDeleted = "false";
}