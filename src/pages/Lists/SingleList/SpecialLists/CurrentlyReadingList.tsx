import { useDispatch } from "react-redux";
import SidePanelLayout from "../../../../components/SidePannelLayout/SidePannelLayout";
import SingleListComponent from "../../../../components/SingleList/SingleListComponent";
import { showAlert } from "../../../../redux/features/alerts/alertsSlice";
import { useAppSelector } from "../../../../redux/hooks";
import { useGetUserListsQuery } from "../../../../redux/services/listsApiSlice";
import { Navigate } from "react-router-dom";

const CurrentlyReadingPage = () => {
  const dispatch = useDispatch();
  const currentUserId = useAppSelector((state) => state.authUser.user)?.id ?? 0;

  const {
    data: lists,
    isSuccess: listFetched,
    isLoading: isFetchingList,
    isError: errorFetchingList,
  } = useGetUserListsQuery(currentUserId, { skip: !currentUserId });

  if (listFetched) {
    const currentlyReadingList = lists.find(
      (list) => list.title.toLowerCase() === "currently reading"
    );

    if (!currentlyReadingList) {
      dispatch(showAlert({ message: "List is not found", severity: "error" }));
      return <Navigate to={"/"} />;
    }

    return (
      <SidePanelLayout>
        <SingleListComponent
          list={currentlyReadingList}
          isFetchingList={isFetchingList}
          errorFetchingList={errorFetchingList}
          listFetched={listFetched}
          isEditable={{
            canEditName: false,
            canEditPrivacy: true,
            canDelete: false,
          }}
        />
      </SidePanelLayout>
    );
  }
};

export default CurrentlyReadingPage;
