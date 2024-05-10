import { useParams } from "react-router-dom";
import SidePannelLayout from "../../../components/SidePannelLayout/SidePannelLayout";

const SingleListPage = () => {
  const { listId } = useParams();

  document.title = "Readify | ListName";
  return (
    <SidePannelLayout>
      <div>
        <h1>Single List Page</h1>
        <p>List ID: {listId}</p>
      </div>
    </SidePannelLayout>
  );
};

export default SingleListPage;
