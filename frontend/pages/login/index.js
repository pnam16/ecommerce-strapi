import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { login, getToken} from "../../utils/api"

const Login = () => {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading product...</div>
  }

  useEffect(() => {
    const token = getToken();
    if(!!token) router.push("/")
  }, [router])


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div style={{ width: "50%", margin: "0 auto" }}>
      <div class="w-full">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Email
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="Email"
              value={email}
              onChange={({target: {value}}) => setEmail(value)}
            ></input>
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"

              type="password"
              placeholder="******************"
              value={password}
              onChange={({target: {value}}) => setPassword(value)}
            ></input>
            <p class="text-red-500 text-xs italic">Please choose a password.</p>
          </div>
          <div class="flex items-center justify-end">
            <div></div>
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => {
                if (email && password) {
                  login({email, password}).then(router.push("/"))
                }
              }}
              >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
