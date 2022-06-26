import {
  AppBar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { Component } from "react";
import { BasicModule } from "../module/basic";
import { validURL } from "../util/valids";

interface State {
  changeBoot: string;
  needRamdisk: string;
  moduleType: string;
  magiskSupport: string;
  foxmmmProps: boolean;
  id: string;
  name: string;
  author: string;
  description: string;
  donate_url: string;
  support_url: string;
  update_json_url: string;
  config_package: string;
}

class Main extends Component<{}, State> {
  public constructor(props: {}) {
    super(props);
    this.state = {
      changeBoot: "false",
      needRamdisk: "false",
      moduleType: "Basic",
      magiskSupport: "on",
      foxmmmProps: true,
      id: "",
      name: "",
      author: "",
      description: "",
      donate_url: "",
      support_url: "",
      update_json_url: "",
      config_package: "",
    };
  }

  public render(): React.ReactNode {
    const {
      changeBoot,
      needRamdisk,
      moduleType,
      magiskSupport,
      foxmmmProps,
      id,
      name,
      author,
      description,
      donate_url,
      support_url,
      update_json_url,
      config_package,
    } = this.state;
    return (
      <>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit" component="div">
              Magisk Module Generate
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md" sx={{ mt: 8 }}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                select
                label="Type"
                value={moduleType}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  this.setState({ moduleType: event.target.value });
                }}
                helperText={
                  moduleType === "Dynamic Installer"
                    ? "Dynamic Modules are not supported in FoxMMM"
                    : null
                }
              >
                {["Basic", /*"Dynamic Installer"*/].map((option: any) => (
                  <MenuItem key={option.toString()} value={option.toString()}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      this.setState({ foxmmmProps: event.target.checked });
                    }}
                  />
                }
                label="Enable FoxMMM Properties"
              />
            </div>
          </Box>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required
                id="outlined-basic"
                label="Module Id"
                variant="outlined"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  this.setState({ id: event.target.value });
                }}
              />
              <TextField
                id="outlined-basic"
                label="Module Name"
                variant="outlined"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  this.setState({ name: event.target.value });
                }}
              />
              <TextField
                id="outlined-basic"
                label="Module Description"
                variant="outlined"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  this.setState({ description: event.target.value });
                }}
              />
              <TextField
                id="outlined-basic"
                label="Module Author"
                variant="outlined"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  this.setState({ author: event.target.value });
                }}
              />
            </div>
            {foxmmmProps ? (
              <>
                <div>
                  <TextField
                    label="Donate Url"
                    variant="outlined"
                    value={donate_url}
                    // error={!validURL(donate_url)}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      this.setState({ donate_url: event.target.value });
                    }}
                  />
                  <TextField
                    label="Support Url"
                    variant="outlined"
                    value={support_url}
                    // error={!validURL(support_url)}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      this.setState({ support_url: event.target.value });
                    }}
                  />
                  <TextField
                    label="Update JSON Url"
                    variant="outlined"
                    value={update_json_url}
                    // error={!validURL(update_json_url)}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      this.setState({ update_json_url: event.target.value });
                    }}
                  />
                </div>
                <div>
                  <TextField
                    label="Config Package"
                    variant="outlined"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      this.setState({ config_package: event.target.value });
                    }}
                  />
                  <TextField
                    select
                    label="Changes Boot"
                    value={changeBoot}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      this.setState({ changeBoot: event.target.value });
                    }}
                    helperText="Does your module changes boot partition?"
                  >
                    {["true", "false"].map((option: any) => (
                      <MenuItem
                        key={option.toString()}
                        value={option.toString()}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    label="Need Ramdisk"
                    value={needRamdisk}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      this.setState({ needRamdisk: event.target.value });
                    }}
                    helperText="Does your module needs ramdisk?"
                  >
                    {["true", "false"].map((option: any) => (
                      <MenuItem
                        key={option.toString()}
                        value={option.toString()}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </>
            ) : null}

            {moduleType === "Dynamic Installer" ? (
              <div>
                <TextField
                  select
                  label="Magisk Support"
                  value={magiskSupport}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    this.setState({ magiskSupport: event.target.value });
                  }}
                >
                  {["on", "off"].map((option: any) => (
                    <MenuItem key={option.toString()} value={option.toString()}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            ) : null}
          </Box>
          {}
          <Button
            variant="contained"
            disableElevation
            onClick={() => {
              if (id !== "") {
                if (moduleType === "Basic") {
                  BasicModule({
                    useFoxMMMProps: foxmmmProps,
                    prop: {
                      id: id,
                      name: name,
                      author: author,
                      description: description,
                      updateJson: update_json_url,
                      needRamdisk: needRamdisk,
                      changeBoot: changeBoot,
                      support: support_url,
                      donate: donate_url,
                      config: config_package,
                    },
                  });
                } else {
                  alert("Dynamic coming soon!");
                }
              } else {
                alert("Please fillup the id field");
              }
            }}
          >
            Generate
          </Button>
        </Container>
      </>
    );
  }
}

export default Main;
