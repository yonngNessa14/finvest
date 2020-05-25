import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const endPoint = 'http://116.203.85.174:9000/api/v1/';

 

var config2 = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded,multipart/form-data',
  },
};

/* -------------------------- AUTH -----------------------------*/

//Login
export const loginUser = async fd => {
    const res = await axios.post(`${endPoint}/rest-auth/login/`, fd,config2)
    return res
}

// Register Store
export const registerStore = async fd => {
  const res = await axios.post(`${endPoint}/store`, fd, config2);
  return res;
};

// Verify Pin
export const verifyPin = async fd => {
  const res = await axios.post(`${endPoint}/verify_pin`, fd, config2);
  return res;
};

//Pin Login
export const pinLogin = async fd => {
  const res = await axios.post(`${endPoint}/pin_login`, fd, config2);
  return res;
};

//Pin Reset
export const resetPin = async fd => {
  const res = await axios.post(`${endPoint}/reset_pin`, fd, config2);
  return res;
};

/*--------------------------------LOCAL STORE --------------------------*/
//Store Date
export const storeData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (e) {
    return false;
  }
};

//Read Date
export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    return false;
  }
};

export const removeData = async key => {
  try {
    const value = await AsyncStorage.removeItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    return false;
  }
};



/*=================== INVENTORY ===================*/

//Get All Products By Name
export const searchProductsByName = async val => {
  var res = await axios.get(
    `${endPoint}/product/${val}?api_token=${global.apiToken}`,
  );
  return res;
};

//Get All Products By BarCode
export const searchProductsByBarCode = async val => {
  var res = await axios.get(
    `${endPoint}/get_barcode/${val}?api_token=${global.apiToken}`,
  );
  return res;
};

//Get All Products
export const getAllProducts = async () => {
  var res = await axios.get(`${endPoint}/product?api_token=${global.apiToken}`);
  return res;
};

