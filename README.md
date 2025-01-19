# DevTinder

- Create a Vite + React application
  npm create vite@latest devTinder-web -- --template react
- Remove unnecessary code

- Install tailwindcss
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p

/** @type {import('tailwindcss').Config} \*/
export default {
content: [
"./index.html",
"./src/**/\*.{js,ts,jsx,tsx}",
],
theme: {
extend: {},
},
plugins: [],
}

@tailwind base;
@tailwind components;
@tailwind utilities;

npm run dev

npm i -D daisyui@latest
require('daisyui'),
plugins: [
daisyui,
],

<>
<BrowserRouter basename="/">
<Routes>
<Route path="/login" element = {<h1>Login Page</h1>} />
<Route path="/profile" element = {<h1>Profile Page</h1>} />
</Routes>
</BrowserRouter>
<div className="h-screen flex flex-wrap">
.....
</div>
</>

"/" not defined. But no error as there is some other content

<Routes>
  <Route path="/" element={<Body />}>
    <Route path="/login" element={<Login />} />
    <Route path="/profile" element={<Profile />} />
  </Route>
</Routes>

<NavBar />
<Outlet />

npm i axios
add cors to backend

option 1- no cookies
const res = await axios.post("http://localhost:3000/login",
        {emailID, password},
)
app.use(cors())

need to whitelist domain name
app.use(cors(
  {
    origin: 'http://localhost:5173',
    credentials: true
  }
))
CAUTION: DO NOT PUT FORWARD SLASH!
frontend-
{withCredentials: true}

npm i @reduxjs/tookit react-redux
redux devtools