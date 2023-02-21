async function redirectIfNotSellerEndpoint(req, res) {
  let result = { data: [], success: false };

  try {
    if (res.locals.user == undefined) {
      result.data = [];
      result.success = false;
      result.redirect = true;
    } else {
      if (res.locals.user.role != "seller") {
        result.data = [];
        result.success = false;
        result.redirect = true;
      } else {
        let data = [];
        result.success = true;
        result.data = data;
      }
    }
  } catch (E) {
    console.log(E);
    result.success = false;
    result.data = [];
  }
  res.json(result);
}

async function redirectIfNotCustomerEndpoint(req, res) {
  let result = { data: [], success: false };

  try {
    if (res.locals.user == undefined) {
      result.data = [];
      result.success = false;
      result.redirect = true;
    } else {
      if (res.locals.user.role != "customer") {
        result.data = [];
        result.success = false;
        result.redirect = true;
      } else {
        let data = [];
        result.success = true;
        result.data = data;
      }
    }
  } catch (E) {
    console.log(E);
    result.success = false;
    result.data = [];
  }
  res.json(result);
}

module.exports = {redirectIfNotCustomerEndpoint,redirectIfNotSellerEndpoint}