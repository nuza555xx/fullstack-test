import { Box, Typography } from "@mui/material";
import { PlaceSearch, PlaceSearchResponse } from "@utils/interfaces";
import Image from "next/image";
import { Fragment } from "react";
import Grid from "@mui/material/Unstable_Grid2";

type PlaceContentProps = {
  payload: PlaceSearch[] | undefined;
};
export function PlaceContentComponent({ payload }: PlaceContentProps) {
  const imageBase = "https://dummyimage.com/400x400/fff/aaa";

  return (
    <>
      {payload?.map((data, index) => {
        return (
          <Fragment key={index}>
            <Box sx={{ cursor: "pointer" }}>
              <Grid container spacing={3}>
                <Grid xs={12} md={3}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      src={data.photoRef ? data.photoRef : imageBase}
                      alt={data.title}
                      width={250}
                      height={250}
                      onError={() => imageBase}
                    />
                  </Box>
                </Grid>
                <Grid
                  xs={12}
                  md={9}
                  sx={{ textAlign: { xs: "center", md: "left" } }}
                >
                  <Typography component="h1" sx={{ fontSize: 20, mb: 1 }}>
                    {data.title}
                  </Typography>
                  <Typography component="p">{data.description}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Fragment>
        );
      })}
    </>
  );
}
