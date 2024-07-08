import SidePannelLayout from "../../../../../components/SidePannelLayout/SidePannelLayout";
import SingleListComponent from "../../../../../components/SingleList/SingleListComponent";
import { useAppSelector } from "../../../../../redux/hooks";
import { useGetUserListsQuery } from "../../../../../redux/services/listsApiSlice";

const WantToReadPage = () => {
  const currentUserId = useAppSelector((state) => state.authUser.user)?.id ?? 0;

  const {
    data: lists,
    isSuccess: listFetched,
    isLoading: isFetchingList,
    isError: errorFetchingList,
  } = useGetUserListsQuery(currentUserId, { skip: !currentUserId });

  if (listFetched) {
    const isMyList = lists[0].userId === currentUserId;

    return (
      <SidePannelLayout>
        <SingleListComponent
          list={lists[0]}
          isFetchingList={isFetchingList}
          errorFetchingList={errorFetchingList}
          listFetched={listFetched}
          isEditable={{
            canEditName: false,
            canEditPrivacy: isMyList,
            canDelete: false,
          }}
        />
      </SidePannelLayout>
    );
  }
};

export default WantToReadPage;
