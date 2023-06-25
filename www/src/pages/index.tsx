import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import CustomHead from "@utils/components/seo";
import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect } from "react";
import { requestAPI } from "@utils/utils";

const inter = Inter({ subsets: ["latin"] });

export default function IndexPage() {
  useEffect(() => {
    requestAPI({
      method: "GET",
      url: "http://0.0.0.0/api/place",
      headers: { "API-KEY": "test" },
    }).then((response) => {});
  });
  return (
    <>
      <CustomHead title="Search" description="Search" ogImage="" />

      <main>
        <Container sx={{ padding: 5 }}>
          <Box>
            <Grid container spacing={3}>
              <Grid>
                <Image
                  src={"http://via.placeholder.com/512x512"}
                  alt="logo"
                  width={250}
                  height={250}
                />
              </Grid>
              <Grid xs={12} md={8}>
                <Typography component="h1" sx={{ fontSize: 20, mb: 2, ml: 2 }}>
                  test
                </Typography>
                <Typography component="p" sx={{ mb: 1 }}>
                  Lorem Ipsum is simply dummy text of the printing and
                </Typography>
                <Typography component="p">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </main>
    </>
  );
}