//Save New Product
export const saveNewProduct = async fd => {
  var config = {
    headers: {
      Authorization: `Bearer ${global.apiToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded,multipart/form-data',
    },
  };
  var res = await axios.post(`${endPoint}/product`, fd, config);
  return res;
};

//Update Product
export const updateProduct = async (id, fd) => {
  var config = {
    headers: {
      Authorization: `Bearer ${global.apiToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded,multipart/form-data',
    },
  };

  // console.log(`${endPoint}/product/${id}`, fd, config);
  var res = await axios.post(`${endPoint}/product/${id}`, fd, config);
  return res;
};

//Delete Product
export const deleteProduct = async id => {
  var res = await axios.get(
    `${endPoint}/delete_product/${id}?api_token=${global.apiToken}`,
  );
  return res;
};

/*=======================CUSTOMERS===================*/

//Get All Customers
export const getAllCustomers = async () => {
  var res = await axios.get(
    `${endPoint}/get_customers?api_token=${global.apiToken}`,
  );
  return res;
};

//Save New Customers
export const saveNewCustomer = async fd => {
  var config = {
    headers: {
      Authorization: `Bearer ${global.apiToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded,multipart/form-data',
    },
  };
  var res = await axios.post(`${endPoint}/save_customer`, fd, config);
  return res;
};

export const updateCustomer = async (id, fd) => {
  var config = {
    headers: {
      Authorization: `Bearer ${global.apiToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded,multipart/form-data',
    },
  };
  var res = await axios.post(`${endPoint}/save_customer/${id}`, fd, config);
  return res;
};

//Get All Customers By Details
export const getCustomersByDetails = async val => {
  var res = await axios.get(
    `${endPoint}/get_customers/${val}?api_token=${global.apiToken}`,
  );
  return res;
};

//Delete Customers
export const deleteCustomer = async id => {
  var res = await axios.get(
    `${endPoint}/delete_customer/${id}?api_token=${global.apiToken}`,
  );
  return res;
};

/*========================= MAKE SALES =====================*/

//Save New ORDER
export const saveNewOrder = async fd => {
  var config = {
    headers: {
      Authorization: `Bearer ${global.apiToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded,multipart/form-data',
    },
  };
  var res = await axios.post(`${endPoint}/save_order`, fd, config);
  return res;
};

//Save New Sales
export const saveNewSales = async fd => {
  var config = {
    headers: {
      Authorization: `Bearer ${global.apiToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded,multipart/form-data',
    },
  };
  var res = await axios.post(`${endPoint}/save_sales`, fd, config);
  return res;
};

/*========================== SALES ======================*/
// Get Sales Grouped by Date
export const getSalesGroupedByDate = async () => {
  var res = await axios.get(
    `${endPoint}/all_sales_by_date?api_token=${global.apiToken}`,
  );
  return res;
};

// Get Sales by Date
export const getByDate = async date => {
  var res = await axios.get(
    `${endPoint}/get_sales_by_date/${date}?api_token=${global.apiToken}`,
  );
  return res;
};

// Get Sales Grouped by Date
export const getSalesByID = async id => {
  var res = await axios.get(
    `${endPoint}/get_sales/${id}?api_token=${global.apiToken}`,
  );
  return res;
};

//Delete Sales
export const deleteSales = async id => {
  var res = await axios.get(
    `${endPoint}/delete_sales/${id}?api_token=${global.apiToken}`,
  );
  return res;
};

/*========================== PAYMENTS ======================*/
// Get Sales Grouped by Date
export const getPaymentGroupedByDate = async () => {
  var res = await axios.get(
    `${endPoint}/all_payments_by_date?api_token=${global.apiToken}`,
  );
  return res;
};

// Get Sales by Date
export const getPaymentByDate = async date => {
  var res = await axios.get(
    `${endPoint}/get_payments_by_date/${date}?api_token=${global.apiToken}`,
  );
  return res;
};

/*=========================== SALES REP ========================*/
//Get Sales Reps
export const getSalesRep = async () => {
  var res = await axios.get(
    `${endPoint}/get_sales_reps?api_token=${global.apiToken}`,
  );
  return res;
};

//Search for Sales  Reps
export const searchSalesRep = async val => {
  var res = await axios.get(
    `${endPoint}/search_sales_reps/${val}?api_token=${global.apiToken}`,
  );
  return res;
};

//Get A Single Sales Rep
export const singleSalesRep = async ID => {
  var res = await axios.get(
    `${endPoint}/get_sales_reps/${ID}?api_token=${global.apiToken}`,
  );
  return res;
};

//Save New Sales Rep
export const saveNewSalesRep = async fd => {
  var config = {
    headers: {
      Authorization: `Bearer ${global.apiToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded,multipart/form-data',
    },
  };
  var res = await axios.post(`${endPoint}/save_sales_rep`, fd, config);
  return res;
};

//Save New Sales Rep
export const updateSalesRep = async (id, fd) => {
  var config = {
    headers: {
      Authorization: `Bearer ${global.apiToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded,multipart/form-data',
    },
  };
  var res = await axios.post(`${endPoint}/save_sales_rep/${id}`, fd, config);
  return res;
};

export const getSalesGroupedByDateSalesRep = async fd => {
  var config = {
    headers: {
      Authorization: `Bearer ${global.apiToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded,multipart/form-data',
    },
  };
  var res = await axios.post(`${endPoint}/all_sales_by_date?`, fd, config);
  return res;
};

//Delete Sales Reps
export const deleteSalesReps = async id => {
  var res = await axios.get(
    `${endPoint}/delete_sales_reps/${id}?api_token=${global.apiToken}`,
  );
  return res;
};

/*==================REPORTS=================*/
//Get Reports
export const appReports = async ID => {
  var res = await axios.get(`${endPoint}/reports?api_token=${global.apiToken}`);
  return res;
};
