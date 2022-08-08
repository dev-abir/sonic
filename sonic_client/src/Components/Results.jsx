import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

function Results() {
    return (
        <Paper elevation={3} style={{ flex: 1, overflow: "auto" }}>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <code>Test case 1 [points=10] (public)</code>
                        <CheckCircleIcon color="success" />
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>Expected output:</Typography>
                    <pre style={{border:"1px solid grey", width:"max-content"}}>{"1\n1 2\n1 2 3"}</pre>
                    <Typography>Your output:</Typography>
                    <pre style={{border:"1px solid grey", width:"max-content"}}>{"1\n1 2\n1 2 3"}</pre>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <code>Test case 2 [points=20] (private)</code>
                        <CancelIcon color="error" />
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Paper>
    );
}

export default Results;
