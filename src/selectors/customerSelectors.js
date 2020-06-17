export const findCustomer = (customers, _id) => {
  console.log(customers);
  console.log(_id);
  return customers.filter((user) => user._id == _id);
};
