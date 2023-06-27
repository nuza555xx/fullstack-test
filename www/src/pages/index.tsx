import CustomHead from "@utils/components/seo";
import { Container } from "@mui/material";
import { PlaceActionTypes, fetchPlace } from "@utils/store/place/place.action";
import {
  selectPlaceData,
  selectPlaceLoading,
  selectPlaceError,
} from "@utils/store/place/place.selector";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Dispatch } from "redux";
import { PlaceContentComponent } from "@utils/components/ui/place-content";
import LoadingComponent from "@utils/components/ui/loading";

export default function IndexPage() {
  const placeData = useSelector(selectPlaceData);
  const loading = useSelector(selectPlaceLoading);
  const error = useSelector(selectPlaceError);
  const dispatch: Dispatch<PlaceActionTypes> = useDispatch();
  useEffect(() => {
    dispatch(
      fetchPlace({
        method: "GET",
        url: "https://api-eekpk6c73q-as.a.run.app/api/place",
        params: {
          search: "",
        },
      }) as any
    );
  }, [dispatch]);

  return (
    <>
      <CustomHead title="Search" description="Search" ogImage="" />

      <main>
        {loading ? (
          <LoadingComponent />
        ) : (
          <Container sx={{ padding: 5 }}>
            <PlaceContentComponent payload={placeData?.payload} />
          </Container>
        )}
      </main>
    </>
  );
}
