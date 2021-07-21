import Head from "next/head"
import {useRouter} from "next/router"
import { useState } from "react"
import ProductsList from "../components/ProductsList"
import { getProducts, getForm, createContact,logout } from "../utils/api"

const HomePage = ({ products, form }) => {
  const router = useRouter()
  console.log(`form`, form)
  typeof window !== 'undefined' &&  console.log(`token`, localStorage.getItem("jwt"))

  const [formData, setFormData] = useState({})

  return (
    <div>
      <Head>
        <title>Strapi E-commerce</title>
      </Head>
      {/* <ProductsList products={products} /> */}
      <div style={{width: "50%", backgroundColor: "yellow", minHeight: "100px", margin: "30px auto"}}>
          {
            form.filter(e => e.__component === "layout.input").map(f => {
              if (!f.multiline) {
                return (
                  <input
                    key={f.id}
                    class={`mb-3 py-2 px-3 ${f.fullWidth ? "w-full" : ""} text-gray-700 leading-tight focus:outline-none focus:shadow-outline `}
                    type={f.type}
                    placeholder={f.placeHolder}
                    onChange={({target: {value}}) => setFormData({
                      ...formData,
                      [`${f.name}`]: value
                    })}
                  />
                )
              }
              return (
                <textarea
                  key={f.id}
                  class={`mb-3 py-2 px-3 ${f.fullWidth ? "w-full" : ""} "resize" text-gray-700 leading-tight focus:outline-none focus:shadow-outline `}
                  type={f.type}
                  placeholder={f.placeHolder}
                  onChange={({target: {value}}) => setFormData({
                    ...formData,
                    [`${f.name}`]: value
                  })}
                />
              )
            })
          }

          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => {
                logout()
              }}
              >
              Log out
            </button>
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => {
                console.log(`formData`, formData)
                createContact(formData, router)
              }}
              >
              Sign In
            </button>
          </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const products = await getProducts()
  const {form} = await getForm()

  return { props: { products, form } }
}

export default HomePage
