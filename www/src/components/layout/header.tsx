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

export default function CustomHeader() {
  const [initialValues] = useState<{ search: string }>({ search: "" });
  const handleSubmit = async ({ search }: { search: string }) => {};
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
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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
