import Image from "next/image";
import { Field, Form, Formik } from "formik";
import {
  AppBar,
  Box,
  InputAdornment,
  InputLabel,
  Toolbar,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { theme } from "@utils/components/theme";
import CustomInput from "../elements/input";
import { useState } from "react";
import { Dispatch } from "redux";
import { PlaceActionTypes, fetchPlace } from "@utils/store/place/place.action";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";

export default function CustomHeader() {
  const [initialValues] = useState<{ search: string }>({
    search: "",
  });
  const dispatch: Dispatch<PlaceActionTypes> = useDispatch();
  const handleSearch = debounce((e: any) => {
    dispatch(
      fetchPlace({
        method: "GET",
        url: "https://api-eekpk6c73q-as.a.run.app/api/place",
        params: {
          search: e.target.value,
        },
      }) as any
    );
  }, 1000);
  return (
    <>
      <AppBar elevation={1} position="static" color="inherit">
        <Toolbar disableGutters sx={{ padding: 2 }}>
          <Box
            sx={{
              flexGrow: 1,
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <Image
              src={
                theme.palette.mode === "light"
                  ? "/logo-sm-dark.svg"
                  : "/logo-sm-white.svg"
              }
              alt="logo"
              width={100}
              height={100}
              priority
            />
            <Typography
              component="h1"
              sx={{ fontSize: 25, fontWeight: 500, ml: 2 }}
            ></Typography>
          </Box>

          <Box sx={{ alignContent: "end" }}>
            <Formik initialValues={initialValues} onSubmit={() => {}}>
              {() => (
                <Form>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box sx={{ width: 250, maxWidth: "100%", mr: 1 }}>
                      <Typography>Search</Typography>
                      <Field
                        as={CustomInput}
                        sx={{ height: 30 }}
                        name="search"
                        onKeyUp={handleSearch}
                        endAdornment={
                          <InputAdornment position="end">
                            <SearchIcon />
                          </InputAdornment>
                        }
                      />
                    </Box>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
