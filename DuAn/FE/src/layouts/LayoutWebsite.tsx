import { Outlet } from "react-router-dom"
import Header from "~/components/Header"

const LayoutWebsite = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  )
}

export default LayoutWebsite