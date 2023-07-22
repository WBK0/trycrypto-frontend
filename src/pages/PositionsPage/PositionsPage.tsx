import { useParams } from "react-router-dom";
import PositionsLayout from "./Layout/Layout";
import Header from "./components/Header/Header";

const PositionsPage = () => {
  const params = useParams()

  return(
    <PositionsLayout>
      <Header params={params['*']}/>
    </PositionsLayout>
  )
}

export default PositionsPage;