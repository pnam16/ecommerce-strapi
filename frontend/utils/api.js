import axios from "axios"

export function getStrapiURL(path) {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
  }${path}`;
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path) {
  const requestUrl = getStrapiURL(path);
  const response = await fetch(requestUrl);
  const data = await response.json();
  return data;
}

export async function getCategories() {
  const categories = await fetchAPI("/categories");
  return categories;
}

export async function getCategory(slug) {
  const categories = await fetchAPI(`/categories?slug=${slug}`);
  return categories?.[0];
}

export async function getProducts() {
  const products = await fetchAPI("/products");
  return products;
}

export async function getForm() {
  return fetchAPI("/form");
}

export async function login({email, password}) {
  const {data} = await axios.post(getStrapiURL("/auth/local"), {identifier: email, password})

  localStorage.setItem('jwt', data.jwt);
  return data
}

export function getToken() {
  return localStorage.getItem("jwt")
}

export function logout() {
  return localStorage.removeItem("jwt")
}

export async function createContact(reqData, router) {

  const token = getToken();

  if (!token) router.push("/login")

  try {
    const {data} = await axios.post(
      getStrapiURL("/contacts"),
      {
        name: reqData.name,
        email: reqData.email,
        phone: reqData.phone,
        content: reqData.content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      },
    )
    window.alert("Create contact success")

    return data
  } catch (error) {
    window.alert(error)
  }
}

export async function getProduct(slug) {
  const products = await fetchAPI(`/products?slug=${slug}`);
  return products?.[0];
}
