import React from "react";
import { Avatar, Button, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function SideNav(props) {
    const theme = useTheme();

    return (
        <Paper style={{ display: "flex", flexDirection: "column", gap: "1rem", flex:0 }}>
            {[1, 2, 3, 4, 5].map((val) => (
                <Button key={val}>
                    <Avatar
                        style={{
                            backgroundColor: val === 1 && theme.palette.primary.light,
                        }}
                    >
                        {val}
                    </Avatar>
                </Button>
            ))}
        </Paper>
    );
}

export default SideNav;
