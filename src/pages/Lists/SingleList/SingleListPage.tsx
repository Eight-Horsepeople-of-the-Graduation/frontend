import { useParams } from "react-router-dom";
import SidePannelLayout from "../../../components/SidePannelLayout/SidePannelLayout";
import { useGetListByIdQuery } from "../../../redux/services/listsApiSlice";
import { useAppSelector } from "../../../redux/hooks";
import SingleListComponent from "../../../components/SingleList/SingleListComponent";

const SingleListPage = () => {
  const { listId } = useParams();
  const currentUserId = useAppSelector((state) => state.authUser.user)?.id ?? 0;

  const {
    data: list,
    isSuccess: listFetched,
    isLoading: isFetchingList,
    isError: errorFetchingList,
  } = useGetListByIdQuery(+listId!, { skip: !listId });

  if (listFetched) {
    const isMyList = list.userId === currentUserId;

    return (
      <SidePannelLayout>
        <SingleListComponent
          list={list}
          isFetchingList={isFetchingList}
          errorFetchingList={errorFetchingList}
          listFetched={listFetched}
          isEditable={{
            canEditName: isMyList,
            canEditPrivacy: isMyList,
            canDelete: isMyList,
          }}
        />
      </SidePannelLayout>
    );
  }
};

export default SingleListPage;
