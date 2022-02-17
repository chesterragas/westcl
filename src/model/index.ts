
import { auth } from "boot/firebase";

export class RentAmount{
  agentName = "";
  propertyKey = "";
  propertyNo = "";
  rentAmount="";
  bankAccount = "";
  rentDate = "";
  updateDate = new Date().toLocaleDateString();
  updateUser = auth.currentUser?.email;
}

export class Property {
  company = "";
  contactNo = "";
  officeAddress = "";
  propertyNo = "";
  streetAddress = "";
  powerProvider = "";
  internetProvider = "";
  waterBill = "";
  tfcUnit = "No";
  propertyPic = "";
  propertyPicShow = "";
  isDeleted = "false";
  createDate = new Date().toLocaleDateString();
  createUser = auth.currentUser?.email;
  updateDate = new Date().toLocaleDateString();
  updateUser = auth.currentUser?.email;
  key="";
}



export class rowdata {
      paymentdate = "";
      amount = "";
      tenant = "";
    }

export class TenantDetails{
  propertyNo = "";
  propertyKey = "";
  firstName = "";
  lastName = "";
  mobileNo = "";
  email = "";
  address = "";
  passportNo = "";
  alternativeContact = "";
  coupleTenancy = "No";
  weeklyAmountDue = "";
  currentDue = "";
  modeOfPayment = "";
  spouse: TenantDetails | undefined;
  isActive = "true";
  weekDayDue = "Monday";
  bankAccount = "";
  startDate = "";
  isDeleted = false;
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
  paymentdate = "";
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
  dueDate = "";
  dueAmount = "";
  paidAmount = "";
  fileUpload = "";
  createDate = new Date().toLocaleDateString();
  createUser = auth.currentUser?.email;
  updateDate = new Date().toLocaleDateString();
  updateUser = auth.currentUser?.email;
  isDeleted = "false";
}