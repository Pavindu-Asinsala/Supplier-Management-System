import React, { useEffect, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import PersonIcon from "@mui/icons-material/Person";
import StoreIcon from "@mui/icons-material/Store";
import MailIcon from "@mui/icons-material/Mail";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import PhoneIcon from "@mui/icons-material/Phone";
import PlaceIcon from "@mui/icons-material/Place";
import ClearIcon from "@mui/icons-material/Clear";
import { NavLink, useParams, useHistory } from "react-router-dom";

const Details = () => {
  const [getuserdata, setUserdata] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [newProduct, setNewProduct] = useState({
    productName: "",
    quantity: "",
    date: "",
    stock: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const { id } = useParams("");
  const history = useHistory();

  const getdata = async () => {
    try {
      const userRes = await fetch(`/getuser/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const userData = await userRes.json();

      if (userRes.status === 422 || !userData) {
        console.log("error ");
      } else {
        setUserdata(userData);

        // Fetch product details associated with the user
        const productRes = await fetch(`/getProductDetails/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const productData = await productRes.json();

        if (productRes.status === 422 || !productData) {
          console.log("error fetching product details");
        } else {
          setProductDetails(productData);
        }
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const deleteuser = async (id) => {
    try {
      const res2 = await fetch(`/deleteuser/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const deleteuser = await res2.json();

      if (res2.status === 422 || !deleteuser) {
        console.log("error");
      } else {
        console.log("user deleted");
        history.push("/");
      }
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  const addProductDetails = async () => {
    try {
      const res = await fetch(`/addProductDetails/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      const data = await res.json();

      if (res.status === 422 || !data) {
        console.log("error adding product details");
      } else {
        console.log("product details added");
        setAlertMessage("Stock added successfully!"); // Set alert message
        setNewProduct({
          productName: "",
          quantity: "",
          date: "",
          stock: "",
        });

        // You may choose to refetch the product details after adding a new one
        getdata();

        setShowForm(false); // Close the form after adding details

        setTimeout(() => {
          setAlertMessage("");
        }, 3000);
      }
    } catch (error) {
      console.error("Error adding product details", error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const res = await fetch(`/deleteProduct/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const deletedProduct = await res.json();

      if (res.status === 422 || !deletedProduct) {
        console.log("error deleting product");
      } else {
        console.log("product deleted");
        // Refetch the product details after deleting one
        getdata();
      }
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  return (
    <div className="container mt-5">
      <center>
        <h1 style={{ fontWeight: 400 }}>Supplier Details</h1>
      </center>

      <div className="row">
        <div className="left_view col-lg-6 col-md-6 col-12">
          <img src="/profile.png" style={{ width: 100 }} />
          <h3 className="mt-5">
            <PersonIcon /> Supplier Name : <span>{getuserdata.name}</span>
          </h3>
          <h3 className="mt-3">
            <StoreIcon /> Company : <span>{getuserdata.age}</span>
          </h3>
          <p className="mt-3">
            <MailIcon /> Email: <span> {getuserdata.email} </span>
          </p>
          <p className="mt-3">
            <FingerprintIcon /> NIC Number: <span>{getuserdata.work}</span>
          </p>
          <p className="mt-3">
            <PhoneIcon /> Contact number:
            <span> +94 {getuserdata.mobile} </span>
          </p>
          <p className="mt-3">
            <PlaceIcon /> Address: <span> {getuserdata.add} </span>
          </p>
          <p className="mt-3">
            <DescriptionIcon /> Description: <span>{getuserdata.desc}</span>
          </p>
        </div>

        <div className="right_view col-lg-5 col-md-6 col-12">
          <div className="add_btn">
            <NavLink to={`/edit/${getuserdata._id}`}>
              {" "}
              <button
              className="btn btn-danger"
              onClick={() => deleteuser(getuserdata._id)}
            >
              <DeleteIcon />
            </button>
              <button className="btn btn-primary mx-3">
                <CreateIcon />
              </button>{" "}
            </NavLink>
           
          </div>
        </div>
      </div>

      <style>
        {`
    body, html {
      margin: 0;
      padding: 0;
    }
    /* Customize the scrollbar */
    ::-webkit-scrollbar {
      width: 12px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: gray; /* Change to your desired color */
      border-radius: 6px;
    }

    ::-webkit-scrollbar-track {
      background-color: #f1f1f1; /* Change to your desired background color */
      border-radius: 6px;
    }
  `}
      </style>

      {showForm && (
        <div className="row mt-5">
          <center>
            <h3>Add Stock Details</h3>
          </center>
          {alertMessage && (
            <div className="alert alert-success" role="alert">
              {alertMessage}
            </div>
          )}
          <form className="mt-4 w-50 mx-auto">
            <div className="mb-3">
              <label htmlFor="productName" className="form-label">
                Product Name
              </label>
              <input
                type="text"
                className="form-control"
                id="productName"
                value={newProduct.productName}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    productName: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">
                Quantity
              </label>
              <input
                type="text"
                className="form-control"
                id="quantity"
                value={newProduct.quantity}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    quantity: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                Date
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                value={newProduct.date}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    date: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="stock" className="form-label">
                Stock Value (Rs.)
              </label>
              <input
                type="text"
                className="form-control"
                id="stock"
                value={newProduct.stock}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    stock: e.target.value,
                  })
                }
              />
            </div>
            <center>
              <button
                type="button"
                className="btn btn-primary"
                onClick={addProductDetails}
              >
                Add Stock Details
              </button>
            </center>
          </form>
        </div>
      )}

      <div className="row mt-5">
        <div>
          <center>
            <h3>Stock Details</h3>
          </center>
          <button
            className="btn btn-success mx-3"
            onClick={() => setShowForm(!showForm)}
          >
            + Add Stock
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Product Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Stock Value (Rs.)</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {productDetails.map((product, index) => (
              <tr key={index}>
                <td>{product.date}</td>
                <td>{product.productName}</td>
                <td>{product.quantity}</td>
                <td>{product.stock}.00</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteProduct(product._id)}
                  >
                    <ClearIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Details;
