import React from "react";
import Question from "./Question";
import Results from "./Results";
import { Resizable } from "re-resizable";
import { Divider } from "@mui/material";

function QuestionResult(props) {
    return (
        <div
            style={{
                display: "flex",
                gap: "1rem",
                flexDirection: "column",
                height: "100%",
            }}
        >
            <Resizable
                defaultSize={{
                    width: "100%",
                    height: "75%",
                }}
                minHeight="25%"
                maxHeight="75%"
                handleComponent={{
                    bottom: <Divider />,
                }}
                handleStyles={{
                    bottom: {
                        height: "1rem",
                        bottom: "-1.5rem",
                    },
                }}
                enable={{
                    top: false,
                    right: false,
                    bottom: true,
                    left: false,
                    topRight: false,
                    bottomRight: false,
                    bottomLeft: false,
                    topLeft: false,
                }}
            >
                <Question />
            </Resizable>

            <Results />
        </div>
    );
}

export default QuestionResult;
