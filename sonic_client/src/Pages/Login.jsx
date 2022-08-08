import React, { useState } from "react";
import { TextField, Autocomplete, Button, CircularProgress, CssBaseline } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router-dom";

function Login() {
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();

    // TODO: minHeight vs height ?
    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {/* CssBaseline provides a proper dark/light background */}
            <CssBaseline />

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log(e.target.data);
                }}
                style={{
                    height: "100vh",
                    width: "30vw",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                }}
            >
                <TextField required style={{ width: "100%" }} name="password" label="Password" />

                <Autocomplete
                    style={{ width: "100%" }}
                    options={[
                        "a@b.csajgfsafgafhsafahgfsafsafsafshffhgff",
                        "d@e.f and ksdhfdsjhfdsjhfdsjhfs@b.r",
                        "d@easjhfsgdhfdsjhfdsjhfdsgfjhdsgfjhdsgfjhsdgf.f and ksdhfdsjhfdsjhfdsjhfs@b.r",
                    ]}
                    renderInput={(params) => (
                        <TextField
                            required
                            {...params}
                            name="user1"
                            label="Group member email(s)"
                        />
                    )}
                />

                <Button
                    style={{ width: "100%" }}
                    color={loaded ? "success" : "primary"}
                    variant="contained"
                    endIcon={!loading && <NavigateNextIcon />}
                    onClick={(e) => {
                        if (loaded) navigate("/playground");
                        setTimeout(() => {
                            setLoaded(true);
                            setLoading(false);
                        }, 3000);
                        setLoading(true);
                    }}
                    disabled={loading}
                    // type="submit"
                >
                    {loaded ? "Start!" : loading ? <CircularProgress size="1.5rem" /> : "Submit"}
                </Button>
            </form>
        </div>
    );
}

export default Login;
